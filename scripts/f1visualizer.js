var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};

F1DataVis.f1Visualizer = function ( parentSvg ) {
    var self = this;
    this.width = 0;
    this.height = 0;

    this.parentSvg = parentSvg;
    this.parallelCoords = null;

    this.slider = null;

    this.initialize = function ( width, height ) {
        this.width = width;
        this.height = height;
        this.slider = new F1DataVis.timeSlider( this.parentSvg, this );
        this.parallelCoords = new F1DataVis.paraCoorder( this.parentSvg, this );
    };

    this.draw = function () {
        this.slider.draw();
        this.parallelCoords.initialize( this.width, this.slider.yPosition );
        this.sliderMoved( this.slider.getValue() )
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
        console.log('RaceIds - ' + raceIds);
        F1DataVis.dataHandler.createCnstrctrStndgsByRaceIds( year );
        self.parallelCoords.draw( year );
    };
}