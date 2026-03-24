/**
 * Privacy Policy Generator — Main Application Logic
 * Handles form interactions, preview rendering, copy/download actions.
 */

(function () {
  "use strict";

  // ===== DOM Elements =====
  const form = document.getElementById("policy-form");
  const previewEl = document.getElementById("preview-content");
  const copyBtn = document.getElementById("btn-copy");
  const downloadBtn = document.getElementById("btn-download");
  const toastEl = document.getElementById("toast");

  let currentMarkdown = "";

  // ===== Form Data Collection =====
  function getFormData() {
    const dataCheckboxes = form.querySelectorAll(
      'input[name="dataCollected"]:checked'
    );
    const dataCollected = Array.from(dataCheckboxes).map((cb) => cb.value);

    return {
      appName: form.appName.value.trim(),
      companyName: form.companyName.value.trim(),
      website: form.website.value.trim(),
      contactEmail: form.contactEmail.value.trim(),
      dataCollected: dataCollected,
      analytics: form.analytics.checked,
      ads: form.ads.checked,
      cookies: form.cookies.checked,
      thirdPartyServices: form.thirdPartyServices.value.trim(),
      dataRetention: form.dataRetention.value.trim(),
      childrenPrivacy: form.childrenPrivacy.checked,
      dataSelling: form.dataSelling.checked,
      internationalTransfer: form.internationalTransfer.checked,
    };
  }

  // ===== Simple Markdown → HTML Renderer =====
  function renderMarkdown(md) {
    let html = md;

    // Escape HTML already done in engine, but just double-check structural tags
    // Horizontal rules from separator
    html = html.replace(/^---$/gm, "<hr>");

    // Headers
    html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    // Links [text](url)
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Unordered list items
    html = html.replace(/^- (.+)$/gm, "<li>$1</li>");

    // Group consecutive <li> into <ul>
    html = html.replace(
      /(<li>.*<\/li>\n?)+/g,
      function (match) {
        return "<ul>" + match + "</ul>";
      }
    );

    // Paragraphs — wrap lines that aren't already wrapped
    const lines = html.split("\n");
    const result = [];
    let inBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) {
        if (inBlock) {
          inBlock = false;
        }
        continue;
      }
      if (
        line.startsWith("<h") ||
        line.startsWith("<ul") ||
        line.startsWith("</ul") ||
        line.startsWith("<li") ||
        line.startsWith("<hr") ||
        line.startsWith("<strong>") && line.endsWith("</strong>")
      ) {
        result.push(line);
        inBlock = false;
      } else {
        result.push("<p>" + line + "</p>");
      }
    }

    return result.join("\n");
  }

  // ===== Generate Policy =====
  function generatePolicy() {
    const data = getFormData();

    if (!data.appName) {
      showToast("Please enter an app name");
      form.appName.focus();
      return;
    }

    currentMarkdown = PolicyEngine.generate(data);
    previewEl.innerHTML = renderMarkdown(currentMarkdown);
    previewEl.classList.remove("preview-placeholder");
    showToast("Privacy policy generated!");
  }

  // ===== Copy to Clipboard =====
  async function copyToClipboard() {
    if (!currentMarkdown) {
      showToast("Generate a policy first");
      return;
    }

    try {
      await navigator.clipboard.writeText(currentMarkdown);
      copyBtn.classList.add("copied");
      copyBtn.querySelector("span").textContent = "Copied!";
      showToast("Copied to clipboard");

      setTimeout(() => {
        copyBtn.classList.remove("copied");
        copyBtn.querySelector("span").textContent = "Copy";
      }, 2000);
    } catch {
      // Fallback for older browsers
      fallbackCopy(currentMarkdown);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showToast("Copied to clipboard");
    } catch {
      showToast("Copy failed — please copy manually");
    }
    document.body.removeChild(textarea);
  }

  // ===== Download as .txt =====
  function downloadPolicy() {
    if (!currentMarkdown) {
      showToast("Generate a policy first");
      return;
    }

    const data = getFormData();
    const filename = `privacy-policy-${(data.appName || "app")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+$/, "")}.txt`;

    const blob = new Blob([currentMarkdown], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Downloaded ${filename}`);
  }

  // ===== Toast Notification =====
  let toastTimer;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("show");
    }, 2500);
  }

  // ===== Event Listeners =====
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    generatePolicy();
  });

  copyBtn.addEventListener("click", copyToClipboard);
  downloadBtn.addEventListener("click", downloadPolicy);

  // Live preview on input change (debounced)
  let debounceTimer;
  form.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const data = getFormData();
      if (data.appName && currentMarkdown) {
        generatePolicy();
      }
    }, 500);
  });

  form.addEventListener("change", function () {
    const data = getFormData();
    if (data.appName && currentMarkdown) {
      generatePolicy();
    }
  });
})();
