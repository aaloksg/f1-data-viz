var F1DataVis = F1DataVis || {};
F1DataVis.dataHandler = F1DataVis.dataHandler || {};
F1DataVis.data = F1DataVis.data || {};

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
