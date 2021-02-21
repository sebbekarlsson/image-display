export function Camera(x: number, y: number, zoom: number) {
  this.x = x;
  this.y = y;
  this.zoom = zoom;

  this.translate = function (x: number, y: number, zoom: number) {
    this.x = x;
    this.y = y;
    if (typeof zoom != "undefined" && zoom != null) this.zoom = zoom;
  }.bind(this);
}
