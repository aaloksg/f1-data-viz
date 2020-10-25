var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};
F1DataVis.IdStore.ButtonNormal = 'ButtonNormal_Gradient';
F1DataVis.IdStore.ButtonPressed = 'ButtonPressed_Gradient';
F1DataVis.IdStore.ButtonHover = 'ButtonHover_Gradient';
F1DataVis.IdStore.DashBoardGrad = 'DashBoard_Gradient';
F1DataVis.IdStore.ButtonNormalURL = 'url(#' + F1DataVis.IdStore.ButtonNormal + ')';
F1DataVis.IdStore.ButtonPressedURL = 'url(#' + F1DataVis.IdStore.ButtonPressed + ')';
F1DataVis.IdStore.ButtonHoverURL = 'url(#' + F1DataVis.IdStore.ButtonHover + ')';
F1DataVis.IdStore.DashBoardGradURL = 'url(#' + F1DataVis.IdStore.DashBoardGrad + ')';

F1DataVis.f1Visualizer = function ( parentSvg ) {
    var self = this,
        _createStyles = function () {
            var defs = document.getElementById( F1DataVis.IdStore.defs ), linearGrad, stopElement;
            // Normal gradient
            linearGrad = document.createElementNS( 'http://www.w3.org/2000/svg', 'linearGradient' );
            linearGrad.setAttributeNS( null, 'id', F1DataVis.IdStore.ButtonNormal );
            linearGrad.setAttributeNS( null, 'x1', '0%' );
            linearGrad.setAttributeNS( null, 'x2', '0%' );
            linearGrad.setAttributeNS( null, 'y1', '0%' );
            linearGrad.setAttributeNS( null, 'y2', '100%' );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '0%' );
            stopElement.setAttributeNS( null, 'stop-color', '#061f37' );
            linearGrad.appendChild( stopElement );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '100%' );
            stopElement.setAttributeNS( null, 'stop-color', '#061f37' );
            linearGrad.appendChild( stopElement );

            defs.appendChild( linearGrad );

            // Hovered gradient
            linearGrad = document.createElementNS( 'http://www.w3.org/2000/svg', 'linearGradient' );
            linearGrad.setAttributeNS( null, 'id', F1DataVis.IdStore.ButtonHover );
            linearGrad.setAttributeNS( null, 'x1', '0%' );
            linearGrad.setAttributeNS( null, 'x2', '0%' );
            linearGrad.setAttributeNS( null, 'y1', '0%' );
            linearGrad.setAttributeNS( null, 'y2', '100%' );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '0%' );
            stopElement.setAttributeNS( null, 'stop-color', '#061f37' );
            linearGrad.appendChild( stopElement );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '100%' );
            stopElement.setAttributeNS( null, 'stop-color', '#E70000' );
            linearGrad.appendChild( stopElement );

            defs.appendChild( linearGrad );

            // Pressed gradient
            linearGrad = document.createElementNS( 'http://www.w3.org/2000/svg', 'linearGradient' );
            linearGrad.setAttributeNS( null, 'id', F1DataVis.IdStore.ButtonPressed );
            linearGrad.setAttributeNS( null, 'x1', '0%' );
            linearGrad.setAttributeNS( null, 'x2', '0%' );
            linearGrad.setAttributeNS( null, 'y1', '0%' );
            linearGrad.setAttributeNS( null, 'y2', '100%' );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '0%' );
            stopElement.setAttributeNS( null, 'stop-color', '#005AD4' );
            linearGrad.appendChild( stopElement );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '100%' );
            stopElement.setAttributeNS( null, 'stop-color', '#005AD4' );
            linearGrad.appendChild( stopElement );

            defs.appendChild( linearGrad );

            //Dashboard gradient

            linearGrad = document.createElementNS( 'http://www.w3.org/2000/svg', 'linearGradient' );
            linearGrad.setAttributeNS( null, 'id', F1DataVis.IdStore.DashBoardGrad );
            linearGrad.setAttributeNS( null, 'x1', '0%' );
            linearGrad.setAttributeNS( null, 'x2', '0%' );
            linearGrad.setAttributeNS( null, 'y1', '0%' );
            linearGrad.setAttributeNS( null, 'y2', '100%' );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '0%' );
            stopElement.setAttributeNS( null, 'stop-color', '#061f37' );
            linearGrad.appendChild( stopElement );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '100%' );
            stopElement.setAttributeNS( null, 'stop-color', 'Black' );
            linearGrad.appendChild( stopElement );

            defs.appendChild( linearGrad );
        };

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

        _createStyles();
    };

    this.draw = function () {
        this.slider.draw();
        this.parallelCoords.initialize( this.width, this.slider.yPosition );
        this.sliderMoved( this.slider.getValue() );
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
        F1DataVis.dataHandler.createCnstrctrStndgsByRaceIds( year );
        self.parallelCoords.drawSeason( year );
    };

    this.onSliderHandleClicked = function () {
        self.parallelCoords.sliderHandleClicked( self.slider.getValue());
    }

    this.updateDashBoard = function ( bounds ) {
        this.slider.updateDashBoard( bounds );
    }

    this.getDashBoardBounds = function () {

        return this.paraCoorder.getDashBoardBounds();
    }
}