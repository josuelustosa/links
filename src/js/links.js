const iconPaths = {
  "arrow-right": "assets/icons/phosphor/regular/arrow-right.svg",
  "arrow-square-out": "assets/icons/phosphor/regular/arrow-square-out.svg",
  envelope: "assets/icons/phosphor/regular/envelope.svg",
  "file-text": "assets/icons/phosphor/regular/file-text.svg",
  globe: "assets/icons/phosphor/regular/globe.svg",
  "github-logo": "assets/icons/phosphor/regular/github-logo.svg",
  "linkedin-logo": "assets/icons/phosphor/regular/linkedin-logo.svg",
};

function createIcon(icon, className) {
  const element = document.createElement("span");
  const path = iconPaths[icon];

  element.className = className;
  element.setAttribute("aria-hidden", "true");

  if (path) {
    const maskImage = `url("${path}")`;

    element.style.maskImage = maskImage;
    element.style.webkitMaskImage = maskImage;
  }

  return element;
}

function createText(className, text) {
  const element = document.createElement("span");

  element.className = className;
  element.textContent = text;

  return element;
}

function getAccessibleLabel(link) {
  const segments = [link.title, link.description, link.actionLabel]
    .filter(Boolean)
    .map((segment) => (segment.endsWith(".") ? segment : `${segment}.`))
    .join(" ");

  return link.newTab ? `${segments} Abre em nova aba.` : segments;
}

function applyLinkAttributes(anchor, link) {
  anchor.href = link.href;
  anchor.setAttribute("aria-label", getAccessibleLabel(link));

  if (link.newTab) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }
}

function createIndicator(link) {
  const indicator = document.createElement("span");

  indicator.className = "link-card__indicator";
  const icon = link.newTab ? "arrow-square-out" : "arrow-right";

  indicator.append(createIcon(icon, "link-card__indicator-icon"));
  return indicator;
}

function createAction(link) {
  const action = document.createElement("a");

  action.className = "link-card__indicator link-card__action";
  applyLinkAttributes(action, link);
  action.append(
    createText("link-card__action-label", link.actionLabel),
    createIcon("arrow-right", "link-card__action-icon"),
  );

  return action;
}

function createCard(link) {
  const item = document.createElement("li");
  const isCta = link.variant === "cta";
  const card = document.createElement(isCta ? "article" : "a");
  const icon = document.createElement("span");
  const content = document.createElement("span");
  const title = createText("link-card__title", link.title);

  item.className = "link-list__item";
  card.className = `link-card link-card--${link.variant || "default"}`;

  if (isCta) {
    title.id = `link-card-title-${link.id}`;
    card.setAttribute("aria-labelledby", title.id);
  } else {
    applyLinkAttributes(card, link);
  }

  icon.className = "link-card__icon";
  icon.append(createIcon(link.icon, "link-card__icon-glyph"));

  content.className = "link-card__content";
  content.append(title, createText("link-card__description", link.description));

  card.append(
    icon,
    content,
    isCta ? createAction(link) : createIndicator(link),
  );
  item.append(card);

  return item;
}

export function renderLinks(links, container) {
  const fragment = document.createDocumentFragment();

  links
    .filter((link) => link.visible)
    .forEach((link) => fragment.append(createCard(link)));

  container.replaceChildren(fragment);
}
