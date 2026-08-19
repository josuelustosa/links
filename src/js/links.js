function createIcon(icon) {
  const image = document.createElement("img");

  image.className = "icon-social";
  image.src = `assets/icons/${icon}.svg`;
  image.alt = "";
  image.setAttribute("aria-hidden", "true");

  return image;
}

export function renderLinks(links, container) {
  const fragment = document.createDocumentFragment();

  links
    .filter((link) => link.visible)
    .forEach((link) => {
      const item = document.createElement("li");
      const anchor = document.createElement("a");

      anchor.href = link.href;
      anchor.append(createIcon(link.icon), document.createTextNode(link.title));

      if (link.featured) {
        anchor.classList.add("link--featured");
      }

      if (link.newTab) {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      }

      item.append(anchor);
      fragment.append(item);
    });

  container.replaceChildren(fragment);
}
