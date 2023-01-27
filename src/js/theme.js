let themeToggler = document.getElementById("icon-theme");
themeToggler.addEventListener("click", () => {
  let targetTheme;
  let currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "light") {
    targetTheme = "dark";

    let iconTheme = document.querySelector("#icon-theme");
    iconTheme.setAttribute("src", "assets/icons/sun-theme.svg");
  } else {
    targetTheme = "light";

    let imgTheme = document.querySelector("#icon-theme");
    imgTheme.setAttribute("src", "assets/icons/moon-theme.svg");
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
});

let browserTheme = window.matchMedia("(prefers-color-scheme: light)").matches
  ? "light"
  : "dark";
