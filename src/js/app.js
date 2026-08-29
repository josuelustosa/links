import { renderAbout } from "./about.js";
import { renderLinks } from "./links.js";
import { initTheme } from "./theme.js";

function renderProfile(profile) {
  const name = document.querySelector("[data-profile-name]");
  const role = document.querySelector("[data-profile-role]");
  const location = document.querySelector("[data-profile-location]");
  const avatar = document.querySelector("[data-profile-avatar]");

  if (name) {
    name.textContent = profile.name;
  }

  if (role) {
    role.textContent = profile.role;
  }

  if (location) {
    location.textContent = profile.location;
  }

  if (avatar && profile.avatar) {
    avatar.src = profile.avatar;
    avatar.alt = `Foto de perfil de ${profile.name}`;
  }
}

async function loadSiteData() {
  const response = await fetch("./data/site.json");

  if (!response.ok) {
    throw new Error("Não foi possível carregar os dados do perfil.");
  }

  return response.json();
}

async function initApp() {
  initTheme();

  try {
    const site = await loadSiteData();
    const links = document.querySelector("[data-link-list]");

    renderProfile(site.profile);
    renderAbout(site.profile);

    if (links) {
      renderLinks(site.links, links);
    }
  } catch (error) {
    console.error(error);
    const status = document.querySelector("[data-app-status]");

    if (status) {
      status.textContent = "Não foi possível atualizar os dados do perfil.";
    }
  }
}

initApp();
