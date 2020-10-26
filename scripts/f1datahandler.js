var F1DataVis = F1DataVis || {};
F1DataVis.dataHandler = F1DataVis.dataHandler || {};
F1DataVis.data = F1DataVis.data || {};
F1DataVis.data.racesByYear = {};
F1DataVis.data.teamIdsByYear = {};
F1DataVis.data.teamsById = {};
F1DataVis.data.driversById = {};
F1DataVis.data.statusesById = {};
F1DataVis.data.constructorStandingsByRaceId = {};
F1DataVis.data.laptimesByRaceId = {};
F1DataVis.data.positionsByTeamByRound = {};
F1DataVis.data.polePositionsByRaceId = {};
F1DataVis.data.resultByRaceDriver = {};
F1DataVis.data.tooltipData = {};

F1DataVis.dataHandler.initializeData = function () {
    var length, i, item, races;
    F1DataVis.data.racesByYear = {};
    if ( F1DataVis.data.races ) {
        length = F1DataVis.data.races.length;
        for ( i = 0; i < length; i++ ) {
            item = F1DataVis.data.races[i];
            if ( F1DataVis.data.racesByYear[item.year] ) {
                F1DataVis.data.racesByYear[item.year].push( item );
            } else {
                F1DataVis.data.racesByYear[item.year] = [item];
            }
        }
        for ( item in F1DataVis.data.racesByYear ) {
            F1DataVis.data.racesByYear[item]
                .sort( ( raceA, raceB ) => {
                    if ( raceA.round < raceB.round ) {
                        return -1;
                    } else if ( raceA.round > raceB.round ) {
                        return 1;
                    } else {
                        return 0;
                    }
                } );
        }

    }

    F1DataVis.data.polePositionsByRaceId = {};
    if ( F1DataVis.data.qualifying ) {
        length = F1DataVis.data.qualifying.length;
        for ( i = 0; i < length; i++ ) {
            item = F1DataVis.data.qualifying[i];
            if ( F1DataVis.data.polePositionsByRaceId[item.raceId] ) {
                F1DataVis.data.polePositionsByRaceId[item.raceId].push( item );
            } else {
                F1DataVis.data.polePositionsByRaceId[item.raceId] = [item];
            }
        }
        for ( item in F1DataVis.data.polePositionsByRaceId ) {
            F1DataVis.data.polePositionsByRaceId[item]
                .sort( ( posA, posB ) => {
                    if ( posA.position < posB.position ) {
                        return -1;
                    } else if ( posA.position > posB.position ) {
                        return 1;
                    } else {
                        return 0;
                    }
                } );
        }

    }
    length = F1DataVis.data.status.length;
    for ( i = 0; i < length; i++ ) {
        F1DataVis.data.statusesById[F1DataVis.data.status[i].statusId] = F1DataVis.data.status[i].status;
    }



    //var laps = F1DataVis.data.lapTimes, i = 0, tempIndex, length = laps.length, raceId, raceIds = [], tempRaceIds, year, years = [], raceByYear = {};
    //for ( i = 0; i < length; i++ ) {
    //    raceId = laps[i].raceId;
    //    if ( raceIds.indexOf( raceId ) === -1 ) {
    //        raceIds.push( raceId );
    //    }
    //}
    //tempRaceIds = raceIds.slice();
    //length = F1DataVis.data.races.length;
    //for ( i = 0; i < length; i++ ) {
    //    raceId = F1DataVis.data.races[i].raceId;
    //    if ( (tempIndex = tempRaceIds.indexOf( raceId )) > -1 ) {
    //        year = F1DataVis.data.races[i].year;
    //        if ( years.indexOf( year ) === -1 ) {
    //            years.push( year );
    //            raceByYear[year] = 0;
    //        }
    //        raceByYear[year]++;
    //        //tempRaceIds.splice( tempIndex, 1 );
    //        if ( tempRaceIds.length === 0 ) {
    //            break;
    //        }
    //    }
    //}
    //years = years.sort();
    //years.forEach( year => {
    //    console.log( 'Races in laptimes for year ' + year + ' : ' + raceByYear[year] );
    //    console.log( 'Total number of races for year ' + year + ' : ' + F1DataVis.data.racesByYear[year].length );
    //} );
};

