const svgStyle = `
  pointer-events: none;
  position: relative;
`;

export function SVG(holder, data, camera): HTMLElement {
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
    const zoom = this.camera.zoom;

    var aspect = this.w / this.h;
    let w = this.camera.zoom * this.w;
    let h = w / aspect;
    let x = this.w / 2 + this.camera.x * zoom + this.x;
    let y = this.h / 2 + this.camera.y * zoom + this.y;

    this.ref.style.width = w + "px";
    this.ref.style.height = h + "px";
    this.ref.style.left = x + "px";
    this.ref.style.top = y + "px";
  }.bind(this);

  return (
    <object
      onLoad={this.onLoad.bind(this)}
      data={data}
      type="image/svg+xml"
      style={svgStyle}
    />
  );
}
