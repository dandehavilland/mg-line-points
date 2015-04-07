// helpers

if (typeof d3.selection.prototype.moveToFront === 'undefined') {
  d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };
}
