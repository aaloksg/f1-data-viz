var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};

F1DataVis.IdStore.sliderParent = 'sliderGrp';

F1DataVis.timeSlider = function ( parent, visualizer ) {
    var _height = 0,
        _yPos = 0,
        _xPos = 0,
        _parent = parent,
        _visualizer = visualizer,
        _marginProps = { left: 100, right: 100, top: 20, bottom: 20 },

        _sliderGroup = null,
        _timeSlider = null,

        // Year range
        _years = d3.range( 1996, 2017 ),

        _tweakSliderLook = function () {
            // Modify the slider styles.
            // Make tick lines invisible.
            d3.select( _parent )
                .selectAll( '.tick line' )
                .attr( 'opacity', 0 );

            // Change font of tick labels.
            d3.select( _parent )
                .selectAll( '.axis text' )
                .attr( 'font-size', 14 )
                .attr( 'font-family', 'bahnschrift' )
                .attr( 'fill', '#E70000' );

            // Change font of pointer label.
            d3.select( _parent )
                .selectAll( '.parameter-value text' )
                .attr( 'font-size', 20 )
                //.attr('font-style', 'italic')
                .attr( 'font-weight', 'bold' )
                .attr( 'font-family', 'bahnschrift' )
                .attr( 'y', -31 )
                .attr( 'fill', '#E70000' );

            // Change slider size.
            d3.select( _parent )
                .selectAll( '.track' )
                .attr( 'stroke-width', 14 )
                .attr( 'stroke', '#E70000' );
            d3.select( _parent )
                .selectAll( '.track-inset' )
                .attr( 'stroke-width', 7 )
                .attr( 'stroke', '#005AD4' );
            d3.select( _parent )
                .selectAll( '.handle' )
                .attr( 'stroke-width', 3 )
                .attr( 'fill', 'silver' )
                .attr( 'stroke', 'red' )
                .attr( 'd', 'M-6.5,-6.5 v 15 l 6,7.5 l 6,-7.5 v -15 z' )
                .attr( 'tabindex', null )
                .on( 'click', _visualizer.onSliderHandleClicked ); // Remove tabindex to make it unselectable.

        };

    this.yPosition = 0;
    this.xPosition = 0;

    this.draw = function () {

        // Create group for slider and append to main svg
        _sliderGroup = d3.select( _parent )
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
            .tickValues( d3.range( 1996, 2018, 5 ))//.concat( [2017] ) )
            .default( 2017 )
            .on( 'onchange', _visualizer.sliderMoved);

        // Append slider
        _sliderGroup.call( _timeSlider );

        _tweakSliderLook();

        _height = _sliderGroup._groups[0][0].getBBox().height;
        this.yPosition = _visualizer.height - _height - _marginProps.bottom - _marginProps.top;

        _yPos = this.yPosition + _marginProps.top + _height / 2;
        _xPos = this.xPosition + _marginProps.left;
        _sliderGroup.attr( 'transform', 'translate(' + _xPos + ',' + _yPos + ')' );

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