export function initTabs(tabList) {
  const tabs = [...tabList.querySelectorAll('[role="tab"]')];

  function activateTab(tab) {
    tabs.forEach((item) => {
      const selected = item === tab;
      const panel = document.getElementById(item.getAttribute("aria-controls"));

      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;

      if (panel) {
        panel.hidden = !selected;
      }
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      const movement = {
        ArrowRight: 1,
        ArrowLeft: -1,
        Home: -index,
        End: tabs.length - index - 1,
      }[event.key];

      if (movement === undefined) {
        return;
      }

      event.preventDefault();
      const nextTab = tabs[(index + movement + tabs.length) % tabs.length];

      nextTab.focus();
      activateTab(nextTab);
    });
  });
}
