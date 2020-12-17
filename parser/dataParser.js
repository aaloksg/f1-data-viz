var dataParser = function () {
    var dataParser = {};
    dataParser.parse = function (file) {
        Papa.parse(file, {
            header: true,
            complete: function (results) {
                console.log(results);
                this.downloadJSON(results.data, file.name);
            }.bind(this),
            dynamicTyping: function ( headerName ) {
                // Use this array to enter header names that contain numerical data nad must be parsed as numbers in JSON, not as string.
                var numericalHeaders = ['circuitId', 'lat', 'lng', 'alt', 'raceId', 'year', 'round', 'constructorId', 'driverId', 'number', 'driverStandingsId', 'points', 'position', 'wins', 'constructorStandingsId', 'resultId', 'grid', 'positionOrder', 'laps', 'fastestLap', 'milliseconds', 'rank', 'fastestLapSpeed', 'statusId', 'lap', 'statusId'];
                return numericalHeaders.indexOf(headerName) >= 0;
            }
        });
    }
    dataParser.downloadJSON = function (data, fileName) {
        // Source - https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser

        var downloadElement = document.createElement('a');
        downloadElement.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data)));
        downloadElement.setAttribute("download", fileName.split('.csv')[0] + ".json");
        document.body.appendChild(downloadElement); // required for firefox
        downloadElement.click();
        downloadElement.remove();
    }
    return dataParser;
}();