let themeToggler = document.getElementById("theme-toggler");
themeToggler.addEventListener("click", () => {
  let targetTheme;
  let currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "light") {
    targetTheme = "dark";
    themeToggler.setAttribute("class", "bi bi-sun-fill");
  } else {
    targetTheme = "light";
    themeToggler.setAttribute("class", "bi bi-moon-fill");
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
});

let browserTheme = window.matchMedia("(prefers-color-scheme: light)").matches
  ? "light"
  : "dark";
