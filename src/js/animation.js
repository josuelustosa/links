var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ""),
    pre = (Array.prototype.slice
      .call(styles)
      .join("")
      .match(/-(moz|webkit|ms)-/) ||
      (styles.OLink === "" && ["", "o"]))[1];
  if (pre == "moz") return "";
  return "-" + pre + "-";
})();

var ang = -3;
var el = document.querySelector("#especial-link");

setInterval(function () {
  ang = -ang;
  el.style[prefix + "transform"] = "rotate(" + ang + "deg)";
}, 500);
