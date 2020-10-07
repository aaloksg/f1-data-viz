var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};

F1DataVis.f1Visualizer = function (parentSvg) {
    this.parentSvg = parentSvg;


    this.slider = null;

    this.initialize = function ( width, height ) {
        this.width = width;
        this.height = height;
    };

    this.draw = function () {
        sliderYPos = this.height - 100;
        this.slider = new F1DataVis.timeSlider( this.parentSvg, this, sliderYPos );
        this.slider.draw();
    };

    this.update = function ( width, height ) {
        if ( this.width !== width || this.height !== height ) {
            this.width = width;
            this.height = height;
            this.slider.update();
        }
    };
}