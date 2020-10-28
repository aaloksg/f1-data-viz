var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};
F1DataVis.Texts = F1DataVis.Texts || {};
F1DataVis.IdStore.paracoordHolder = 'paracoordHolderGrp'
F1DataVis.IdStore.paracoordParentGrp = 'paracoordParentGrp';
F1DataVis.IdStore.paracoordClipper = 'paracoordClipper';
F1DataVis.IdStore.highlightedElementClass = 'highlighted';
F1DataVis.IdStore.highlightableElementClass = 'highlightableElement';
F1DataVis.IdStore.dehighlightedGroupClass = 'deHilightedGroup';
F1DataVis.IdStore.highlightablePathClass = 'highlightablePath';
F1DataVis.Texts.ApologyMessage1 = 'We are sorry! The data for the';
F1DataVis.Texts.ApologyMessage2 = 'does not exist.';
F1DataVis.Texts.tooltip = 'F1DataVisTooltip';

F1DataVis.paraCoorder = function ( svgParent, visualizer ) {
    var self = this,
        _svgParent = svgParent,
        _paracoordParentGrp,
        _paracoordHolder,
        _visualizer = visualizer,
        _marginProps = { left: 120, top: 20, right: 100, bottom: 50 },
        _clippingProps = { left: 10, top: 5, right: 10, bottom: -10 },
        _displayedYear,
        _displayingYear = true,
        _displayedRaceId,
        _displayedRaceIndex = 0,
        _transitionSpeed = 2000,
        _midAxisColor = "#005AD4",
        _midAxisShadowColor = _midAxisColor,
        _midAxisWidth = 2,
        _midAxisOpacity = 0.25,
        _midAxisShadowWidth = 15,
        _midAxisShadowOpacity = 0,
        _pathWidth = 5,
        _pathShadowWidth = 10,
        _buttonSize = 25,
        _buttonToTextGap = 10,
        _clipRect,
        _leftButton,
        _rightButton,
        _leftButtonRestPos,
        _rightButtonRestPos,
        _buttonYPos,
        _apologyMessage = [F1DataVis.Texts.ApologyMessage1, '', F1DataVis.Texts.ApologyMessage2],
        _initializeClipping = function () {
            _clipRect = _paracoordParentGrp
                .append( 'clipPath' )
                .attr( 'id', F1DataVis.IdStore.paracoordClipper )
                .append( 'rect' );
            _clipRect
                .attr( 'x', _clippingProps.left )
                .attr( 'y', _clippingProps.top )
                .attr( 'height', self.height - _clippingProps.top - _clippingProps.bottom )
                .attr( 'width', self.width - _clippingProps.left - _clippingProps.right );
            _paracoordHolder
                .attr( 'clip-path', 'url(#' + F1DataVis.IdStore.paracoordClipper + ')' );
        },
        _translateSeasonOut = function ( negator ) {
            self.seasonalGrp[_displayedYear]
                .attr( 'transform', 'translate(0,0)' )
                .transition()
                .duration( _transitionSpeed )
                .attr( 'transform', 'translate(' + ( self.width * 1.5 * negator ) + ',0)' );
        },
        _translateSeasonIn = function ( negator ) {
            self.seasonalGrp[_displayedYear]
                .attr( 'transform', 'translate(' + ( self.width * 1.5 * -negator ) + ',0)' ) // Translate in the year from the correct side.
                .transition()
                .duration( negator === 0 ? 0 : _transitionSpeed ) // Negator is 0 during the first load.
                .attr( 'transform', 'translate(0,0)' )
                .on( 'end', _animateSeasonPaths );
        },
        _getDriverName = function ( driver ) {
            return driver.forename + ' .' + driver.surname[0];
        },
        _animateSeasonPaths = function () {
            if ( self.drawnSeasonPaths[_displayedYear] === undefined ) {
                // Do animation
                self.drawSeasonPaths();
                self.drawnSeasonPaths[_displayedYear] = true;
            }
        },
        _animateRacePaths = function () {
            // Do animation
            self.drawRacePaths();
            self.racialParams[_displayedRaceId].pathsDrawn = true;
        },
        _resetRacePaths = function () {
            if ( self.racialParams[_displayedRaceId] && self.racialParams[_displayedRaceId].paths ) {
                var length = self.racialParams[_displayedRaceId].paths.length, i, path, pathLength;
                for ( i = 0; i < length; i++ ) {
                    path = self.racialParams[_displayedRaceId].paths[i];
                    pathLength = path.node().getTotalLength();
                    path
                        .attr( 'stroke-dasharray', pathLength )
                        .attr( 'stroke-dashoffset', pathLength );
                }
            }
        },
        _onRaceChanged = function ( moveToPrev ) {
            var negator = 0, race;
            if ( moveToPrev ) {
                negator = 1;
                if ( _displayedRaceIndex === 0 ) {
                    return;
                }
                _displayedRaceIndex--;
            } else {
                negator = -1;
                if ( _displayedRaceIndex === self.seasonalParams[_displayedYear].races.length - 1 ) {
                    return;
                }
                _displayedRaceIndex++;
            }
            race = self.seasonalParams[_displayedYear].races[_displayedRaceIndex];
            self.drawRace( race, negator )
        },
        _moveTooltip = function ( event ) {
            var splittedId = event.currentTarget.id.split( '_' ), driverId = parseInt( splittedId.pop(), 10 ),
                tooltipData = F1DataVis.dataHandler.getTooltipData( _displayedRaceId, driverId );
            self.tooltip.show( event.clientX, event.clientY, tooltipData );
        };

    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;
    this.seasonalGrp = {};
    this.seasonalParams = {};

    this.raceGrp = {};
    this.racialParams = {};

    this.drawnSeasonPaths = {};

    this.initialize = function ( width, height ) {
        this.width = width;
        this.height = height;
        _paracoordParentGrp = _svgParent
            .append( 'g' )
            .attr( 'id', F1DataVis.IdStore.paracoordParentGrp );
        _paracoordHolder = _paracoordParentGrp
            .append( 'g' )
            .attr( 'id', F1DataVis.IdStore.paracoordHolder );
        _initializeClipping();

        _buttonYPos = this.height - _buttonSize * 0.8;
        _leftButtonRestPos = -2 * this.width;
        _leftButton = new F1DataVis.button( _svgParent, _leftButtonRestPos, _buttonYPos, _buttonSize, '_LeftRaceButton', true, _onRaceChanged );
        _rightButtonRestPos = 2 * this.width;
        _rightButton = new F1DataVis.button( _svgParent, _rightButtonRestPos, _buttonYPos, _buttonSize, '_RightRaceButton', false, _onRaceChanged );

        this.tooltip = new F1DataVis.tooltip( _paracoordParentGrp, F1DataVis.IdStore.tooltip, this.width - _marginProps.right, this.height - _marginProps.bottom );
    };

    this.drawSeason = function ( year ) {
        var races, numberOfRaces, teams, numberOfTeams, negator = 0, orderedTeams, verticalAxisRange, verticalAxisDomain,
            raceScales = new Map(),
            getXPositionOfRace;

        if ( _displayingYear === false ) {
            // Translate out the race.
            this.raceGrp[_displayedRaceId]
                .attr( 'transform', 'translate(0,0)' )
                .transition()
                .duration( _transitionSpeed / 2 )
                .attr( 'transform', 'translate(0,' + ( this.height * -1.5 ) + ')' );
            _leftButton.transitionX( _leftButtonRestPos );
            _rightButton.transitionX( _rightButtonRestPos );
            _visualizer.updateDashBoard( );

            _displayingYear = true;

            // Translate in the season.
            this.seasonalGrp[_displayedYear]
                .attr( 'transform', 'translate(0,' + ( this.height * 1.5 ) + ')' )
                .transition()
                .duration( _transitionSpeed / 2 )
                .attr( 'transform', 'translate(0,0)' )
                .on( 'end', function () {
                    this.drawSeason( year );
                }.bind( this ) );
            return;
        }

        _displayingYear = true;

        if ( _displayedYear ) {
            // translate this out
            if ( _displayedYear < year ) {
                negator = -1;
            } else {
                negator = 1;
            }
            _translateSeasonOut( negator );
        }

        _displayedYear = year; // set year to be displayed

        if ( this.seasonalGrp[_displayedYear] ) {
            // translate this in if group already exists.
            _translateSeasonIn( negator );
        } else {
            // Create the group for the displayed year.
            races = F1DataVis.data.racesByYear[_displayedYear];
            numberOfRaces = races.length;
            teams = F1DataVis.dataHandler.getTeamsInSeason( _displayedYear );
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

            getXPositionOfRace = d3.scalePoint( d3.range( 0, numberOfRaces + 1 ), [_marginProps.left, this.width - _marginProps.right] );

            verticalAxisRange = d3.range( _marginProps.top, self.height - _marginProps.bottom + 1, ( self.height - _marginProps.bottom - _marginProps.top ) / ( numberOfTeams - 1 ) );
            verticalAxisDomain = d3.range( 1, numberOfTeams + 1 );

            raceScales.set(
                0,
                d3.scaleOrdinal()
                    .range( verticalAxisRange )
                    .domain( orderedTeams.map( team => team.name ) )
            );

            races.forEach( function ( race ) {
                raceScales.set(
                    race.round,
                    d3.scaleOrdinal()
                        .range( verticalAxisRange )
                        .domain( verticalAxisDomain )


                );
            } );

            this.seasonalGrp[_displayedYear] = _paracoordHolder
                .append( "g" )
                .attr( 'id', 'group_year_' + _displayedYear );

            this.seasonalParams[_displayedYear] = { races: races, orderedTeams: orderedTeams, raceScales: raceScales, getXPositionOfRace: getXPositionOfRace };

            this.drawSeasonAxes( races, negator );
            // this.drawSeasonPaths( races, orderedTeams );
        }
    };

    this.drawSeasonAxes = function ( races, negator ) {
        var getXPositionOfRace = this.seasonalParams[_displayedYear].getXPositionOfRace,
            raceScales = this.seasonalParams[_displayedYear].raceScales;
        // Translate in the year from the correct side.
        _translateSeasonIn( negator );


        this.seasonalGrp[_displayedYear]
            .selectAll( "g" )
            .data( [{ round: 0, name: '  RACES>>>' }].concat( races ) )
            .join( "g" )
            .attr( 'id', race => 'Year_' + _displayedYear + '_Round_' + race.round )
            .attr( "transform", race => `translate(${getXPositionOfRace( race.round )},0)` )
            .attr( 'cursor', race => race.round === 0 ? 'auto' : 'pointer' )
            .on( 'click', this.onRaceClicked )
            .on( 'mouseover', function () {
                if ( _displayingYear === true ) {
                    this.classList.add( F1DataVis.IdStore.highlightedElementClass );
                }
            } )
            .on( 'mouseout', function () {
                this.classList.remove( F1DataVis.IdStore.highlightedElementClass );
            } )
            .each( function ( race, index ) {
                // Drawing lines for axes.
                if ( index === 0 ) {
                    d3.select( this ).attr( "class", "axisLabels" ).call( d3.axisLeft( raceScales.get( race.round ) ) );
                } else {
                    if ( index === races.length ) {
                        d3.select( this ).attr( "class", "rightAxisLabels" ).call( d3.axisRight( raceScales.get( race.round ) ) );
                    } else {
                        d3.select( this )
                            .append( "path" )
                            .attr( "d", d3.line()( [[0, _marginProps.top], [0, self.height - _marginProps.bottom]] ) )
                            .attr( "stroke-width", _midAxisWidth )
                            .attr( "stroke", _midAxisColor )
                            .attr( "stroke-opacity", _midAxisOpacity );
                    }
                    d3.select( this )
                        .append( "path" )
                        .attr( "d", d3.line()( [[0, _marginProps.top], [0, self.height - _marginProps.bottom]] ) )
                        .attr( 'class', F1DataVis.IdStore.highlightableElementClass )
                        .attr( "stroke-width", _midAxisShadowWidth )
                        .attr( "stroke", _midAxisShadowColor )
                        .attr( "stroke-opacity", _midAxisShadowOpacity );
                }

                var raceNameFormatted = race.name.split( ' ' );
                var textGroup = d3.select( this )
                    .append( "g" )
                    .attr( 'id', race => 'Year_' + _displayedYear + '_Round_' + race.round + '_TextGroup' );
                    
                if ( index === 0 ) {
                    textGroup
                        .attr( "class", "axisXLabels first" );
                }
                else  {  textGroup.attr( "class", "axisXLabels highlightableText" );
            }

                for ( i = 0; i < raceNameFormatted.length; i++ ) {
                    textGroup.append( "text" )
                        .attr( "x", 0 )
                        .attr( "y", self.height - _marginProps.bottom + ( i * 10 ) + 20 )
                        .attr( "text-anchor", "middle" )
                        .text( raceNameFormatted[i] );
                }
            } );

        //
    };

    this.drawRace = function ( race, negator ) {
        var laps, lapRange, lap, numberOfLaps = 0, drivers = {}, numberOfDrivers = 0, driverObjects = [], driverId, orderedDrivers, verticalAxisRange, verticalAxisDomain, i, length, racialParams, group, driverIds = [],
            lapScales = new Map(),
            translateFromAttr, translateToAttr,
            getXPositionOfLap;
        if ( negator === 0 ) {
            translateFromAttr = 'translate(0,' + ( this.height * -1.5 ) + ')';
            translateToAttr = 'translate(0,0)';
        } else {
            // Translate out the current displayed race.
            this.raceGrp[_displayedRaceId]
                .attr( 'transform', 'translate(0,0)' )
                .transition()
                .duration( _transitionSpeed )
                .attr( 'transform', 'translate(' + ( this.width * 1.5 * negator ) + ',0)' );
            translateFromAttr = 'translate(' + ( this.width * 1.5 * -negator ) + ',0)';
            translateToAttr = 'translate(0,0)';
        }
        _displayingYear = false;
        _displayedRaceId = race.raceId;




        if ( this.raceGrp[_displayedRaceId] ) {
            // Translate in the race if group already exists.
            racialParams = this.racialParams[_displayedRaceId];
            this.raceGrp[_displayedRaceId]
                .attr( 'transform', translateFromAttr )
                .transition()
                .duration( _transitionSpeed )
                .attr( 'transform', translateToAttr )
                .on( 'end', function () {
                    if ( racialParams.pathsDrawn === false ) {
                        _animateRacePaths();
                    }
                });
            // Reset the race paths.
            //_resetRacePaths();

        } else {
            // Create the group for the displayed year.

            this.raceGrp[_displayedRaceId] = _paracoordHolder
                .append( "g" )
                .attr( 'id', 'group_race_' + _displayedRaceId );

            laps = F1DataVis.dataHandler.getLapsByRaceId( race.raceId );
            length = laps.length;
            for ( var i = 0; i < length; i++ ) {
                lap = laps[i];
                driverId = lap.driverId;
                if ( drivers[driverId] === undefined ) {
                    drivers[driverId] = [];
                    numberOfDrivers++;
                }
                drivers[driverId].push( lap );
                if ( lap.lap > numberOfLaps ) {
                    numberOfLaps = lap.lap;
                }
            }
            for ( driverId in drivers ) {
                //driverObjects.push( F1DataVis.dataHandler.getDriversByID( parseInt( driverId, 10 ) ) );
                drivers[driverId].sort( ( lapA, lapB ) => {
                    if ( lapA.lap < lapB.lap ) {
                        return -1;
                    } else {
                        return 1;
                    }
                } )
            }
            driverObjects = F1DataVis.dataHandler.getDriverObjByPolePositions( _displayedRaceId ); 

            this.racialParams[_displayedRaceId] = racialParams = {
                drivers: [], driverObjects: [], numberOfLaps: 0, lapScales: [], getXPositionOfLap: undefined, paths: [], leftButtonPos: _leftButtonRestPos, rightButtonPos: _rightButtonRestPos, dashBoardBound: {}, pathsDrawn: false
            };
            if ( driverObjects === undefined ) {
                this.raceGrp[_displayedRaceId]
                    .attr( 'transform', translateFromAttr )
                    .transition()
                    .duration( _transitionSpeed )
                    .attr( 'transform', translateToAttr );
                this.racialParams[_displayedRaceId].pathsDrawn = true;
                //Append sad boy.
                this.raceGrp[_displayedRaceId]
                    .append( 'image' )
                    .attr( 'x', this.width / 2 - 125 )
                    .attr( 'y', 20 )
                    .attr( 'height', 200 )
                    .attr( 'width', 200 )
                    .attr( 'href', './images/sadBoy.png' );

                // Create apology message.
                length = _apologyMessage.length;
                _apologyMessage[1] = race.name;
                group = this.raceGrp[_displayedRaceId]
                    .append( 'g' )
                    .attr( 'id', 'ApologyTextGroup_' + _displayedRaceId )
                    .attr( 'class', 'apologyText' );
                for ( i = 0; i < length; i++ ) {
                    group
                        .append( 'text' )
                        .attr( 'x', this.width / 2 )
                        .attr( 'y', 260 + ( i * 40 ))
                        .attr( 'fill', '#dfdfdf' )
                        .attr( "text-anchor", "middle" )
                        .text( _apologyMessage[i]);
                }                        
            } else {
                length = driverObjects.length;
                for ( i = 0; i < length; i++ ) {
                    if ( drivers[driverObjects[i].driverId] === undefined ) {
                        driverObjects.splice( i, 1 );
                        i--;
                        length--;
                    } else {
                        driverIds.push( driverObjects[i].driverId );
                    }
                }
                if ( numberOfDrivers > driverObjects.length ) {
                    for ( driverId in drivers ) {
                        if ( driverIds.indexOf( parseInt( driverId, 10 ) ) === -1 ) {
                            driverObjects.push( F1DataVis.dataHandler.getDriversByID( parseInt( driverId, 10 ) ) );
                        }
                    }
                }
                lapRange = d3.range( 0, numberOfLaps + 1 );
                getXPositionOfLap = d3.scalePoint( lapRange, [_marginProps.left, this.width - _marginProps.right] );

                verticalAxisRange = d3.range( _marginProps.top, self.height - _marginProps.bottom + 1, ( self.height - _marginProps.bottom - _marginProps.top ) / ( numberOfDrivers - 1 ) );
                verticalAxisDomain = d3.range( 1, numberOfDrivers + 1 );


                lapRange.forEach( function ( lapNumber ) {
                    if ( lapNumber === 0 ) {
                        lapScales.set(
                            lapNumber,
                            d3.scaleOrdinal()
                                .range( verticalAxisRange )
                                .domain( driverObjects.map( driver => _getDriverName( driver ) ) )
                        );
                    } else {
                        lapScales.set(
                            lapNumber,
                            d3.scaleOrdinal()
                                .range( verticalAxisRange )
                                .domain( verticalAxisDomain )
                        );
                    }
                } );
                racialParams.drivers = drivers;
                racialParams.driverObjects = driverObjects;
                racialParams.numberOfLaps = numberOfLaps;
                racialParams.lapScales = lapScales;
                racialParams.getXPositionOfLap = getXPositionOfLap;

                this.drawRaceAxes( translateFromAttr, translateToAttr );
                //this.drawRacePaths( drivers, driverObjects, numberOfLaps );
            }
            var raceNametext = this.raceGrp[_displayedRaceId].append( "g" )
                .attr( "id", 'raceNameGrp' )
                .append( "text" )
                .attr( "x", self.width / 2 )
                .attr( "y", self.height )
                .attr( 'class', 'raceNameText' )
                .attr( 'fill', '#dfdfdf' )
                .attr( "text-anchor", "middle" )
                .text( race.name ),
                textBBox = raceNametext._groups[0][0].getBBox();
            racialParams.leftButtonPos = self.width / 2 - textBBox.width / 2 - _buttonSize - _buttonToTextGap;
            racialParams.rightButtonPos = self.width / 2 + textBBox.width / 2 + _buttonToTextGap;
            racialParams.dashBoardBound.topLeft = {
                x: racialParams.leftButtonPos, y: _buttonYPos
            };
            racialParams.dashBoardBound.topRight = {
                x: racialParams.rightButtonPos + _buttonSize, y: _buttonYPos
            };
            //raceNametext.attr( 'font-size', '30px' )
            //    .transition()
            //    .duration( 4000 )
            //    .attr( 'font-size', '0px' )
            //    .on( 'end', function () {
            //        raceNametext
            //            .text( race.name )
            //            .attr( 'font-size', '0px' )
            //            .transition()
            //            .duration( 1500 )
            //            .attr( 'font-size', '30px' );
            //    } );
        }
        if ( _displayedRaceIndex === 0 ) {
            _leftButton.transitionX( _leftButtonRestPos );
        } else {
            _leftButton.transitionX( racialParams.leftButtonPos );
        }
        if ( _displayedRaceIndex === this.seasonalParams[_displayedYear].races.length - 1 ) {
            _rightButton.transitionX( _rightButtonRestPos );
        } else {
            _rightButton.transitionX( racialParams.rightButtonPos );
        }
        _visualizer.updateDashBoard( racialParams.dashBoardBound );
    };

    this.drawRaceAxes = function ( translateFromAttr, translateToAttr ) {
        var lapScales = this.racialParams[_displayedRaceId].lapScales,
            numberOfLaps = this.racialParams[_displayedRaceId].numberOfLaps,
            getXPositionOfLap = this.racialParams[_displayedRaceId].getXPositionOfLap,
            data = [{ text: ' LAPS>>>', lap: 0 }].concat( d3.range( 1, numberOfLaps + 1 ).map( ( val ) => {
                return { lap: val, text: val.toString() };
            } ) );

        // Translate in the race.
        this.raceGrp[_displayedRaceId]
            .attr( 'transform', translateFromAttr )
            .transition()
            .duration( _transitionSpeed )
            .attr( 'transform', translateToAttr )
            .on( 'end', _animateRacePaths );

        this.raceGrp[_displayedRaceId]
            .selectAll( "g" )
            .data( data )
            .join( "g" )
            .attr( 'id', text => 'Race' + _displayedRaceId + '_Lap_' + text.lap )
            .attr( "transform", text => `translate(${getXPositionOfLap( text.lap )},0)` )
            .each( function ( text, index ) {
                // Drawing lines for axes.
                if ( index === 0 ) {
                    d3.select( this ).attr( "class", "axisLabels" ).call( d3.axisLeft( lapScales.get( text.lap ) ) );
                } else {
                    if ( index === numberOfLaps ) {
                        d3.select( this ).attr( "class", "rightAxisLabels" ).call( d3.axisRight( lapScales.get( text.lap ) ) );
                    } else {
                        d3.select( this )
                            .append( "path" )
                            .attr( "d", d3.line()( [[0, _marginProps.top], [0, self.height - _marginProps.bottom]] ) )
                            .attr( "stroke", _midAxisColor )
                            .attr( "stroke-width", _midAxisWidth )
                            .attr( "stroke-opacity", _midAxisOpacity );
                    }
                    d3.select( this )
                        .append( "path" )
                        .attr( "d", d3.line()( [[0, _marginProps.top], [0, self.height - _marginProps.bottom]] ) )
                        .attr( "stroke-width", _midAxisShadowWidth )
                        .attr( "stroke", _midAxisShadowColor )
                        .attr( "stroke-opacity", _midAxisShadowOpacity );
                }
                var raceNameFormatted = text.text.split( ' ' ), i,
                    textGroup = d3.select( this )
                        .append( "g" )
                        .attr( 'id', race => 'Race' + _displayedRaceId + '_Lap_' + text.lap + '_TextGroup' )
                        .attr( "class", "axisXLabels" );
                if ( index === 0 ) {
                    textGroup
                        .attr( "class", "axisXLabels first" );
                }
                for ( i = 0; i < raceNameFormatted.length; i++ ) {
                    textGroup.append( "text" )
                        .attr( "x", 0 )
                        .attr( "y", self.height - _marginProps.bottom + ( i * 10 ) + 15 )
                        .attr( "text-anchor", "middle" )
                        .text( raceNameFormatted[i] );
                }
            } );
    };

    this.getYCoordinate = function ( round, position ) {
        return this.seasonalParams[_displayedYear].raceScales.get( round )( position );
    };

    this.getYCoordinateOfDriver = function ( lap, position ) {
        return this.racialParams[_displayedRaceId].lapScales.get( lap )( position );
    };

    this.drawSeasonPaths = function () {
        var races = this.seasonalParams[_displayedYear].races,
            teams = this.seasonalParams[_displayedYear].orderedTeams,
            getXPositionOfRace = this.seasonalParams[_displayedYear].getXPositionOfRace,
            getColour = d3.scaleOrdinal( d3.schemeCategory10.concat( d3.schemeCategory10 ) ).domain( teams.map( team => team.constructorId ) ), polylines = this.seasonalGrp[_displayedYear]
                .append( "g" )
                .attr( 'id', race => 'Year_' + _displayedYear + '_polylineGroup' )
                .selectAll( "path" )
                .data( teams )
                .join( "g" )
                .attr( 'id', team => 'Year_' + _displayedYear + '_polylineGroup_Team_' + team.constructorId )
                .on( 'mouseover', function () {
                    this.parentElement.classList.add( F1DataVis.IdStore.dehighlightedGroupClass );
                    this.classList.add( F1DataVis.IdStore.highlightablePathClass );
                } )
                .on( 'mouseout', function () {
                    this.parentElement.classList.remove( F1DataVis.IdStore.dehighlightedGroupClass );
                    this.classList.remove( F1DataVis.IdStore.highlightablePathClass );
                } )
                .each( function ( team ) {
                    var points = d3.range( 0, races.length + 1 ).map( round => {
                        var x = getXPositionOfRace( round ), y, position;
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
                    } ),
                        path = d3.select( this )
                            .append( 'path' )
                            .attr( 'id', team => 'Year_' + _displayedYear + '_polylineGroup_Team_' + team.constructorId + '_path' )
                            .attr( "stroke-width", _pathWidth )
                            .attr( "stroke", team => getColour( team.constructorId ) )
                            .attr( "fill", "none" )
                            // create the polylines
                            .attr( "d", team => d3.line()( points ) ),
                        pathLength = path.node().getTotalLength();
                    d3.select( this )
                        .append( 'path' )
                        .attr( 'id', team => 'Year_' + _displayedYear + '_polylineGroup_Team_' + team.constructorId + '_path_shadow' )
                        .attr( "stroke-width", _pathShadowWidth )
                        .attr( "stroke", team => getColour( team.constructorId ) )
                        .attr( "stroke-opacity", 0 )
                        .attr( "fill", "none" )
                        // create the polylines
                        .attr( "d", team => d3.line()( points ) );
                    path
                        .attr( 'stroke-dasharray', pathLength )
                        .attr( 'stroke-dashoffset', pathLength )
                        .transition()
                        .duration( _transitionSpeed )
                        .attr( 'stroke-dashoffset', 0 );
                } );
    };

    this.drawRacePaths = function () {
        var drivers,
            driverObjects,
            numberOfLaps,
            getXPositionOfLap,
            getColour,
            path, length, i, pathLength;
        if ( self.racialParams[_displayedRaceId] && this.racialParams[_displayedRaceId].paths.length === 0 ) {
            drivers = this.racialParams[_displayedRaceId].drivers;
            driverObjects = this.racialParams[_displayedRaceId].driverObjects;
            numberOfLaps = this.racialParams[_displayedRaceId].numberOfLaps;
            getXPositionOfLap = this.racialParams[_displayedRaceId].getXPositionOfLap;
            getColour = d3.scaleOrdinal( d3.schemeCategory10.concat( d3.schemeCategory10 ) ).domain( driverObjects.map( driver => driver.driverId ) );
            this.raceGrp[_displayedRaceId]
                .append( "g" )
                .attr( 'id', 'group_race_' + _displayedRaceId )
                .selectAll( "path" )
                .data( driverObjects )
                .join( "g" )
                .attr( 'id', driver => 'Year_' + _displayedYear + '_race_' + _displayedRaceId + '_group' + '_driver_' + driver.driverId )
                .on( 'mouseover', function () {
                    this.parentElement.classList.add( F1DataVis.IdStore.dehighlightedGroupClass );
                    this.classList.add( F1DataVis.IdStore.highlightablePathClass );
                } )
                .on( 'mousemove', function (event) {
                    // Add tooltip
                    _moveTooltip( event );
                } )
                .on( 'mouseout', function () {
                    this.parentElement.classList.remove( F1DataVis.IdStore.dehighlightedGroupClass );
                    this.classList.remove( F1DataVis.IdStore.highlightablePathClass );
                    self.tooltip.hide();
                } )
                .each( function ( driver ) {
                    var points = d3.range( 0, numberOfLaps + 1 ).map( lap => {
                        var x = getXPositionOfLap( lap ), y, position, statusId;

                        if ( lap === 0 ) {
                            y = self.getYCoordinateOfDriver( 0, _getDriverName( driver ) );
                        }
                        else {
                            if ( drivers[driver.driverId][lap - 1] === undefined ) {
                                if ( drivers[driver.driverId][lap - 2] === undefined || (( statusId = F1DataVis.dataHandler.getResultDetails( _displayedRaceId, driver.driverId ).statusId ) > 10 && statusId < 20 ) ) {
                                    return null;
                                }
                                y = self.getYCoordinateOfDriver( lap, driverObjects.length );
                            }
                            else {
                                position = drivers[driver.driverId][lap - 1].position;
                                y = self.getYCoordinateOfDriver( lap, position );
                            }
                        }
                        return [x, y];
                    } ), nullIndex;
                    while ( ( index = points.indexOf( null ) ) > -1 ) {
                        points.splice( index, 1 );
                    }
                    path = d3.select( this )
                        .append( 'path' )
                        .attr( 'id', driver => 'Year_' + _displayedYear + '_race_' + _displayedRaceId + '_driver_' + driver.driverId + '_path' )
                        .attr( "stroke-width", _pathWidth )
                        .attr( "stroke", driver => getColour( driver.driverId ) )
                        .attr( "fill", "none" )
                        // create the polylines
                        .attr( "d", driver => d3.line()( points ) );
                    pathLength = path.node().getTotalLength();
                    d3.select( this )
                        .append( 'path' )
                        .attr( 'id', driver => 'Year_' + _displayedYear + '_race_' + _displayedRaceId + '_driver_' + driver.driverId + '_path_shadow' )
                        .attr( "stroke-width", _pathShadowWidth )
                        .attr( "stroke", driver => getColour( driver.driverId ) )
                        .attr( "stroke-opacity", 0 )
                        .attr( "fill", "none" )
                        // create the polylines
                        .attr( "d", driver => d3.line()( points ) );

                    path
                        .attr( 'stroke-dasharray', pathLength )
                        .attr( 'stroke-dashoffset', pathLength )
                        .transition()
                        .duration( _transitionSpeed )
                        .attr( 'stroke-dashoffset', 0 );
                    self.racialParams[_displayedRaceId].paths.push( path );
                } );
        } else {
            length = this.racialParams[_displayedRaceId].paths.length;
            for ( i = 0; i < length; i++ ) {
                path = this.racialParams[_displayedRaceId].paths[i];
                pathLength = path.node().getTotalLength();
                path
                    .attr( 'stroke-dasharray', pathLength )
                    .attr( 'stroke-dashoffset', pathLength )
                    .transition()
                    .duration( _transitionSpeed )
                    .attr( 'stroke-dashoffset', 0 );
            }
        }
    };

    this.update = function ( width, height ) {
        if ( this.width !== width || this.height !== height ) {
            this.width = width;
            this.height = height;
        }
    };

    this.onRaceClicked = function ( event ) {
        var round = parseInt( event.currentTarget.id.split( 'Round_' )[1].split( '_' )[0], 10 ),
            race;
        if ( round === 0 ) {
            return;
        }
        race = F1DataVis.dataHandler.getRaceByRoundInYear( _displayedYear, round );
        // Translate out the season.
        self.seasonalGrp[_displayedYear]
            .transition()
            .duration( _transitionSpeed )
            .attr( 'transform', 'translate(0,' + ( self.height * 1.5 ) + ')' );
        _displayedRaceIndex = round - 1;
        self.drawRace( race, 0 );
    };

    this.sliderHandleClicked = function ( year ) {
        if ( _displayingYear === false && year === _displayedYear ) {
            // Translate out the race.
            this.raceGrp[_displayedRaceId]
                .attr( 'transform', 'translate(0,0)' )
                .transition()
                .duration( _transitionSpeed )
                .attr( 'transform', 'translate(0,' + ( this.height * -1.5 ) + ')' );
            _leftButton.transitionX( _leftButtonRestPos );
            _rightButton.transitionX( _rightButtonRestPos );
            _visualizer.updateDashBoard( );

            _displayingYear = true;

            // Translate in the season.
            this.seasonalGrp[_displayedYear]
                .attr( 'transform', 'translate(0,' + ( this.height * 1.5 ) + ')' )
                .transition()
                .duration( _transitionSpeed )
                .attr( 'transform', 'translate(0,0)' );
        }
    };

    this.getDashBoardBounds = function() {
        return this.racialParams[_displayedRaceId].dashBoardBound;
    };
}