F1DataVis.dataHandler.getRaceIdsInYear = function ( year ) {
    var races = F1DataVis.data.racesByYear[year], raceIds = [], length = races.length, i;
    for ( i = 0; i < length; i++ ) {
        raceIds.push( races[i].raceId );
    }
    return raceIds;
};

F1DataVis.dataHandler.createCnstrctrStndgsByRaceIds = function ( year ) {
    var raceIds = F1DataVis.dataHandler.getRaceIdsInYear( year );
    var count = 0, length, i, j, raceId, jump = 5, lowerBound, upperBound;
    length = F1DataVis.data.constructorStandings.length;
    if ( F1DataVis.data.constructorStandings ) {
        for ( i = 0; i < length; i = i + jump ) {
            item = F1DataVis.data.constructorStandings[i];
            raceId = item.raceId;
            if ( raceIds.indexOf( raceId ) > -1 ) {
                raceIds.splice( raceIds.indexOf( raceId ), 1 );
                if ( F1DataVis.data.constructorStandingsByRaceId[raceId] === undefined ) {
                    if ( i !== 0 ) {
                        lowerBound = i - jump;
                        for ( j = i - 1; j > lowerBound; j-- ) {
                            item = F1DataVis.data.constructorStandings[j];
                            if ( item.raceId !== raceId ) {
                                break;
                            }
                        }
                        lowerBound = j + 1;

                    }
                    else {
                        lowerBound = i;
                    }

                    for ( j = i + 1; j < length; j++ ) {
                        item = F1DataVis.data.constructorStandings[j];
                        if ( item.raceId !== raceId ) {
                            break;
                        }
                    }
                    upperBound = j;
                    F1DataVis.data.constructorStandingsByRaceId[raceId] = F1DataVis.data.constructorStandings.slice( lowerBound, upperBound );
                    i = upperBound - jump;
                }
                if ( raceIds.length === 0 ) {
                    break;
                }

            }


        }

    }
    F1DataVis.dataHandler.createDetailedPositions( year );

};

F1DataVis.dataHandler.createDetailedPositions = function ( year ) {
    var racesByYear = F1DataVis.data.racesByYear, races, i, length, raceId, constructorStandings, object, j, length2;

    races = racesByYear[year];
    length = races.length;
    object = F1DataVis.data.positionsByTeamByRound[year] = {};
    for ( i = 0; i < length; i++ ) {
        raceId = races[i].raceId;
        object[races[i].round] = {};
        constructorStandings = F1DataVis.data.constructorStandingsByRaceId[raceId];
        length2 = constructorStandings.length;
        for ( j = 0; j < length2; j++ ) {
            object[races[i].round][constructorStandings[j].constructorId] = constructorStandings[j].position;
        }
    }

};

F1DataVis.dataHandler.getTeamsInSeason = function ( year ) {
    var teams = [], races = F1DataVis.data.racesByYear[year],
        racesLength = races.length, raceIndex,
        noOfStandings, standingIndex,
        constructorStandings, constructorId;
    if ( F1DataVis.data.teamIdsByYear[year] ) {
        teams = F1DataVis.data.teamIdsByYear[year];
    } else {
        for ( raceIndex = 0; raceIndex < racesLength; raceIndex++ ) {
            constructorStandings = F1DataVis.data.constructorStandingsByRaceId[races[raceIndex].raceId];
            noOfStandings = constructorStandings.length;
            for ( standingIndex = 0; standingIndex < noOfStandings; standingIndex++ ) {
                constructorId = constructorStandings[standingIndex].constructorId;
                if ( teams.indexOf( constructorId ) === -1 ) {
                    teams.push( constructorId );
                }
            }
        }
        F1DataVis.data.teamIdsByYear[year] = teams;
    }
    return teams;
};

