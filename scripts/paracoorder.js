var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};

F1DataVis.paraCoorder = function ( parent, visualizer ) {
    var self = this
    _parent = parent,
        _visualizer = visualizer;

    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;

    this.initialize = function ( width, height ) {
        this.width = width;
        this.height = height;
    };

    this.draw = function ( year ) {

    };

    this.update = function ( width, height ) {
        if ( this.width !== width || this.height !== height ) {
            this.width = width;
            this.height = height;
        }
    };
}