var F1DataVis = F1DataVis || {};
F1DataVis.Texts = F1DataVis.Texts || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};

F1DataVis.introducer = function ( introGrp, logoStyles, visualizer ) {
    var self = this,
        _visualizer = visualizer,
        _introGrp = introGrp,
        _transitionSpeed = 1500,
        _logoStyles = logoStyles,
        _textPositions = {
            margin: {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20
            },
            topTextX: 0,
            topTextY: 0,
            topTextGap: 0,
            leftTextX: 0,
            leftTextY: 0,
            leftTextGap: 0,
            rightTextX: 0,
            rightTextY: 0,
            rightTextGap: 0,
            clickToStartTextX: 0,
            clickToStartTextY: 0,
            dataCreditTextX: 0,
            dataCreditTextY: 0,
            quoteTextX: 0,
            quoteTextY: 0,
        },
        _initPositions = function () {
            //_textPositions.topTextX = 
        },
        _createTexts = function () {
            F1DataVis.Texts.ClickToStart = 'Click to start!';
            F1DataVis.Texts.IntroTexts = [
                'Welcome to our visualisation of F1 data ranging from 1996 to 2017.',
                'We visualised the change in standings of teams in a season, and the change of positions of drivers in a race.'
            ];
            // [TODO] - Add hyperlink to DataCredit - https://www.kaggle.com/rohanrao/formula-1-world-championship-1950-2020
            F1DataVis.Texts.DataCredit = 'Data compiled by Vopani on kaggle.'
            F1DataVis.Texts.Quote = '"Races are won at the track. Championships are won at the factory." - Mercedes( 2019 )';
        };

    this.draw = function () {
        _initPositions();
    };
    _createTexts();
}