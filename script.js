const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");

toggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

const decisions = document.querySelector("#decisions");
const without = document.querySelector("#without");
const withFn = document.querySelector("#with");

const decisionValue = document.querySelector("#decisionValue");
const withoutValue = document.querySelector("#withoutValue");
const withValue = document.querySelector("#withValue");
const withoutResult = document.querySelector("#withoutResult");
const withResult = document.querySelector("#withResult");
const improvementResult = document.querySelector("#improvementResult");

function percent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function updateCalculator() {
  const n = Number(decisions.value);
  const base = Number(without.value) / 100;
  const improved = Number(withFn.value) / 100;
  const withoutProbability = Math.pow(base, n);
  const withProbability = Math.pow(improved, n);
  const improvement = withProbability / withoutProbability;

  decisionValue.textContent = n;
  withoutValue.textContent = `${without.value}%`;
  withValue.textContent = `${withFn.value}%`;
  withoutResult.textContent = percent(withoutProbability);
  withResult.textContent = percent(withProbability);
  improvementResult.textContent = `${Math.max(1, improvement).toFixed(0)}x`;
}

[decisions, without, withFn].forEach((input) => input?.addEventListener("input", updateCalculator));
updateCalculator();

document.querySelector(".application-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  const original = button.innerHTML;
  button.innerHTML = "Interest saved locally<span aria-hidden=\"true\">✓</span>";
  window.setTimeout(() => {
    button.innerHTML = original;
  }, 1800);
});

const reviewModeButton = document.querySelector("[data-review-mode]");
const reviewExportButton = document.querySelector("[data-review-export]");
const reviewShareButton = document.querySelector("[data-review-share]");
const reviewImportButton = document.querySelector("[data-review-import]");
const reviewClearButton = document.querySelector("[data-review-clear]");
const reviewStatus = document.querySelector("[data-review-status]");

const COMMENT_STORAGE_KEY = "fn-mockup-comments-v1";
const REVIEWER_STORAGE_KEY = "fn-mockup-reviewer-name-v1";
let commentModeActive = false;
let comments = [];

function setReviewStatus(message) {
  if (!reviewStatus) {
    return;
  }
  reviewStatus.textContent = message;
}

function encodePayload(payload) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

function decodePayload(encoded) {
  return JSON.parse(decodeURIComponent(escape(atob(encoded))));
}

function loadCommentsFromStorage() {
  const raw = window.localStorage.getItem(COMMENT_STORAGE_KEY);
  if (!raw) {
    comments = [];
    return;
  }
  const parsed = JSON.parse(raw);
  comments = Array.isArray(parsed) ? parsed : [];
}

function saveCommentsToStorage() {
  window.localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(comments));
}

function loadReviewerName() {
  return window.localStorage.getItem(REVIEWER_STORAGE_KEY) || "";
}

function saveReviewerName(name) {
  window.localStorage.setItem(REVIEWER_STORAGE_KEY, name.trim());
}

function ensureMarkerLayer() {
  let layer = document.querySelector(".review-marker-layer");
  if (layer) {
    return layer;
  }
  layer = document.createElement("div");
  layer.className = "review-marker-layer";
  document.body.style.position = "relative";
  document.body.append(layer);
  return layer;
}

function syncMarkerLayerSize() {
  const markerLayer = ensureMarkerLayer();
  markerLayer.style.height = `${Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)}px`;
}

function renderComments() {
  const markerLayer = ensureMarkerLayer();
  markerLayer.innerHTML = "";
  syncMarkerLayerSize();

  comments.forEach((comment, index) => {
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = "review-marker";
    marker.style.left = `${comment.x}px`;
    marker.style.top = `${comment.y}px`;
    marker.textContent = String(index + 1);
    marker.title = `${comment.author ? `${comment.author}: ` : ""}${comment.text}`;
    marker.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      markerLayer.querySelector(".review-note")?.remove();

      const note = document.createElement("article");
      note.className = "review-note";
      note.style.left = `${comment.x}px`;
      note.style.top = `${comment.y}px`;

      const when = new Date(comment.createdAt).toLocaleString();
      note.innerHTML = `<p><strong>#${index + 1}</strong> ${comment.author}: ${comment.text}</p><small>${when}</small>`;

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        comments = comments.filter((entry) => entry.id !== comment.id);
        saveCommentsToStorage();
        renderComments();
        setReviewStatus("Comment removed.");
      });
      note.append(removeButton);

      markerLayer.append(note);
      setReviewStatus(`#${index + 1} selected.`);
    });
    markerLayer.append(marker);
  });
}

