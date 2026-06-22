const CORS_HEADERS = (origin) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
});

function isAllowedOrigin(origin, allowedOrigin) {
  if (!origin) return false;
  return origin === allowedOrigin || origin.startsWith(allowedOrigin);
}

function corsResponse(status, body, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS(origin),
    },
  });
}

async function createGitHubIssue(token, repo, title, body) {
  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      "User-Agent": "fn-mockup-feedback-worker",
    },
    body: JSON.stringify({ title, body, labels: ["feedback"] }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API ${res.status}: ${err}`);
  }
  return res.json();
}

function buildIssueBody(payload) {
  const { url, output, annotations = [], timestamp } = payload;
  const date = timestamp
    ? new Date(timestamp * 1000).toUTCString()
    : new Date().toUTCString();

  const annotationList =
    annotations.length > 0
      ? annotations
          .map(
            (a, i) =>
              `**#${i + 1}** — ${a.text || a.content || JSON.stringify(a)}`
          )
          .join("\n")
      : "_No individual annotations captured._";

  return `## Mockup Feedback

**Page:** ${url || "unknown"}
**Submitted:** ${date}

---

${output || "_No annotation details provided._"}

---

### Raw Annotations

${annotationList}

---
_Submitted via [Agentation](https://agentation.com) on the [FN Mockup](${url || "https://foundernexus.github.io/fn-site-mockups/"})_`;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = isAllowedOrigin(origin, env.ALLOWED_ORIGIN);

    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS(allowed ? origin : env.ALLOWED_ORIGIN),
      });
    }

    if (request.method !== "POST") {
      return corsResponse(405, { error: "Method not allowed" }, origin);
    }

    if (!allowed) {
      return corsResponse(403, { error: "Origin not allowed" }, origin);
    }

    if (!env.GITHUB_TOKEN) {
      return corsResponse(500, { error: "Worker not configured" }, origin);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return corsResponse(400, { error: "Invalid JSON" }, origin);
    }

    const { annotations = [], url } = payload;
    const count = annotations.length;
    const pageSlug = url
      ? new URL(url).pathname.replace(/\//g, " ").trim() || "home"
      : "mockup";
    const title = `Mockup feedback: ${count} annotation${count !== 1 ? "s" : ""} on ${pageSlug}`;
    const body = buildIssueBody(payload);

    try {
      const issue = await createGitHubIssue(
        env.GITHUB_TOKEN,
        env.GITHUB_REPO,
        title,
        body
      );
      return corsResponse(200, { ok: true, issue_url: issue.html_url }, origin);
    } catch (err) {
      console.error("GitHub issue creation failed:", err.message);
      return corsResponse(502, { error: "Failed to create issue" }, origin);
    }
  },
};
