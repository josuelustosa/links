const themes = {
  dark: {
    icon: "assets/icons/sun-theme.svg",
    label: "Ativar tema claro",
  },
  light: {
    icon: "assets/icons/moon-theme.svg",
    label: "Ativar tema escuro",
  },
};

function applyTheme(theme, button, icon) {
  document.documentElement.dataset.theme = theme;
  button.setAttribute("aria-label", themes[theme].label);
  icon.src = themes[theme].icon;
}

export function initTheme() {
  const button = document.querySelector("[data-theme-toggle]");
  const icon = document.querySelector("[data-theme-icon]");

  if (!button || !icon) {
    return;
  }

  applyTheme(document.documentElement.dataset.theme || "dark", button, icon);

  button.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === "light" ? "dark" : "light";

    applyTheme(nextTheme, button, icon);
  });
}
