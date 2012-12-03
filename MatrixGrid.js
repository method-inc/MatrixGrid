(function (global) {

  var defaults = {
    gridOffset: 10,
    color: '#ffc0cb',
    width: 500
  };

  /**
   * Module to draw the matrix grid based on a given matrix and origin
   *
   * @param {Object} (options={}) The options object
   * @property {Integer} [options.gridOffset=10] The offset between each grid line
   * @property {String} [options.color='#ffc0cb'] Color string to fill each grid line
   * @property {bonsai:Matrix} [options.matrix=bonsai:Matrix] The grid matrix
   * @property {bonsai:Point} [options.origin=bonsai:Point{0, 0}] The origin point
   * @property {Integer} [options.width] The height/width of the grid
   */
  var MatrixGrid = function (options) {
    options || (options = {});
    this.gridOffset = options.gridOffset || defaults.gridOffset;
    this.color = options.color || options.fill || defaults.color;
    this.matrix = options.matrix || new Matrix().identity();
    this.origin = options.origin || new Point(0, 0);
    this.width = options.width || defaults.width;
    this.elements = new Group();

    // initializer
    this.update(this.matrix, this.origin);
    this.draw();
  };

  MatrixGrid.prototype = {

    /**
     * Updates the current MatrixGrid
     * @method update
     *
     * @param {bonsai:Matrix} matrix The new matrix to draw
     * @param {bonsai:Point} [origin] The new transform origin (optional)
     */
    update: function(matrix, origin) {
      if (origin) {
        this.origin = origin;
        this.elements.attr('origin', this.origin);
      }

      this.matrix = matrix;
      this.elements.attr('matrix', this.matrix);

      this.draw();
    },

    /**
     * Draws the MatrixGrid
     * @method draw
     */
    draw: function () {
      var i = Math.round(this.width/this.gridOffset/2),
          start = -this.width/2,
          lineWidth = 1,
          offset;

      this.clear();
      while (--i > -2) {
        offset = i*this.gridOffset;
        // x
        new Rect(this.origin.x+start, this.origin.y-offset, this.width, lineWidth).fill(this.color).addTo(this.elements);
        new Rect(this.origin.x+start, this.origin.y+offset, this.width, lineWidth).fill(this.color).addTo(this.elements);
        // y
        new Rect(this.origin.x-offset, this.origin.y+start, lineWidth, this.width).fill(this.color).addTo(this.elements);
        new Rect(this.origin.x+offset, this.origin.y+start, lineWidth, this.width).fill(this.color).addTo(this.elements);
      }
      // origin
      new Rect(this.origin.x-2, this.origin.y-2, 4, 4).fill('black').addTo(this.elements);

      this.elements.addTo(stage);
    },

    /**
     * Clear the MatrixGrid
     * @method draw
     */
    clear: function () {
      this.elements.clear();
    },

    /**
     * Clear all internal references to things that may take up memory
     * @method destroy
     */
    destroy: function () {
      var self = this;
      this.elements.destroy();
      Object.getOwnPropertyNames(this).forEach(function (prop) {
        delete self[prop];
      });
    }

  };

  if (typeof module != 'undefined') module.exports = MatrixGrid;
  else if (typeof define == 'function' && define.amd) define(MatrixGrid);
  else global['MatrixGrid'] = MatrixGrid;
})(this);


