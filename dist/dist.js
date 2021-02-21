/* Bundled with FJB */ function globalDef(value) {
  return window && value && value.name && (window[value.name] = value);
}
var __jsx_queue = [];
globalDef(__jsx_queue);
function __isElement(obj) {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    return (
      typeof obj === "object" &&
      obj.nodeType === 1 &&
      typeof obj.style === "object" &&
      typeof obj.ownerDocument === "object"
    );
  }
}
globalDef(__isElement);
function __toElement(val) {
  if (__isElement(val)) return val;
  if (typeof val == "string" || typeof val == "number")
    return document.createTextNode(val);
  return val;
}
function __jsx_append_many(parent, elements) {
  for (var i = 0; i < elements.length; i++) {
    parent.appendChild(__toElement(elements[i]));
  }
}
globalDef(__jsx_append_many);
function __jsx_append(parent, el) {
  if (!Array.isArray(el)) return parent.appendChild(__toElement(el));
  return __jsx_append_many(parent, el);
}
globalDef(__jsx_append);
function React_createTextNode(text) {
  return React.createElement("span", null, text);
}
globalDef(React_createTextNode);
var _fjb4 = function (module = {}, exports = {}) {
  var svgStyle = `
  pointer-events: none;
  position: relative;
`;
  function SVG /* TS TYPE `HTMLElement` */(holder, data, camera) {
    this.data = data;
    this.holder = holder;
    this.holder.svg = this;
    this.loaded = false;
    this.camera = camera;
    this.rect = function () {
      return this.ref.getBoundingClientRect();
    }.bind(this);
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.onLoad = function () {
      this.loaded = true;
    };
    this.setSize = function (w, h) {
      this.w = w;
      this.h = h;
    }.bind(this);
    this.render = function () {
      var zoom = this.camera.zoom;
      var aspect = this.w / this.h;
      var w = this.camera.zoom * this.w;
      var h = w / aspect;
      var x = this.w / 2 + this.camera.x * zoom + this.x;
      var y = this.h / 2 + this.camera.y * zoom + this.y;
      this.ref.style.width = w + "px";
      this.ref.style.height = h + "px";
      this.ref.style.left = x + "px";
      this.ref.style.top = y + "px";
    }.bind(this);
    return function () {
      this.ref = this.element = function () {
        let parent = document.createElement("object");
        return parent;
      }.bind(
        this
      )(/* load=this.onLoad.bind(this),data=data,type="image/svg+xml",style=svgStyle */);
      this.ref.addEventListener("load", this.onLoad.bind(this));
      this.ref.setAttribute("data", data);
      this.ref.setAttribute("type", "image/svg+xml");
      this.ref.setAttribute("style", svgStyle);
      return this.ref;
    }.apply(this);
  }
  if (typeof this !== "undefined") {
    this.SVG = SVG;
  }
  var _exp = module.exports || exports;
  return typeof _exp == "function" ? _exp : Object.assign(this, _exp);
}.call({}, {}, {});
let SVG = _fjb4.SVG || _fjb4;
var _fjb9 = function (module = {}, exports = {}) {
  function Camera(x, y, zoom) {
    this.x = x;
    this.y = y;
    this.zoom = zoom;
    this.translate = function (x, y, zoom) {
      this.x = x;
      this.y = y;
      if (typeof zoom != "undefined" && zoom != null) {
        this.zoom = zoom;
      }
    }.bind(this);
  }
  if (typeof this !== "undefined") {
    this.Camera = Camera;
  }
  var _exp = module.exports || exports;
  return typeof _exp == "function" ? _exp : Object.assign(this, _exp);
}.call({}, {}, {});
let Camera = _fjb9.Camera || _fjb9;
var _fjb1 = function (module = {}, exports = {}) {
  var displayStyle /* TS TYPE `string` */ = `
  background-color: lightgray;
  display: block;
  min-width: 100%;
  min-height: 100%;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 90 !important;
  pointer-events: all;
  cursor: grab;
`;
  function Display /* TS TYPE `HTMLElement` */(data) {
    this.data = data;
    this.svg = null;
    this.prevX = 0;
    this.prevY = 0;
    this.camera = new Camera(0, 0, 1, function (x, y) {}.bind(this));
    this.rect = function () {
      return this.ref.getBoundingClientRect();
    }.bind(this);
    this.onDragStart = function (e) {
      var coords = this.getCoordsInRect(e.clientX, e.clientY);
      this.prevX = coords.x;
      this.prevY = coords.y;
      e.dataTransfer.setDragImage(new Image(), 0, 0);
    };
    this.getCoordsInRect = function (x, y) {
      var rect = this.rect();
      return { x: x - rect.left, y: y - rect.top };
    }.bind(this);
    this.onDragOver = function (e) {
      var coords = this.getCoordsInRect(e.clientX, e.clientY);
      var deltaX = -(this.prevX - coords.x) / this.camera.zoom;
      var deltaY = -(this.prevY - coords.y) / this.camera.zoom;
      this.camera.translate(
        this.camera.x + deltaX,
        this.camera.y + deltaY,
        this.camera.zoom
      );
      this.prevX = coords.x;
      this.prevY = coords.y;
      this.svg.render();
    };
    this.onDragEnd = function (e) {
      var coords = this.getCoordsInRect(e.clientX, e.clientY);
    };
    this.onMouseWheel = function (e) {
      e.preventDefault();
      var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      var scaleAmount = 1 + delta / 10;
      this.camera.zoom += (delta / 5) * this.camera.zoom;
      var r = this.svg.rect();
      var aspect = r.width / r.height;
      r = this.svg.rect();
      var svgRect = this.svg.rect();
      var w = this.svg.rect().width * this.camera.zoom;
      var h = w / aspect;
      this.camera.translate(this.camera.x, this.camera.y, this.camera.zoom);
      this.svg.render();
    }.bind(this);
    this.onKeyDown = function (e) {
      if (
        (e.key === "Escape" || e.key === "Esc") &&
        this.ref &&
        this.ref.parentNode
      ) {
        this.ref.parentNode.removeChild(this.ref);
      }
    }.bind(this);
    window.addEventListener("keydown", this.onKeyDown);
    var init = function () {
      var interval = setInterval(
        function () {
          if (this.svg && this.svg.ref && this.svg.loaded) {
            var rect = this.rect();
            this.svg.setSize(
              rect.width * this.camera.zoom,
              rect.height * this.camera.zoom
            );
            this.camera.translate(-(this.svg.w / 2), -(this.svg.h / 2));
            this.svg.render();
            clearInterval(interval);
          }
        }.bind(this),
        60
      );
    }.bind(this);
    init();
    return function () {
      this.ref = this.element = function () {
        let parent = document.createElement("div");
        __jsx_append(
          parent,
          function () {
            this.ref = this.element = function () {
              let parent = new SVG(
                (holder = this),
                (data = data),
                (camera = this.camera)
              );
              SVG;
              return parent;
            }.bind(this)(/* holder=this,data=data,camera=this.camera */);
            this.ref.setAttribute("holder", this);
            this.ref.setAttribute("data", data);
            this.ref.setAttribute("camera", this.camera);
            return this.ref;
          }.apply(this)
        );
        return parent;
      }.bind(
        this
      )(/* draggable=true,dragover=this.onDragOver.bind(this),dragstart=this.onDragStart.bind(this),dragend=this.onDragEnd.bind(this),mousewheel=this.onMouseWheel.bind(this),style=displayStyle */);
      this.ref.setAttribute("draggable", true);
      this.ref.addEventListener("dragover", this.onDragOver.bind(this));
      this.ref.addEventListener("dragstart", this.onDragStart.bind(this));
      this.ref.addEventListener("dragend", this.onDragEnd.bind(this));
      this.ref.addEventListener("mousewheel", this.onMouseWheel.bind(this));
      this.ref.setAttribute("style", displayStyle);
      return this.ref;
    }.apply(this);
  }
  if (typeof this !== "undefined") {
    this.Display = Display;
  }
  var _exp = module.exports || exports;
  return typeof _exp == "function" ? _exp : Object.assign(this, _exp);
}.call({}, {}, {});
let Display = _fjb1.Display || _fjb1;
/* - `src/index.jsx` */ document.getElementById("root").appendChild(
  function () {
    this.ref = this.element = function () {
      let parent = new Display((data = "callgrind.svg"));
      Display;
      return parent;
    }.bind(this)(/* data="callgrind.svg" */);
    this.ref.setAttribute("data", "callgrind.svg");
    return this.ref;
  }.apply(this)
);
