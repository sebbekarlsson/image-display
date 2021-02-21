import { SVG } from "./SVG";
import { Camera } from "../models/Camera";

const displayStyle: string = `
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

export function Display(data: string): HTMLElement {
  this.data = data;
  this.svg = null;
  this.prevX = 0;
  this.prevY = 0;
  this.camera = new Camera(0, 0, 1, function (x, y) {}.bind(this));

  this.rect = function () {
    return this.ref.getBoundingClientRect();
  }.bind(this);

  this.onDragStart = function (e: Event) {
    const coords = this.getCoordsInRect(e.clientX, e.clientY);
    this.prevX = coords.x;
    this.prevY = coords.y;
    e.dataTransfer.setDragImage(new Image(), 0, 0);
  };

  this.getCoordsInRect = function (x: number, y: number) {
    const rect = this.rect();
    return { x: x - rect.left, y: y - rect.top };
  }.bind(this);

  this.onDragOver = function (e) {
    const coords = this.getCoordsInRect(e.clientX, e.clientY);

    const deltaX: number = -(this.prevX - coords.x) / this.camera.zoom;
    const deltaY: number = -(this.prevY - coords.y) / this.camera.zoom;

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
    const coords = this.getCoordsInRect(e.clientX, e.clientY);
  };

  this.onMouseWheel = function (e) {
    e.preventDefault();

    const delta: number = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    const scaleAmount: number = 1.0 + delta / 10.0;
    this.camera.zoom += (delta / 5.0) * this.camera.zoom;

    let r = this.svg.rect();
    const aspect: number = r.width / r.height;
    r = this.svg.rect();

    const svgRect = this.svg.rect();
    const w: number = this.svg.rect().width * this.camera.zoom;
    const h: number = w / aspect;
    this.camera.translate(this.camera.x, this.camera.y, this.camera.zoom);
    this.svg.render();
  }.bind(this);

  this.onKeyDown = function (e: Event) {
    if (
      (e.key === "Escape" || e.key === "Esc") &&
      this.ref &&
      this.ref.parentNode
    ) {
      this.ref.parentNode.removeChild(this.ref);
    }
  }.bind(this);
  window.addEventListener("keydown", this.onKeyDown);

  const init = function () {
    let interval = setInterval(
      function () {
        if (this.svg && this.svg.ref && this.svg.loaded) {
          let rect = this.rect();
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

  return (
    <div
      draggable={true}
      onDragOver={this.onDragOver.bind(this)}
      onDragStart={this.onDragStart.bind(this)}
      onDragEnd={this.onDragEnd.bind(this)}
      onMouseWheel={this.onMouseWheel.bind(this)}
      style={displayStyle}
    >
      <SVG camera={this.camera} holder={this} data={data} />
    </div>
  );
}
