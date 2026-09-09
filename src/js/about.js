function createTechnologyTag(technology) {
  const item = document.createElement("li");
  const icon = document.createElement("span");

  item.className = "technology-tag";
  item.dataset.technology = technology.id;
  item.title = technology.label;

  icon.className = "technology-icon";
  icon.setAttribute("role", "img");
  icon.setAttribute("aria-label", technology.label);
  const maskImage = `url("assets/icons/devicons/${technology.icon}.svg")`;

  icon.style.maskImage = maskImage;
  icon.style.webkitMaskImage = maskImage;

  item.append(icon);
  return item;
}

export function renderAbout(profile) {
  const bio = document.querySelector("[data-profile-bio]");
  const technologyList = document.querySelector("[data-technology-list]");

  if (bio) {
    bio.textContent = profile.bio;
  }

  if (!technologyList) {
    return;
  }

  const technologies = Array.isArray(profile.technologies)
    ? profile.technologies
    : [];

  technologyList.replaceChildren(...technologies.map(createTechnologyTag));
}