function importCommentPayload(payload) {
  if (!Array.isArray(payload.comments)) {
    throw new Error("Invalid payload format.");
  }
  comments = payload.comments.filter((entry) => {
    return (
      typeof entry.id === "string" &&
      typeof entry.text === "string" &&
      typeof entry.x === "number" &&
      typeof entry.y === "number" &&
      typeof entry.createdAt === "string"
    );
  });
  saveCommentsToStorage();
  renderComments();
}

function setCommentMode(active) {
  commentModeActive = active;
  document.body.classList.toggle("review-mode-active", active);
  if (!reviewModeButton) {
    return;
  }
  reviewModeButton.textContent = `Comment mode: ${active ? "On" : "Off"}`;
  reviewModeButton.setAttribute("aria-pressed", String(active));
  reviewModeButton.dataset.active = String(active);
}

function readClipboardText() {
  if (!navigator.clipboard || typeof navigator.clipboard.readText !== "function") {
    return Promise.reject(new Error("Clipboard read not supported."));
  }
  return navigator.clipboard.readText();
}

function requestCommentDraft() {
  const savedName = loadReviewerName();
  const authorInput = window.prompt("Your name for this comment:", savedName || "Reviewer");
  if (authorInput === null) {
    return null;
  }
  const author = authorInput.trim() || "Reviewer";
  saveReviewerName(author);

  const textInput = window.prompt("Add feedback for this spot:");
  if (textInput === null) {
    return null;
  }
  const text = textInput.trim();
  if (!text) {
    setReviewStatus("Skipped empty comment.");
    return null;
  }

  return { author, text };
}

if (reviewModeButton) {
  reviewModeButton.addEventListener("click", () => {
    setCommentMode(!commentModeActive);
    if (commentModeActive) {
      setReviewStatus("Comment mode is on. Click anywhere on the page to add feedback.");
      return;
    }
    setReviewStatus("Comment mode is off.");
  });

  document.addEventListener("click", (event) => {
    if (!commentModeActive) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    if (target.closest(".review-tools, .review-note, .review-marker")) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const draft = requestCommentDraft();
    if (!draft) {
      return;
    }

    comments.push({
      id: crypto.randomUUID(),
      text: draft.text,
      author: draft.author,
      x: event.pageX,
      y: event.pageY,
      createdAt: new Date().toISOString(),
    });

    saveCommentsToStorage();
    renderComments();
    setReviewStatus("Comment added.");
  });

  reviewExportButton?.addEventListener("click", async () => {
    const payload = {
      source: "fn-site-mockup-comments",
      createdAt: new Date().toISOString(),
      comments,
    };
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setReviewStatus("Comment JSON copied.");
  });

  reviewShareButton?.addEventListener("click", async () => {
    const payload = {
      source: "fn-site-mockup-comments",
      createdAt: new Date().toISOString(),
      comments,
    };
    const baseUrl = window.location.href.split("#")[0];
    const link = `${baseUrl}#comments=${encodeURIComponent(encodePayload(payload))}`;
    await navigator.clipboard.writeText(link);
    setReviewStatus("Share link copied.");
  });

  reviewImportButton?.addEventListener("click", () => {
    readClipboardText()
      .then((raw) => {
        if (!raw.trim()) {
          setReviewStatus("Clipboard is empty.");
          return;
        }
        const payload = JSON.parse(raw);
        importCommentPayload(payload);
        setReviewStatus("Comments imported from clipboard.");
      })
      .catch(() => {
        setReviewStatus("Clipboard read blocked. Paste JSON in devtools with window.importMockupComments(<json>).");
      });
  });

  reviewClearButton?.addEventListener("click", () => {
    comments = [];
    saveCommentsToStorage();
    renderComments();
    setReviewStatus("All comments cleared.");
  });

  loadCommentsFromStorage();
  setCommentMode(false);

  const hash = window.location.hash;
  if (hash.startsWith("#comments=")) {
    try {
      const encoded = decodeURIComponent(hash.replace("#comments=", ""));
      const payload = decodePayload(encoded);
      importCommentPayload(payload);
      setReviewStatus("Loaded comments from shared link.");
    } catch (error) {
      setReviewStatus("Could not load comments from URL hash.");
    }
  } else {
    renderComments();
  }

  window.addEventListener("resize", syncMarkerLayerSize);
  window.addEventListener("load", syncMarkerLayerSize);
}

window.importMockupComments = (payload) => {
  importCommentPayload(payload);
  setReviewStatus("Comments imported.");
};