F1DataVis.dataHandler.getTeamsByID = function ( teamId ) {
    var team, index, length, teams;
    if ( F1DataVis.data.teamsById[teamId] ) {
        team = F1DataVis.data.teamsById[teamId];
    } else {
        teams = F1DataVis.data.constructors;
        length = teams.length;
        for ( index = 0; index < length; index++ ) {
            if ( teams[index].constructorId === teamId ) {
                team = teams[index];
                break;
            }
        }
        F1DataVis.data.teamsById[teamId] = team;
    }
    return team;
};

F1DataVis.dataHandler.getDriversByID = function ( driverId ) {
    var driver, index, length, drivers;
    if ( F1DataVis.data.driversById[driverId] ) {
        driver = F1DataVis.data.driversById[driverId];
    } else {
        drivers = F1DataVis.data.drivers;
        length = drivers.length;
        for ( index = 0; index < length; index++ ) {
            if ( drivers[index].driverId === driverId ) {
                driver = drivers[index];
                break;
            }
        }
        F1DataVis.data.driversById[driverId] = driver;
    }
    return driver;
};

F1DataVis.dataHandler.getRaceByRoundInYear = function ( year, round ) {
    var races = F1DataVis.data.racesByYear[year], i, length = races.length, race;
    for ( i = 0; i < length; i++ ) {
        if ( races[i].round === round ) {
            race = races[i];
            break;
        }
    }
    return race;
};

F1DataVis.dataHandler.getLapsByRaceId = function ( raceId ) {
    var laps;
    if ( F1DataVis.data.laptimesByRaceId[raceId] !== undefined ) {
        laps = F1DataVis.data.laptimesByRaceId[raceId];
    } else {
        laps = F1DataVis.data.laptimesByRaceId[raceId] = F1DataVis.data.lapTimes.filter( laptime => laptime.raceId === raceId );
    }
    return laps;
};

F1DataVis.dataHandler.getDriverObjByPolePositions = function ( raceId ) {
    if ( F1DataVis.data.polePositionsByRaceId[raceId] === undefined ) {
        return undefined;
    }
    return F1DataVis.data.polePositionsByRaceId[raceId].map( item => F1DataVis.dataHandler.getDriversByID( item.driverId ) );

};

F1DataVis.dataHandler.getResultDetails = function ( raceId, driverId ) {
    var result, results, length, i;
    if ( F1DataVis.data.resultByRaceDriver[raceId + '_' + driverId] ) {
        result = F1DataVis.data.resultByRaceDriver[raceId + '_' + driverId];
    } else {
        results = F1DataVis.data.results;
        length = results.length;
        for ( i = 0; i < length; i++ ) {
            if ( results[i].raceId === raceId && results[i].driverId === driverId ) {
                F1DataVis.data.resultByRaceDriver[raceId + '_' + driverId] = result = results[i];
                break;
            }
        }
    }
    return result;
};

F1DataVis.dataHandler.getStatusByID = function ( statusId ) {
    return F1DataVis.data.statusesById[statusId];
};


F1DataVis.dataHandler.getTooltipData = function ( raceId, driverId ) {
    var tooltipData,
        result,
        teamInfo,
        driverInfo,
        status;
    if ( F1DataVis.data.tooltipData ) {

    }
    if ( F1DataVis.data.tooltipData[raceId + '_' + driverId] ) {
        tooltipData = F1DataVis.data.tooltipData[raceId + '_' + driverId];
    } else {
        result = F1DataVis.dataHandler.getResultDetails( raceId, driverId );
        teamInfo = F1DataVis.dataHandler.getTeamsByID( result.constructorId );
        driverInfo = F1DataVis.dataHandler.getDriversByID( driverId );
        status = F1DataVis.dataHandler.getStatusByID( result.statusId );
        F1DataVis.data.tooltipData[raceId + '_' + driverId] = tooltipData =
            [driverInfo.forename + ' ' + driverInfo.surname, teamInfo.name, status];
    }

    return tooltipData;
}