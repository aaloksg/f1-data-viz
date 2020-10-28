var F1DataVis = F1DataVis || {};
F1DataVis.Texts = F1DataVis.Texts || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};
F1DataVis.IdStore.ButtonNormal = 'ButtonNormal_Gradient';
F1DataVis.IdStore.ButtonPressed = 'ButtonPressed_Gradient';
F1DataVis.IdStore.ButtonHover = 'ButtonHover_Gradient';
F1DataVis.IdStore.DashBoardGrad = 'DashBoard_Gradient';
F1DataVis.IdStore.LogoHover = 'LogoHover_gradient';
F1DataVis.IdStore.LogoNormal = 'LogoNormal_gradient';
F1DataVis.IdStore.LogoPressed = 'LogoPressed_gradient';

F1DataVis.IdStore.TooltipGrad = 'Tooltip_Gradient';
F1DataVis.IdStore.ButtonNormalURL = 'url(#' + F1DataVis.IdStore.ButtonNormal + ')';
F1DataVis.IdStore.ButtonPressedURL = 'url(#' + F1DataVis.IdStore.ButtonPressed + ')';
F1DataVis.IdStore.ButtonHoverURL = 'url(#' + F1DataVis.IdStore.ButtonHover + ')';
F1DataVis.IdStore.DashBoardGradURL = 'url(#' + F1DataVis.IdStore.DashBoardGrad + ')';
F1DataVis.IdStore.TooltipGradURL = 'url(#' + F1DataVis.IdStore.TooltipGrad + ')';

F1DataVis.IdStore.LogoNormalURL = 'url(#' + F1DataVis.IdStore.LogoNormal + ')';
F1DataVis.IdStore.LogoPressedURL = 'url(#' + F1DataVis.IdStore.LogoPressed + ')';
F1DataVis.IdStore.LogoHoverURL = 'url(#' + F1DataVis.IdStore.LogoHover + ')';

