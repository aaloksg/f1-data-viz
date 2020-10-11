var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};

F1DataVis.paraCoorder = function ( svgParent, visualizer ) {
    var self = this,
    _svgParent = svgParent,
        _visualizer = visualizer,
        _marginProps = { left: 150, top: 20, right: 100, bottom: 20 },
        _scales = new Map(),
        _getXPosition;

    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;

    this.initialize = function ( width, height ) {
        this.width = width;
        this.height = height;
    };

    this.draw = function ( year ) {
        var races = F1DataVis.data.racesByYear[year], numberOfRaces = races.length, teams = F1DataVis.dataHandler.getTeamsInSeason( year ), numberOfTeams = teams.length;

        _getXPosition = d3.scalePoint( d3.range( 1, numberOfRaces + 1 ), [_marginProps.left, this.width - _marginProps.right] );

        races.forEach( function ( race ) {
            _scales.set(
                    race.round,
                d3.scaleOrdinal()
                    .range( d3.range( _marginProps.top, self.height - _marginProps.bottom, ( self.height - _marginProps.bottom - _marginProps.top ) / numberOfTeams ) )
                    .domain( d3.range( 1, numberOfTeams + 1 ) )
                );
        } );
        this.drawAxes( year, races );
    };

    this.drawAxes = function ( year, races ) {
        var axes = d3.select(_svgParent)
            .append( "g" )
            .attr( 'id', 'group_' + year)
            .selectAll( "g" )
            .data( races )
            .join( "g" )
            .attr( "transform", race => `translate(${_getXPosition( race.round )},0)` )
            .each( function ( race ) {
                d3.select( this ).call( d3.axisRight( _scales.get( race.round ) ) );
                d3.select( this )
                    .append( "text" )
                    .attr( "x", 0 )
                    .attr( "y", self.height - _marginProps.bottom )
                    .attr( 'font-size', 10 )
                    .attr( "fill", "black" )
                    .attr( "text-anchor", "middle" )
                    .text( race.name );
            } );
    };

    this.getYCoordinate = function ( round, position ) {
        return _scales.get(round)( position );
    };


    this.update = function ( width, height ) {
        if ( this.width !== width || this.height !== height ) {
            this.width = width;
            this.height = height;
        }
    };
}