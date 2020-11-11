var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};
F1DataVis.IdStore.tooltipClass = 'Tooltip';

F1DataVis.tooltip = function ( parent, id, parentWidth, parentHeight ) {
    var _xPos = 0,
        _yPos = 0,
        _height = 100,
        _width = 100,
        _visible = false,
        _parentWidth = parentWidth,
        _parentHeight = parentHeight,
        _id = id,
        _parent = parent,
        _tooltipSvg,
        _tooltipRect,
        _transitionSpeed = 300,
        _textMargins = { left: 5, right: 5, top: 5, bottom: 5, gap: 10 },
        _texts = ['Driver name', 'Team name', 'Status'],
        _fontProps = {
            size: '10px', color: '#dfdfdf', font: 'Bahnschrift', textAnchor: "middle"
        },
        _textElements = [],
        _init = function () {
            var length = _texts.length, i;
            // Create group for slider and append to main svg
            _tooltipSvg = _parent
                .append( 'g' )
                .attr( 'id', _id )
                .attr( 'class', F1DataVis.IdStore.tooltipClass )
                .attr( 'transform', 'translate(' + _xPos + ',' + _yPos + ')' );
            _tooltipRect = _tooltipSvg
                .append( 'rect' )
                .attr( 'x', 0 )
                .attr( 'y', 0 )
                .attr( 'width', _width )
                .attr( 'height', _height )
                .attr( 'fill', F1DataVis.IdStore.TooltipGradURL )
                .attr( 'rx', 4 )
                .attr( 'ry', 4 )
                .attr( 'stroke', '#005AD4' )
                .attr( 'stroke-width', 2 );

            for ( i = 0; i < length; i++ ) {
                _textElements.push( _tooltipSvg
                    .append( 'text' )
                    .attr( 'font-size', _fontProps.size )
                    .attr( 'font-family', _fontProps.font )
                    .attr( 'fill', _fontProps.color )
                    .attr( 'text-anchor', _fontProps.textAnchor )
                    .attr( 'x', 50 )
                    .attr( 'y', _textMargins.gap + 20 * i )
                    .text( _texts[i] ) );
            }
            _tooltipSvg.attr( 'visibility', 'hidden' );
        };

    this.show = function ( newX, newY, texts ) {
        var length = texts.length, i, width, bBox;
        if ( _visible === false ) {
            _width = 0;
            _height = _textMargins.top;
            _visible = true;
            for ( i = 0; i < length; i++ ) {
                _texts[i] = texts[i];
                _textElements[i].text( _texts[i] );
                _textElements[i]
                    .attr( 'font-size', _fontProps.size )

                bBox = _textElements[i]._groups[0][0].getBBox();
                _height += bBox.height;

                _textElements[i]
                    .attr( 'y', _height );

                _height += _textMargins.gap;
                width = bBox.width;
                if ( width > _width ) {
                    _width = width;
                }
            }

            _height += -_textMargins.gap + _textMargins.bottom;
            _width += _textMargins.left + _textMargins.right;

            _tooltipRect
                .attr( 'height', 0 )
                .attr( 'width', 0 )
                .transition()
                .duration( _transitionSpeed )
                .attr( 'height', _height )
                .attr( 'width', _width );

            for ( i = 0; i < length; i++ ) {
                _textElements[i]
                    .attr( 'x', _width / 2 )
                    .attr( 'font-size', '0px' )
                    .transition()
                    .duration( _transitionSpeed )
                    .attr( 'font-size', _fontProps.size );
            }
        }
        if ( newX + _width > _parentWidth ) {
            _xPos = newX - _width - 10;
        } else {
            _xPos = newX;
        }
        if ( newY + _height > _parentHeight ) {
            _yPos = newY - _height - 10;
        } else {
            _yPos = newY;
        }
        _tooltipSvg
            .attr( 'transform', 'translate(' + _xPos + ',' + _yPos + ')' )
            .attr( 'visibility', 'visible' );
    };

    this.hide = function () {
        var length, i;

        if ( _visible === true ) {
            _visible = false;
            length = _textElements.length;
            for ( i = 0; i < length; i++ ) {
                _textElements[i]
                    .transition()
                    .duration( _transitionSpeed )
                    .attr( 'font-size', '0px' );
            }
            _tooltipRect
                .attr( 'height', _height )
                .attr( 'width', _width )
                .transition()
                .duration( _transitionSpeed )
                .attr( 'height', 0 )
                .attr( 'width', 0 )
                .on( 'end', function () {
                    _tooltipSvg
                        .attr( 'visibility', 'hidden' );
                } );
        }        
    }
    _init();
};