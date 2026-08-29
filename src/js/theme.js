const storageKey = "links-theme";

const themes = {
  dark: {
    icon: "assets/icons/phosphor/regular/sun.svg",
    label: "Ativar tema claro",
  },
  light: {
    icon: "assets/icons/phosphor/regular/moon.svg",
    label: "Ativar tema escuro",
  },
};

function applyTheme(theme, button, icon) {
  document.documentElement.dataset.theme = theme;
  button.setAttribute("aria-label", themes[theme].label);
  button.setAttribute("aria-pressed", String(theme === "light"));
  icon.src = themes[theme].icon;
}

function getSavedTheme() {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // O tema atual continua aplicado quando o armazenamento não está disponível.
  }
}

export function initTheme() {
  const button = document.querySelector("[data-theme-toggle]");
  const icon = document.querySelector("[data-theme-icon]");

  if (!button || !icon) {
    return;
  }

  const initialTheme =
    getSavedTheme() || document.documentElement.dataset.theme || "dark";

  applyTheme(initialTheme, button, icon);

  button.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === "light" ? "dark" : "light";

    applyTheme(nextTheme, button, icon);
    saveTheme(nextTheme);
  });
}
