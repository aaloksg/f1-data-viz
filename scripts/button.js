var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};
F1DataVis.IdStore.buttonClass = 'button';
F1DataVis.IdStore.buttonHover = 'onHover';
F1DataVis.IdStore.buttonPressed = 'onPressed';

F1DataVis.button = function ( parent, x, y, size, id, isLeft, cbFunction ) {
    var _size = size,
        _xPos = x,
        _yPos = y,
        _id = id,
        _parent = parent,
        _buttonSVG,
        _rect,
        _transitionSpeed = 1500,
        _isLeft = isLeft,
        _callback = cbFunction,
        _init = function () {

        // Create group for slider and append to main svg
            _buttonSVG = _parent
                .append( 'g' )
                .attr( 'id', _id )
                .attr( 'class', F1DataVis.IdStore.buttonClass )
                .attr( 'transform', 'translate(' + _xPos + ',' + _yPos + ')' )
                .attr( 'cursor', 'pointer' )
                .on( 'click', _onClicked )
                .on( 'mouseover', function () {
                    this.classList.add( F1DataVis.IdStore.buttonHover );
                } )
                .on( 'mouseout', function () {
                    this.classList.remove( F1DataVis.IdStore.buttonHover );
                    this.classList.remove( F1DataVis.IdStore.buttonPressed );
                } )
                .on( 'mousedown', function () {
                    this.classList.add( F1DataVis.IdStore.buttonPressed );
                } )
                .on( 'mouseup', function () {
                    this.classList.remove( F1DataVis.IdStore.buttonPressed );
                } );
            _rect = _buttonSVG
                .append( 'rect' )
                .attr( 'x', 0 )
                .attr( 'y', 0 )
                .attr( 'width', _size )
                .attr( 'height', _size )
                .attr( 'rx', _size * 0.25 )
                .attr( 'ry', _size * 0.25 )
                .attr( 'stroke', '#005AD4' )
                .attr( 'stroke-width', 1 );
            _buttonSVG
                .append( 'path' )
                
                .attr( 'stroke', '#E70000' )
                .attr( 'stroke-width', 2 )
                .attr( 'fill', 'none' )
                .attr( 'd', d3.line()( _createPath() ) );
        },
        _createPath = function () {
            var path = [];
            if ( _isLeft ) {
                path.push( [_size * 0.75, _size * 0.25] );
                path.push( [_size * 0.25, _size * 0.5] );
                path.push( [_size * 0.75, _size * 0.75] );
            } else {
                path.push( [_size * 0.25, _size * 0.25] );
                path.push( [_size * 0.75, _size * 0.5] );
                path.push( [_size * 0.25, _size * 0.75] );
            }
            return path;
        },
        _onClicked = function () {
            _callback( _isLeft );
        };

    this.transitionX = function ( newX ) {
        _xPos = newX;
        _buttonSVG
            .transition()
            .duration( _transitionSpeed )
            .attr( 'transform', 'translate(' + _xPos + ',' + _yPos + ')' );
    };

    _init();
};