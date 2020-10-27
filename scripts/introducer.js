var F1DataVis = F1DataVis || {};
F1DataVis.Texts = F1DataVis.Texts || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};
F1DataVis.IdStore.buttonClass = 'button';

F1DataVis.introducer = function ( introGrp, logoStyles, visualizer ) {
    var self = this,
        _visualizer = visualizer,
        _introGrp = introGrp,
        _transitionSpeed = 1500,
        _localCheck,
        _logoStyles = logoStyles,
        _logoButtonMargins = {
            top: 5,
            left: 5,
            right: 5,
            bottom: 5
        },
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
            quoteTextY: 0
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
        },
        _logoGradAnim2 = function () {
            d3.select( '#' + F1DataVis.IdStore.LogoNormal + "_1" )
                .attr( 'stop-color', 'black' );
            d3.select( '#' + F1DataVis.IdStore.LogoNormal + "_3" )
                .attr( 'stop-color', 'midnightblue' );
            d3.select( '#' + F1DataVis.IdStore.LogoNormal + "_2" )
                .attr( 'stop-color', '#e70000' )
                .attr( 'offset', '100%' )
                .transition()
                .duration( _transitionSpeed )
                .attr( 'offset', '0%' )
                .on( 'end', function () {
                    if ( _localCheck ) {
                        _logoGradAnim3();
                    }
                    
                } );
        },
        _logoGradAnim3 = function () {
            d3.select( '#' + F1DataVis.IdStore.LogoNormal + "_1" )
                .attr( 'stop-color', '#E70000' );
            d3.select( '#' + F1DataVis.IdStore.LogoNormal + "_3" )
                .attr( 'stop-color', 'black' );
            d3.select( '#' + F1DataVis.IdStore.LogoNormal + "_2" )
                .attr( 'stop-color', 'midnightblue' )
                .attr( 'offset', '100%' )
                .transition()
                .duration( _transitionSpeed )
                .attr( 'offset', '0%' )
                .on( 'end', function () {
                    if( _localCheck ) {
                        _logoGradAnim1();
                    }
                } );
        },
        _logoGradAnim1 = function () {
            d3.select( '#' + F1DataVis.IdStore.LogoNormal + "_1" )
                .attr( 'stop-color', 'midnightblue' );
            d3.select( '#' + F1DataVis.IdStore.LogoNormal + "_3" )
                .attr( 'stop-color', '#e70000' );
            d3.select( '#' + F1DataVis.IdStore.LogoNormal + "_2" )
                .attr( 'stop-color', 'black' )
                .attr( 'offset', '100%' )
                .transition()
                .duration( _transitionSpeed )
                .attr( 'offset', '0%' )
                .on( 'end', function () {
                    if ( _localCheck ) {
                        _logoGradAnim2();
                    }
                } );
        }
        ;

    this.draw = function () {
        _initPositions();
        _buttonSVG = introGrp
            .append( 'g' )
            .attr( 'id', 'logoID' )
            .attr( 'transform', 'translate(' + ( logoStyles.largeX - _logoButtonMargins.left ) + ',' + (logoStyles.largeY - _logoButtonMargins.top) + ')' )
            .attr( 'cursor', 'pointer' );
        _rect = _buttonSVG
            .append( 'rect' )
            .attr( 'x', 0 )
            .attr( 'y', 0 )
            .attr( 'width', logoStyles.largeWidth + _logoButtonMargins.left + _logoButtonMargins.right )
            .attr( 'height', logoStyles.largeHeight + _logoButtonMargins.top + _logoButtonMargins.bottom )
            .attr( 'rx', logoStyles.largeWidth * 0.25 )
            .attr( 'ry', logoStyles.largeHeight * 0.25 )
            .attr( 'fill', F1DataVis.IdStore.LogoNormalURL );
        _buttonSVG
            .append( 'rect' )
            .attr( 'x', 5 )
            .attr( 'y', 5 )
            .attr( 'width', logoStyles.largeWidth + _logoButtonMargins.left + _logoButtonMargins.right - 10 )
            .attr( 'height', logoStyles.largeHeight + _logoButtonMargins.top + _logoButtonMargins.bottom - 10 )
            .attr( 'rx', logoStyles.largeHeight * 0.25 )
            .attr( 'ry', logoStyles.largeHeight * 0.25 )
            .attr( 'fill', F1DataVis.IdStore.LogoHoverURL );
    }


    this.logoGradAnimCheck = function ( check ) {
        _localCheck = check;
        if ( _localCheck ) {
            _logoGradAnim2();
        }
    }

    this.logoHoverStatus = function ( hoverStatus ) {
        if ( hoverStatus ) {
            _transitionSpeed = 300;
        }
        else {
            _transitionSpeed = 1500;
        }
    }
};