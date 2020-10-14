var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};
F1DataVis.IdStore.paracoordHolder = 'paracoordHolderGrp'

F1DataVis.paraCoorder = function ( svgParent, visualizer ) {
    var self = this,
        _svgParent = svgParent,
        _paracoordHolder,
        _visualizer = visualizer,
        _marginProps = { left: 150, top: 20, right: 100, bottom: 20 },
        _scales = new Map(),
        _getXPosition,
        _displayedYear,
        _transitionSpeed = 2000;

    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;
    this.seasonalGrp = {};

    this.initialize = function ( width, height ) {
        this.width = width;
        this.height = height;
        _paracoordHolder = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
        _paracoordHolder.setAttributeNS( null, 'id', F1DataVis.IdStore.paracoordHolder );
        _svgParent.appendChild( _paracoordHolder );
    };

    this.draw = function ( year ) {
        var races, numberOfRaces, teams, numberOfTeams, negator = 0, orderedTeams, verticalAxisRange, verticalAxisDomain;

        if ( _displayedYear ) {
            // translate this out
            if ( _displayedYear < year ) {
                negator = -1;
            } else {
                negator = 1;
            }
            this.seasonalGrp[_displayedYear]
                .transition()
                .duration( _transitionSpeed )
                .attr( 'transform', 'translate(' + ( this.width * 1.5 * negator ) + ',0)' );
        }

        _displayedYear = year; // set year to be displayed

        if ( this.seasonalGrp[year] ) {
            // translate this in if group already exists.
            this.seasonalGrp[year]
                .attr( 'transform', 'translate(' + ( this.width * 1.5 * -negator ) + ',0)' ) // Translate in the year from the correct side.
                .transition()
                .duration( _transitionSpeed )
                .attr( 'transform', 'translate(0,0)' );
        } else {
            // Create the group for the displayed year.
            races = F1DataVis.data.racesByYear[year];
            numberOfRaces = races.length;
            teams = F1DataVis.dataHandler.getTeamsInSeason( year );
            numberOfTeams = teams.length;

            // Sort teams alphabetically.
            orderedTeams = teams.map( teamId => F1DataVis.dataHandler.getTeamsByID( teamId ) )
                .sort( ( teamA, teamB ) => {
                    if ( teamA.name < teamB.name ) {
                        return -1;
                    } else if ( teamA.name > teamB.name ) {
                        return 1;
                    } else {
                        return 0;
                    }
                } );

            _getXPosition = d3.scalePoint( d3.range( 0, numberOfRaces + 1 ), [_marginProps.left, this.width - _marginProps.right] );

            verticalAxisRange = d3.range( _marginProps.top, self.height - _marginProps.bottom + 1, ( self.height - _marginProps.bottom - _marginProps.top ) / ( numberOfTeams - 1 ) );
            verticalAxisDomain = d3.range( 1, numberOfTeams + 1 );

            _scales.set(
                0,
                d3.scaleOrdinal()

                    .range( verticalAxisRange )
                    .domain( orderedTeams.map( team => team.name ) )
            );

            races.forEach( function ( race ) {
                _scales.set(
                    race.round,
                    d3.scaleOrdinal()
                        .range( verticalAxisRange )
                        .domain( verticalAxisDomain )


                );
            } );

            this.drawAxes( year, races, negator );
            this.drawPaths( races, orderedTeams );
        }
    };

    this.drawAxes = function ( year, races, negator ) {
        this.seasonalGrp[year] = d3.select( _paracoordHolder )
            .append( "g" )
            .attr( 'id', 'group_' + year );

        // Translate in the year from the correct side.
        this.seasonalGrp[year]
            .attr( 'transform', 'translate(' + ( this.width * 1.5 * -negator ) + ',0)' )
            .transition()
            .duration( _transitionSpeed )
            .attr( 'transform', 'translate(0,0)' );


        this.seasonalGrp[year]
            .selectAll( "g" )
            .data( [{ round: 0, name: '  Teams' }].concat( races ) )
            .join( "g" )
            .attr( 'id', race => 'Year_' + year + '_Round_' + race.round )
            .attr( "transform", race => `translate(${_getXPosition( race.round )},0)` )
            .each( function ( race, index ) {
                // Drawing lines for axes.
                if ( index === 0 ) {
                    d3.select( this ).call( d3.axisLeft( _scales.get( race.round ) ) );
                } else if ( index === races.length ) {
                    d3.select( this ).call( d3.axisRight( _scales.get( race.round ) ) );
                } else {
                    d3.select( this )
                        .append( "path" )
                        .attr( "d", d3.line()( [[0, _marginProps.top], [0, self.height - _marginProps.bottom]] ) )
                        .attr( "stroke", "#005AD4" );
                }

                var raceNameFormatted = race.name.split( ' ' );
                var textGroup = d3.select( this )
                    .append( "g" )
                    .attr( 'id', race => 'Year_' + year + '_Round_' + race.round + '_TextGroup' )
                for ( i = 0; i < raceNameFormatted.length; i++ ) {
                    textGroup.append( "text" )
                        .attr( "x", 0 )
                        .attr( "y", self.height - _marginProps.bottom + ( i * 10 ) + 15 )
                        .attr( 'font-family', 'bahnschrift' )
                        .attr( 'font-weight', 'bold' )
                        .attr( "fill", "#005AD4" )
                        .attr( 'font-size', 10 )
                        .attr( "text-anchor", "middle" )
                        .text( raceNameFormatted[i] )
                }
            } );

        //
    };


    this.getYCoordinate = function ( round, position ) {
        return _scales.get( round )( position );
    };

    this.drawPaths = function ( races, teams ) {

        const polylines = this.seasonalGrp[_displayedYear]
            .append( "g" )
            .attr( 'id', race => 'Year_' + _displayedYear + '_polylineGroup' )
            .selectAll( "path" )
            .data( teams )
            .join( "path" )
            .attr( 'id', team => 'Year_' + _displayedYear + '_polylineGroup_Team_' + team.constructorId )
            .attr( "stroke-width", 2 )
            .attr( "stroke", "Black" )
            .attr( "fill", "none" )
            //reate the polylines
            .attr( "d", team => d3.line()( d3.range( 0, races.length + 1 ).map( round => {
                var x = _getXPosition( round ), y, position;
                if ( round === 0 ) {
                    y = self.getYCoordinate( 0, team.name );
                }
                else {
                    position = F1DataVis.data.positionsByTeamByRound[_displayedYear][round][team.constructorId];
                    if ( position === undefined ) {
                        position = teams.length;
                    }
                    y = self.getYCoordinate( round, position );

                }
                return [x, y];
            } ) )

            )
    }

    this.update = function ( width, height ) {
        if ( this.width !== width || this.height !== height ) {
            this.width = width;
            this.height = height;
        }
    };
}