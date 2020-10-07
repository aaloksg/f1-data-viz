var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};

F1DataVis.IdStore.sliderParent = 'sliderGrp';

F1DataVis.timeSlider = function ( parent, visualizer, yPos ) {
    var _yPosition = yPos,
        _parent = parent,
        _visualizer = visualizer,
        _marginProps = { left: 100, right: 100, top: 20, bottom: 20 },

        _sliderGroup = null,
        _timeSlider = null,

        // Year range
        _years = d3.range( 1950, 2019 ),

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
                .attr( 'd', 'M-6.5,-6.5 v 15 l 6,7.5 l 6,-7.5 v -15 z' );

        };

    this.draw = function () {

        // Create group for slider and append to main svg
        _sliderGroup = d3.select( _parent )
            .append( 'g' )
            .attr( 'id', F1DataVis.IdStore.sliderParent )
            .attr( 'transform', 'translate(' + _marginProps.left + ',' + _yPosition + ')' );

        // Create slider.
        _timeSlider = d3
            .sliderBottom()
            .min( d3.min( _years ) )
            .max( d3.max( _years ) )
            .step( 1 )
            .width( _visualizer.width - _marginProps.left - _marginProps.right )
            .tickFormat( d3.format( '' ) )
            .tickValues( d3.range( 1950, 2019, 5 ).concat( [d3.max( _years )] ) )
            .default( d3.max( _years ) );

        // Append slider
        _sliderGroup.call( _timeSlider );

        _tweakSliderLook();
    };

    this.update = function () {
        var width = _visualizer.width, value = _timeSlider.value();
        _timeSlider
            .width( width - _marginProps.left - _marginProps.right );
        _sliderGroup
            .attr( 'transform', 'translate(' + _marginProps.left + ',' + _yPosition + ')' );
    };
}