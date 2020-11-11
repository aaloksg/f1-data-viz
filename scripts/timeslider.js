var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};

F1DataVis.IdStore.sliderParent = 'sliderGrp';
F1DataVis.IdStore.sliderDash = 'sliderDashGrp';


F1DataVis.timeSlider = function ( parent, visualizer ) {
    var _height = 0,
        _width = 0,
        _yPos = 0,
        _xPos = 0,
        _parent = parent,
        _visualizer = visualizer,
        _marginProps = {left: 100, right: 100, top: 20, bottom: 20},
        self = this,
        _sliderGroup = null,
        _timeSlider = null,
        _dashBoard = null,
        _dashPath = [],

        // Year range
        _years = d3.range( 1996, 2017 ),

        _tweakSliderLook = function () {
            // Modify the slider styles.
            // Make tick lines invisible.
            _parent
                .selectAll( '.tick line' )
                .attr( 'opacity', 0 );

            // Change font of tick labels.
            _parent
                .selectAll( '.axis text' )
                .attr( 'font-size', 14 )
                .attr( 'font-family', 'bahnschrift' )
                .attr( 'fill', '#E70000' );

            // Change font of pointer label.
            _parent
                .selectAll( '.parameter-value text' )
                .attr( 'font-size', 22 )
                //.attr('font-style', 'italic')
                .attr( 'font-weight', 'bold' )
                .attr( 'font-family', 'bahnschrift' )
                .attr( 'y', -31 )
                .attr( 'fill', '#E70000' )
                .on( 'mousedown', function () {
                    this.setAttribute( 'cursor', 'grabbing' );
                } )
                .on( 'mouseup', function () {
                    this.setAttribute( 'cursor', 'grab' );
                } )
                .on( 'mouseout', function () {
                    this.setAttribute( 'cursor', 'grab' );
                } );

            // Change slider size.
            _parent
                .selectAll( '.track' )
                .attr( 'stroke-width', 14 )
                .attr( 'stroke', '#E70000' );
            _parent
                .selectAll( '.track-inset' )
                .attr( 'stroke-width', 7 )
                .attr( 'stroke', '#005AD4' );
            _parent
                .selectAll( '.handle' )
                .attr( 'cursor', 'grab' )
                .attr( 'stroke-width', 3 )
                .attr( 'fill', 'darkred' )
                .attr( 'stroke', 'red' )
                .attr( 'd', 'M-6.5,-6.5 v 15 l 6,7.5 l 6,-7.5 v -15 z' )
                .attr( 'tabindex', null ) // Remove tabindex to make it unselectable.
                .on( 'click', _visualizer.onSliderHandleClicked )
                .on( 'mousedown', function () {
                    this.setAttribute( 'cursor', 'grabbing' );
                } )
                .on( 'mouseup', function () {
                    this.setAttribute( 'cursor', 'grab' );
                } )
                .on( 'mouseout', function () {
                    this.setAttribute( 'cursor', 'grab' );
                } );
        },
        _getDashBoardPositions = function () {
            _dashPath.push( [-_visualizer.width / 2, _visualizer.height] );
            _dashPath.push( [-_visualizer.width / 2, self.yPosition + _marginProps.top / 2] );
            //Dummy points
            _dashPath.push( [-_visualizer.width / 2, self.yPosition + _marginProps.top / 2] );
            _dashPath.push( [-_visualizer.width / 2, self.yPosition + _marginProps.top / 2] );
            _dashPath.push( [_visualizer.width + 100, self.yPosition + _marginProps.top / 2] );
            _dashPath.push( [_visualizer.width + 100, self.yPosition + _marginProps.top / 2] );
            //
            _dashPath.push( [_visualizer.width + 100, self.yPosition + _marginProps.top / 2] );
            _dashPath.push( [_visualizer.width + 100, _visualizer.height] );
            return _dashPath;

        };




    this.yPosition = 0;
    this.xPosition = 0;


    this.drawDashBoard = function () {
        _sliderGroup = _parent
            .insert( 'g', ":first-child" )
            .attr( 'id', F1DataVis.IdStore.sliderDash );
        _dashBoard = _sliderGroup
            .append( 'path' )
            .attr( 'class', 'shadow' )
            .attr( 'fill', F1DataVis.IdStore.DashBoardGradURL )
            .attr( 'stroke', '#E70000' )
            .attr( 'd', d3.line()( _getDashBoardPositions() ) );
    }

    this.updateDashBoard = function ( bounds ) {
        var newDashPath;
        if ( bounds === undefined ) {
            newDashPath = _dashPath;
        }
        else {
            newDashPath = _dashPath.map( item => item.slice() );
            newDashPath[2][0] = bounds.topLeft.x - 30;
            newDashPath[3][0] = bounds.topLeft.x;
            newDashPath[3][1] = bounds.topLeft.y - 10;
            newDashPath[4][0] = bounds.topRight.x;
            newDashPath[4][1] = bounds.topRight.y - 10;
            newDashPath[5][0] = bounds.topRight.x + 30;
        }
        _dashBoard.transition()
            .duration( 1500 )
            .attr( 'd', d3.line()( newDashPath ) );
    }

    this.draw = function () {

        // Create group for slider and append to main svg
        _sliderGroup = _parent
            .append( 'g' )
            .attr( 'id', F1DataVis.IdStore.sliderParent );

        // Create slider.
        _timeSlider = d3
            .sliderBottom()
            .min( 1996 ) // Corrcet constructorStandings data doesn't exist for years < 1969 and 2018.
            .max( 2017 )
            .step( 1 )
            .width( _visualizer.width - _marginProps.left - _marginProps.right )
            .tickFormat( d3.format( '' ) )
            .tickValues( d3.range( 1996, 2018, 2 ) )//.concat( [2017] ) )
            .default( 2017 )
            .on( 'onchange', _visualizer.sliderMoved );

        // Append slider
        _sliderGroup.call( _timeSlider );

        _tweakSliderLook();

        _height = _sliderGroup._groups[0][0].getBBox().height;
        _width = _sliderGroup._groups[0][0].getBBox().width;
        this.yPosition = _visualizer.height - _height - _marginProps.bottom - _marginProps.top;

        _yPos = this.yPosition + _marginProps.top + _height / 2;
        _xPos = this.xPosition + _marginProps.left;
        _sliderGroup.attr( 'transform', 'translate(' + _xPos + ',' + _yPos + ')' );
        this.drawDashBoard();
    };

    this.update = function () {
        var width = _visualizer.width, value = _timeSlider.value();
        _timeSlider
            .width( width - _marginProps.left - _marginProps.right );
        _sliderGroup
            .attr( 'transform', 'translate(' + _xPos + ',' + _yPos + ')' );
    };

    this.getValue = function () {
        return _timeSlider.value();
    };
}