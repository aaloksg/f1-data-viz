var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};

F1DataVis.f1Visualizer = function ( parentSvg ) {
    var self = this;

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

    this.sliderMoved = function ( year ) {
        console.log( 'slider value changed to - ' + year );
        var raceIds = F1DataVis.dataHandler.getRaceIdsInYear( year );
        console.log( 'RaceIds - ' + raceIds );
    };
}