var F1DataVis = F1DataVis || {};
F1DataVis.dataHandler = F1DataVis.dataHandler || {};
F1DataVis.data = F1DataVis.data || {};
F1DataVis.data.constructorStandingsByRaceId = {};

F1DataVis.dataHandler.initializeData = function () {
    var length, i, item;
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
    }
};

F1DataVis.dataHandler.getRaceIdsInYear = function ( year ) {
    var races = F1DataVis.data.racesByYear[year], raceIds = [], length = races.length, i;
    for ( i = 0; i < length; i++ ) {
        raceIds.push( races[i].raceId );
    }
    return raceIds;
};

F1DataVis.dataHandler.createCnstrctrStndgsByRaceIds = function (year) {
    var raceIds = F1DataVis.dataHandler.getRaceIdsInYear(year);
    var count = 0, length, i, j, raceId, jump = 5, lowerBound, upperBound;
    length = F1DataVis.data.constructorStandings.length;

    if (F1DataVis.data.constructorStandings) {
        for (i = 0; i < length; i = i + jump) {
            item = F1DataVis.data.constructorStandings[i];
            raceId = item.raceId;
            if (raceIds.indexOf(raceId) > -1) {
                raceIds.splice(raceIds.indexOf(raceId), 1);
                if (F1DataVis.data.constructorStandingsByRaceId[raceId] === undefined) {
                    if (i !== 0) {
                        lowerBound = i - jump;
                        for (j = i - 1; j > lowerBound; j--) {
                            item = F1DataVis.data.constructorStandings[j];
                            if (item.raceId !== raceId) {
                                break;
                            }
                        }
                        lowerBound = j + 1;

                    }
                    else {
                        lowerBound = i;
                    }

                    for (j = i + 1; j < length; j++) {
                        item = F1DataVis.data.constructorStandings[j];
                        if (item.raceId !== raceId) {
                            break;
                        }
                    }
                    upperBound = j;
                    F1DataVis.data.constructorStandingsByRaceId[raceId] = F1DataVis.data.constructorStandings.slice(lowerBound, upperBound);
                    i = upperBound - jump;
                }
                if (raceIds.length===0) {
                    break;
                }
                    
            }

            
        }
        
    } 
     
};

