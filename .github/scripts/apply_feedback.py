"""
Reads the current index.html and a GitHub issue body (from env),
calls Gemini 2.5 Pro to apply the feedback, and writes
the updated HTML back to index.html.
"""

import os
import sys

try:
    import google.generativeai as genai
except ImportError:
    print("google-generativeai not found — install it first", file=sys.stderr)
    sys.exit(1)

SYSTEM_PROMPT = """You are a frontend developer updating a mockup website based on reviewer annotations.

Rules:
- Return ONLY the complete updated HTML file — no explanation, no markdown fences
- Preserve the Agentation feedback script (the <script type="module"> block before </body>)
- Make targeted, minimal changes that directly address the feedback
- Do not restructure, remove features, or change anything not mentioned in the feedback
- Maintain all existing IDs, classes, and JavaScript functionality
- If feedback is about text/copy, update the text; if about layout, update CSS; if about colors, update the relevant styles
"""


def strip_fences(text: str) -> str:
    """Remove markdown code fences if the model wrapped its response."""
    text = text.strip()
    if text.startswith("```"):
        lines = text.split("\n")
        end = len(lines) - 1 if lines[-1].startswith("```") else len(lines)
        text = "\n".join(lines[1:end]).strip()
    return text


def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("GEMINI_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    issue_title = os.environ.get("ISSUE_TITLE", "Mockup feedback")
    issue_body = os.environ.get("ISSUE_BODY", "")

    if not issue_body.strip():
        print("No issue body — nothing to apply")
        sys.exit(0)

    with open("index.html", "r", encoding="utf-8") as f:
        current_html = f.read()

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(
        model_name="gemini-2.5-pro",
        system_instruction=SYSTEM_PROMPT,
    )

    prompt = f"""Here is the current mockup HTML:

---HTML START---
{current_html}
---HTML END---

Here is the reviewer feedback (from GitHub issue: "{issue_title}"):

{issue_body}

Please update the HTML to address this feedback. Return only the complete updated HTML."""

    print(f"Sending {len(current_html)} chars of HTML + feedback to Gemini 2.5 Pro...")

    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(temperature=0.2),
    )

    updated_html = strip_fences(response.text)

    if not updated_html.lower().startswith("<!doctype") and not updated_html.lower().startswith("<html"):
        print("ERROR: Response does not look like HTML — aborting to avoid data loss", file=sys.stderr)
        print("Response preview:", updated_html[:500], file=sys.stderr)
        sys.exit(1)

    with open("index.html", "w", encoding="utf-8") as f:
        f.write(updated_html)

    print("✅ index.html updated successfully")


if __name__ == "__main__":
    main()
