export async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const field = document.createElement("textarea");

  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();

  const copied = document.execCommand("copy");

  field.remove();

  if (!copied) {
    throw new Error("Não foi possível copiar o link.");
  }
}

function getCanonicalUrl() {
  return (
    document.querySelector('link[rel="canonical"]')?.href ||
    window.location.href
  );
}

export function initShare() {
  const button = document.querySelector("[data-share-button]");
  const feedback = document.querySelector("[data-share-feedback]");
  const message = document.querySelector("[data-share-message]");
  const url = document.querySelector("[data-share-url]");
  let hideFeedbackTimeout;

  if (!button || !feedback || !message || !url) {
    return;
  }

  function hideFeedback() {
    feedback.hidden = true;
    button.setAttribute("aria-expanded", "false");
  }

  function showFeedback(text, link = "") {
    window.clearTimeout(hideFeedbackTimeout);
    message.textContent = text;
    url.textContent = link;
    feedback.hidden = false;
    button.setAttribute("aria-expanded", "true");
    hideFeedbackTimeout = window.setTimeout(hideFeedback, 5000);
  }

  button.addEventListener("click", async () => {
    const canonicalUrl = getCanonicalUrl();

    try {
      await copyText(canonicalUrl);
      showFeedback("Link copiado", canonicalUrl);
    } catch (error) {
      console.error(error);
      showFeedback("Não foi possível copiar o link.");
    }
  });
}