F1DataVis.f1Visualizer = function ( parentSvg ) {
    var self = this,
        _visualizationGrp,
        _introGrp,
        _transitionSpeed = 1500,
        _displayingVisualization = false,
        _f1Logo,
        _logoStyles = { smallWidth: 75, smallHeight: 75, largeWidth: 0, largeHeight: 0, smallX: 0, smallY: 0, largeX: 0, largeY: 0 },
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

            //Logo Normal gradient
            linearGrad = document.createElementNS( 'http://www.w3.org/2000/svg', 'linearGradient' );
            linearGrad.setAttributeNS( null, 'id', F1DataVis.IdStore.LogoNormal );
            linearGrad.setAttributeNS( null, 'x1', '0%' );
            linearGrad.setAttributeNS( null, 'x2', '100%' );
            linearGrad.setAttributeNS( null, 'y1', '0%' );
            linearGrad.setAttributeNS( null, 'y2', '0%' );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'id', F1DataVis.IdStore.LogoNormal + '_1' )
            stopElement.setAttributeNS( null, 'offset', '0%' );
            stopElement.setAttributeNS( null, 'stop-color', 'Black' );
            linearGrad.appendChild( stopElement );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'id', F1DataVis.IdStore.LogoNormal + '_2' )
            stopElement.setAttributeNS( null, 'offset', '50%' );
            stopElement.setAttributeNS( null, 'stop-color', '#E70000' );
            linearGrad.appendChild( stopElement );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'id', F1DataVis.IdStore.LogoNormal + '_3' )
            stopElement.setAttributeNS( null, 'offset', '100%' );
            stopElement.setAttributeNS( null, 'stop-color', 'midnightblue' );
            linearGrad.appendChild( stopElement );

            defs.appendChild( linearGrad );

            //Logo Hovered gradient
            linearGrad = document.createElementNS( 'http://www.w3.org/2000/svg', 'linearGradient' );
            linearGrad.setAttributeNS( null, 'id', F1DataVis.IdStore.LogoHover );
            linearGrad.setAttributeNS( null, 'x1', '0%' );
            linearGrad.setAttributeNS( null, 'x2', '0%' );
            linearGrad.setAttributeNS( null, 'y1', '0%' );
            linearGrad.setAttributeNS( null, 'y2', '100%' );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'id', F1DataVis.IdStore.LogoHover + '_1' );
            stopElement.setAttributeNS( null, 'offset', '0%' );
            stopElement.setAttributeNS( null, 'stop-color', '#061f37' );
            linearGrad.appendChild( stopElement );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'id', F1DataVis.IdStore.LogoHover + '_2' );
            stopElement.setAttributeNS( null, 'offset', '100%' );
            stopElement.setAttributeNS( null, 'stop-color', 'Black' );
            linearGrad.appendChild( stopElement );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'id', F1DataVis.IdStore.LogoHover + '_3' );
            stopElement.setAttributeNS( null, 'offset', '100%' );
            stopElement.setAttributeNS( null, 'stop-color', '#E70000' );
            linearGrad.appendChild( stopElement );

            defs.appendChild( linearGrad );

            //Logo Pressed gradient
            linearGrad = document.createElementNS( 'http://www.w3.org/2000/svg', 'linearGradient' );
            linearGrad.setAttributeNS( null, 'id', F1DataVis.IdStore.LogoPressed );
            linearGrad.setAttributeNS( null, 'x1', '0%' );
            linearGrad.setAttributeNS( null, 'x2', '0%' );
            linearGrad.setAttributeNS( null, 'y1', '0%' );
            linearGrad.setAttributeNS( null, 'y2', '100%' );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '0%' );
            stopElement.setAttributeNS( null, 'stop-color', '#005AD4' );
            linearGrad.appendChild( stopElement );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '50%' );
            stopElement.setAttributeNS( null, 'stop-color', 'Black' );
            linearGrad.appendChild( stopElement );

            stopElement = document.createElementNS( 'http://www.w3.org/2000/svg', 'stop' );
            stopElement.setAttributeNS( null, 'offset', '100%' );
            stopElement.setAttributeNS( null, 'stop-color', '#E7000' );

            defs.appendChild( linearGrad );
        },
        _onLogoClicked = function () {
            // check _displayingVisualization
            if ( _displayingVisualization ) {
                _displayingVisualization = false;
                self.introducer.startStopAnim( !_displayingVisualization );
                _introGrp
                    .attr( 'transform', 'translate(0,0)' )
                    .attr( 'opacity', 0 )
                    .transition()
                    .duration( _transitionSpeed )
                    .attr( 'opacity', 1 );
                _visualizationGrp
                    .attr( 'transform', 'translate(0,0)' )
                    .transition()
                    .duration( _transitionSpeed )
                    .attr( 'transform', 'translate(0,' + ( self.height * 1.5 ) + ')' );
                _f1Logo
                    .transition()
                    .duration( _transitionSpeed )
                    .attr( 'x', _logoStyles.largeX )
                    .attr( 'y', _logoStyles.largeY )
                    .attr( 'height', _logoStyles.largeHeight )
                    .attr( 'width', _logoStyles.largeWidth );

            } else {
                _displayingVisualization = true;
                self.introducer.startStopAnim( !_displayingVisualization );
                _introGrp
                    .attr( 'opacity', 1 )
                    .transition()
                    .duration( _transitionSpeed )
                    .attr( 'opacity', 0 )
                    .on( 'end', function () {
                        _introGrp.attr( 'transform', 'translate(0,' + ( self.height * -1.5 ) + ')' );
                    } );
                _visualizationGrp
                    .attr( 'transform', 'translate(0,' + ( self.height * 1.5 ) + ')' )
                    .transition()
                    .duration( _transitionSpeed )
                    .attr( 'transform', 'translate(0,0)' );
                _f1Logo
                    .transition()
                    .duration( _transitionSpeed )
                    .attr( 'x', _logoStyles.smallX )
                    .attr( 'y', _logoStyles.smallY )
                    .attr( 'height', _logoStyles.smallHeight )
                    .attr( 'width', _logoStyles.smallWidth );

            }
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
        this.introducer = new F1DataVis.introducer( _introGrp, _logoStyles, this );
        _createStyles();
        _logoStyles.largeWidth = this.width / 5;
        _logoStyles.largeHeight = _logoStyles.largeWidth / 16 * 9;
        _logoStyles.largeX = width / 2 - _logoStyles.largeWidth / 2;
        _logoStyles.largeY = height / 2 - _logoStyles.largeHeight * 0.75;

        _f1Logo = d3.select( this.parentSvg )
            .append( 'image' )
            .attr( 'x', _logoStyles.largeX )
            .attr( 'y', _logoStyles.largeY )
            .attr( 'height', _logoStyles.largeHeight )
            .attr( 'width', _logoStyles.largeWidth )
            .attr( 'href', './images/F1-Logo.png' )
            .attr( 'cursor', 'pointer' )
            .on( 'click', _onLogoClicked )
            .on( 'mouseover', function () {
                d3.select( '#' + F1DataVis.IdStore.LogoHover + '_2' )
                    .transition()
                    .duration( 200 )
                    .attr( 'offset', '50%' );
            } )
            .on( 'mouseout', function () {
                d3.select( '#' + F1DataVis.IdStore.LogoHover + '_2' )
                    .transition()
                    .duration( 200 )
                    .attr( 'offset', '100%' );
            } );

        _visualizationGrp.attr( 'transform', 'translate(0,' + ( height * 1.5 ) + ')' );
    };

    this.draw = function () {
        this.slider.draw();
        _logoStyles.smallX = 0;
        _logoStyles.smallY = this.slider.yPosition;
        this.parallelCoords.initialize( this.width, this.slider.yPosition );
        this.sliderMoved( this.slider.getValue() );
        this.introducer.draw();
        this.introducer.startStopAnim( !_displayingVisualization );

        // Transition intro group in.
        _introGrp
            .attr( 'opacity', 0 )
            .transition()
            .duration( 2 * _transitionSpeed )
            .attr( 'opacity', 1 );
    };

    this.update = function ( width, height ) {
        if ( this.width !== width || this.height !== height ) {
            this.width = width;
            this.height = height;
            this.slider.update();
        }
    };

    this.sliderMoved = function ( year ) {
        var raceIds = F1DataVis.dataHandler.getRaceIdsInYear( year );
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
};