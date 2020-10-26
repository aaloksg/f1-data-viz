var F1DataVis = F1DataVis || {};
F1DataVis.Texts = F1DataVis.Texts || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};
F1DataVis.IdStore.ButtonNormal = 'ButtonNormal_Gradient';
F1DataVis.IdStore.ButtonPressed = 'ButtonPressed_Gradient';
F1DataVis.IdStore.ButtonHover = 'ButtonHover_Gradient';
F1DataVis.IdStore.DashBoardGrad = 'DashBoard_Gradient';
F1DataVis.IdStore.TooltipGrad = 'Tooltip_Gradient';
F1DataVis.IdStore.ButtonNormalURL = 'url(#' + F1DataVis.IdStore.ButtonNormal + ')';
F1DataVis.IdStore.ButtonPressedURL = 'url(#' + F1DataVis.IdStore.ButtonPressed + ')';
F1DataVis.IdStore.ButtonHoverURL = 'url(#' + F1DataVis.IdStore.ButtonHover + ')';
F1DataVis.IdStore.DashBoardGradURL = 'url(#' + F1DataVis.IdStore.DashBoardGrad + ')';
F1DataVis.IdStore.TooltipGradURL = 'url(#' + F1DataVis.IdStore.TooltipGrad + ')';

F1DataVis.f1Visualizer = function ( parentSvg ) {
    var self = this,
        _visualizationGrp,
        _introGrp,
        _transitionSpeed = 1500,
        _displayingVisualization = false,
        _f1Logo,
        _logoStyles = {smallWidth: 75, smallHeight: 75, largeWidth: 300, largeHeight: 300, smallX:0, smallY:0, largeX: 0, largeY: 0},
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

            //Tooltip gradient

            linearGrad = document.createElementNS( 'http://www.w3.org/2000/svg', 'linearGradient' );
            linearGrad.setAttributeNS( null, 'id', F1DataVis.IdStore.TooltipGrad );
            linearGrad.setAttributeNS( null, 'x1', '0%' );
            linearGrad.setAttributeNS( null, 'x2', '0%' );
            linearGrad.setAttributeNS( null, 'y1', '0%' );
            linearGrad.setAttributeNS( null, 'y2', '100%' );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '0%' );
            stopElement.setAttributeNS( null, 'stop-color', '#061f37' );
            linearGrad.appendChild( stopElement );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '66%' );
            stopElement.setAttributeNS( null, 'stop-color', 'Black' );
            linearGrad.appendChild( stopElement );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '100%' );
            stopElement.setAttributeNS( null, 'stop-color', '#E70000' );
            linearGrad.appendChild( stopElement );

            defs.appendChild( linearGrad );
        },
        _onLogoClicked = function (),
        _createTexts = function () {
            F1DataVis.Texts.ClickToStart = 'Click to start!';
            F1DataVis.Texts.IntroTexts = {
                line1: ''
            };
        };

    this.width = 0;
    this.height = 0;

    this.parentSvg = parentSvg;
    this.parallelCoords = null;

    this.slider = null;

    this.initialize = function ( width, height ) {
        this.width = width;
        this.height = height;
        _visualizationGrp = d3.select( this.parentSvg )
            .append( 'g' )
            .attr( 'id', 'VisualizationGrp' );
        _introGrp = d3.select( this.parentSvg )
            .append( 'g' )
            .attr( 'id', 'IntroductionGrp' );
        this.slider = new F1DataVis.timeSlider( _visualizationGrp, this );
        this.parallelCoords = new F1DataVis.paraCoorder( _visualizationGrp, this );

        _createStyles();

        _logoStyles.largeX = width / 2 - _logoStyles.largeWidth / 2;
        _logoStyles.largeY = height / 2 - _logoStyles.largeHeight;

        _f1Logo = d3.select( this.parentSvg )
            .append( 'image' )
            .attr( 'x', _logoStyles.largeX )
            .attr( 'y', _logoStyles.largeY )
            .attr( 'height', _logoStyles.largeHeight )
            .attr( 'width', _logoStyles.largeWidth )
            .attr( 'href', './images/F1-Logo.png' )
            .on( 'click', _onLogoClicked );

        _visualizationGrp.attr( 'transform', 'translate(0,' + ( height * 1.5 ) + ')' );
    };

    this.draw = function () {
        this.slider.draw();
        _logoStyles.smallX = 0;
        _logoStyles.smallY = this.slider.yPosition;
        this.parallelCoords.initialize( this.width, this.slider.yPosition );
        this.sliderMoved( this.slider.getValue() );

        this.drawIntroduction();
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
        self.parallelCoords.sliderHandleClicked( self.slider.getValue() );
    };

    this.updateDashBoard = function ( bounds ) {
        this.slider.updateDashBoard( bounds );
    };

    this.getDashBoardBounds = function () {
        return this.paraCoorder.getDashBoardBounds();
    };

    this.drawIntroduction = function (){

    };
}