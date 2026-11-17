// Keep citation copying independent of animations and video carousel setup.
function setupCitationCopy() {
  const button = document.querySelector('[data-copy-citation]');
  const code = document.querySelector('#citation-bibtex');
  const feedback = document.querySelector('[data-citation-feedback]');
  if (!button || !code) return;

  const label = button.querySelector('span');
  let resetTimer;

  function copyWithSelection(text) {
    const field = document.createElement('textarea');
    field.value = text;
    field.readOnly = true;
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();

    try {
      return document.execCommand('copy');
    } finally {
      field.remove();
    }
  }

  button.addEventListener('click', async () => {
    const text = code.textContent.trim();
    let copied = false;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch {
      // Some browsers deny the async clipboard API; try the selection fallback.
    }

    if (!copied) {
      try {
        copied = copyWithSelection(text);
      } catch {
        // Show a manual copy path below when both browser APIs are unavailable.
      }
    }

    window.clearTimeout(resetTimer);
    if (copied) {
      if (label) label.textContent = 'Copied';
      if (feedback) feedback.textContent = 'BibTeX copied to clipboard.';
    } else {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      if (feedback) feedback.textContent = 'Citation selected. Press Ctrl+C (or Command+C) to copy.';
    }

    resetTimer = window.setTimeout(() => {
      if (label) label.textContent = 'Copy';
      if (feedback) feedback.textContent = '';
    }, 4000);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupCitationCopy, { once: true });
} else {
  setupCitationCopy();
}
