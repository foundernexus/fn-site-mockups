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

const reviewToggle = document.querySelector("[data-review-toggle]");
const reviewPanel = document.querySelector("[data-review-panel]");
const reviewAuthorInput = document.querySelector("[data-review-author]");
const reviewTextInput = document.querySelector("[data-review-text]");
const reviewPlaceButton = document.querySelector("[data-review-place]");
const reviewExportButton = document.querySelector("[data-review-export]");
const reviewShareButton = document.querySelector("[data-review-share]");
const reviewImportInput = document.querySelector("[data-review-import]");
const reviewImportButton = document.querySelector("[data-review-import-button]");
const reviewClearButton = document.querySelector("[data-review-clear]");
const reviewStatus = document.querySelector("[data-review-status]");
const reviewList = document.querySelector("[data-review-list]");

const COMMENT_STORAGE_KEY = "fn-mockup-comments-v1";
const REVIEWER_STORAGE_KEY = "fn-mockup-reviewer-name-v1";
let placingComment = false;
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
  if (!reviewAuthorInput) {
    return;
  }
  reviewAuthorInput.value = window.localStorage.getItem(REVIEWER_STORAGE_KEY) || "";
}

function saveReviewerName() {
  if (!reviewAuthorInput) {
    return;
  }
  window.localStorage.setItem(REVIEWER_STORAGE_KEY, reviewAuthorInput.value.trim());
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

function renderCommentList() {
  if (!reviewList) {
    return;
  }
  reviewList.innerHTML = "";
  comments.forEach((comment, index) => {
    const item = document.createElement("li");
    const name = comment.author ? `${comment.author}: ` : "";
    const when = new Date(comment.createdAt).toLocaleString();
    item.innerHTML = `<strong>#${index + 1}</strong> ${name}${comment.text}<br /><small>${when}</small>`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      comments = comments.filter((entry) => entry.id !== comment.id);
      saveCommentsToStorage();
      renderComments();
      setReviewStatus("Comment removed.");
    });
    item.append(removeButton);

    reviewList.append(item);
  });
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
    marker.addEventListener("click", () => {
      setReviewStatus(`#${index + 1} — ${marker.title}`);
    });
    markerLayer.append(marker);
  });

  renderCommentList();
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

if (reviewToggle && reviewPanel) {
  reviewToggle.addEventListener("click", () => {
    const isHidden = reviewPanel.hasAttribute("hidden");
    if (isHidden) {
      reviewPanel.removeAttribute("hidden");
      reviewToggle.setAttribute("aria-expanded", "true");
      return;
    }
    reviewPanel.setAttribute("hidden", "");
    reviewToggle.setAttribute("aria-expanded", "false");
  });

  reviewAuthorInput?.addEventListener("change", saveReviewerName);
  reviewAuthorInput?.addEventListener("blur", saveReviewerName);

  reviewPlaceButton?.addEventListener("click", () => {
    const text = reviewTextInput?.value.trim();
    if (!text) {
      setReviewStatus("Write a comment first.");
      return;
    }
    placingComment = true;
    document.body.classList.add("review-mode-active");
    setReviewStatus("Click anywhere on the page to place this comment.");
  });

  document.addEventListener("click", (event) => {
    if (!placingComment) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    if (target.closest(".review-tools")) {
      return;
    }
    const text = reviewTextInput?.value.trim();
    if (!text) {
      placingComment = false;
      document.body.classList.remove("review-mode-active");
      setReviewStatus("Comment text was empty.");
      return;
    }

    const author = reviewAuthorInput?.value.trim() || "Reviewer";
    comments.push({
      id: crypto.randomUUID(),
      text,
      author,
      x: event.pageX,
      y: event.pageY,
      createdAt: new Date().toISOString(),
    });

    saveReviewerName();
    saveCommentsToStorage();
    renderComments();

    if (reviewTextInput) {
      reviewTextInput.value = "";
    }
    placingComment = false;
    document.body.classList.remove("review-mode-active");
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
    const raw = reviewImportInput?.value.trim() || "";
    if (!raw) {
      setReviewStatus("Paste JSON first.");
      return;
    }
    const payload = JSON.parse(raw);
    importCommentPayload(payload);
    setReviewStatus("Comments imported.");
  });

  reviewClearButton?.addEventListener("click", () => {
    comments = [];
    saveCommentsToStorage();
    renderComments();
    setReviewStatus("All comments cleared.");
  });

  loadCommentsFromStorage();
  loadReviewerName();

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
