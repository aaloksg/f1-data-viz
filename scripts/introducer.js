var F1DataVis = F1DataVis || {};
F1DataVis.Texts = F1DataVis.Texts || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};
F1DataVis.IdStore.introText = 'introText';
F1DataVis.IdStore.quoteText = 'quoteText';
F1DataVis.IdStore.dataCreditText = 'dataCreditText';
F1DataVis.IdStore.clickToStartText = 'clickToStartText';
F1DataVis.IdStore.personalIntroText = 'personalIntroText'

F1DataVis.introducer = function ( introGrp, logoStyles, visualizer ) {
    var self = this,
        _visualizer = visualizer,
        _introGrp = introGrp,
        _transitionSpeed = 1500,
        _doAnimation,
        _logoStyles = logoStyles,
        _logoCenter = {x:0, y:0},
        _logoButtonMargins = {
            top: 0,
            left: 20,
            right: 20,
            bottom: 0
        },
        _logoButtonPos = {
            top: 0,
            left: 0,
            height: 0,
            width: 0
        },
        _textPositions = {
            margin: {
                top: 50,
                left: 50,
                right: 50,
                bottom: 60
            },
            textGapFactor: 1.5,
            topTextX: 0,
            topTextY: 0,
            topTextAnchor: 'middle',
            topTextGap: 30,
            leftTextX: 0,
            leftTextY: 0,
            leftTextAnchor: 'end',
            leftTextGap: 20,
            rightTextX: 0,
            rightTextY: 0,
            rightTextAnchor: 'start',
            rightTextGap: 20,
            clickToStartTextX: 0,
            clickToStartTextY: 0,
            clickToStartTextAnchor: 'middle',
            dataCreditTextX: 0,
            dataCreditTextY: 0,
            quoteTextX: 0,
            quoteTextY: 0,
            introImageSize: 200,
            introImageMargin: 20,
            leftIntroTextX: 0,
            leftIntroTextY: 0,
            leftIntroTextAnchor: 'end',
            leftIntroTextGap: 20,
            rightIntroTextX: 0,
            rightIntroTextY: 0,
            rightIntroTextAnchor: 'start',
            rightIntroTextGap: 20,
        },
        _topTextGrp,
        _leftTextGrp,
        _rightTextGrp,
        _clickToStartTextGrp,
        _leftIntroGrp,
        _rightIntroGrp,
        _leftIntroAnchorGrp,
        _rightIntroAnchorGrp,
        _leftIntroTextGrp,
        _rightIntroTextGrp,
        _initPositions = function () {
            _textPositions.topTextX = _visualizer.width / 2;
            _textPositions.topTextAnchor = 'middle';
            _textPositions.leftTextX = _logoButtonPos.left - _textPositions.margin.right;
            _textPositions.leftTextAnchor = 'end';
            _textPositions.rightTextX = _logoButtonPos.left + _logoButtonPos.width + _textPositions.margin.left;
            _textPositions.rightTextAnchor = 'start';
            _textPositions.clickToStartTextX = _visualizer.width / 2;
            _textPositions.clickToStartTextAnchor = 'middle';
            _textPositions.leftIntroTextAnchor = 'end';
            _textPositions.rightIntroTextAnchor = 'start';
        },
        _createTexts = function () {
            F1DataVis.Texts.ClickToStart = ['Click to start!'];
            F1DataVis.Texts.IntroTexts = [
                'F1 Data Visualisation (1996 to 2017)',
                'A visualisation of the journeys of teams through seasons,',
                'and the stories of drivers in each Grand Prix.'
            ];
            // [TODO] - Add hyperlink to DataCredit - https://www.kaggle.com/rohanrao/formula-1-world-championship-1950-2020
            F1DataVis.Texts.DataCredit = [
                'Data compiled by Vopani on kaggle.',
                'd3 slider created by John Walley.'
            ];
            F1DataVis.Texts.DataCreditLinks = [
                'https://www.kaggle.com/rohanrao/formula-1-world-championship-1950-2020',
                'https://github.com/johnwalley/d3-simple-slider'
            ];
            F1DataVis.Texts.Quote = ['"Races are won at the track.',
                'Championships are won at the factory."',
                '- Mercedes( 2019 )'
            ];
            F1DataVis.Texts.LeftIntro = ['Aalok Shashidhar Gokhale', '121872', 'aalok.shashidhar.gokhale@uni-weimar.de', 'Bauhaus-Universität', 'Weimar'];
            F1DataVis.Texts.RightIntro = ['Ankith Kodanda', '121983', 'ankith.kodanda@uni-weimar.de', 'Bauhaus-Universität', 'Weimar'];
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
                    if ( _doAnimation ) {
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
                    if ( _doAnimation ) {
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
                    if ( _doAnimation ) {
                        _logoGradAnim2();
                    }
                } );
        },
        _checkMousePosition = function ( event ) {
            var distance = Math.sqrt( Math.pow( event.clientX - _logoCenter.x, 2 ) + Math.pow( event.clientY - _logoCenter.y, 2 ) ), bufferRadius = _logoButtonPos.width / 2;
            _transitionSpeed = 200;
            if ( distance > bufferRadius) {
                _transitionSpeed += 2 * ( distance - bufferRadius );
            }
        };

    this.draw = function () {
        var length, i, textElements, textHeight = 0, yPos = 0, totalHeight, anchor, outerRectSize = 10, innerRectSize = 5;
        _logoButtonPos.left = logoStyles.largeX - _logoButtonMargins.left;
        _logoButtonPos.top = logoStyles.largeY - _logoButtonMargins.top;
        _logoButtonPos.width = logoStyles.largeWidth + _logoButtonMargins.left + _logoButtonMargins.right;
        _logoButtonPos.height = logoStyles.largeHeight + _logoButtonMargins.top + _logoButtonMargins.bottom;
        _logoCenter.x = logoStyles.largeX + logoStyles.largeWidth / 2;
        _logoCenter.y = logoStyles.largeY + logoStyles.largeHeight / 2;
        _initPositions();
        _buttonSVG = introGrp
            .append( 'g' )
            .attr( 'id', 'logoID' )
            .attr( 'transform', 'translate(' + _logoButtonPos.left + ',' + _logoButtonPos.top + ')' )
            .attr( 'cursor', 'pointer' );
        _rect = _buttonSVG
            .append( 'rect' )
            .attr( 'x', 0 )
            .attr( 'y', 0 )
            .attr( 'width', _logoButtonPos.width )
            .attr( 'height', _logoButtonPos.height )
            .attr( 'rx', _logoButtonPos.width * 0.2 )
            .attr( 'ry', _logoButtonPos.height )
            .attr( 'fill', F1DataVis.IdStore.LogoNormalURL );
        _buttonSVG
            .append( 'rect' )
            .attr( 'x', 5 )
            .attr( 'y', 5 )
            .attr( 'width', _logoButtonPos.width - 10 )
            .attr( 'height', _logoButtonPos.height - 10 )
            .attr( 'rx', _logoButtonPos.width * 0.2 )
            .attr( 'ry', _logoButtonPos.height )
            .attr( 'fill', F1DataVis.IdStore.LogoHoverURL );

        // Top texts
        textElements = [];
        length = F1DataVis.Texts.IntroTexts.length;
        _topTextGrp = _introGrp
            .append( 'g' )
            .attr( 'id', 'IntroTextGroup' )
            .attr( 'class', F1DataVis.IdStore.introText );
        for ( i = 0; i < length; i++ ) {
            textElements.push( _topTextGrp
                .append( 'text' )
                .attr( 'x', 0 )
                .attr( 'y', 0 )
                .attr( "text-anchor", _textPositions.topTextAnchor )
                .text( F1DataVis.Texts.IntroTexts[i] ) );
        }
        textElements[0].attr( 'class', 'headingText' );

        textHeight = textElements[0]._groups[0][0].getBBox().height;
        totalHeight = ( length * textHeight ) + ( textHeight * 0.5 * ( length - 1 ) );
        _textPositions.topTextY = _logoButtonPos.top - _textPositions.margin.bottom - totalHeight;
        _topTextGrp
            .attr( 'transform', 'translate(' + _textPositions.topTextX + ',' + _textPositions.topTextY + ')' );
        yPos = textHeight * 0.75;
        _textPositions.topTextGap = textHeight * _textPositions.textGapFactor;
        for ( i = 0; i < length; i++ ) {
            textElements[i]
                .attr( 'x', 0 )
                .attr( 'y', yPos );
            yPos += _textPositions.topTextGap;
        }

        // Left texts
        textElements = [];
        length = F1DataVis.Texts.Quote.length;
        _leftTextGrp = _introGrp
            .append( 'g' )
            .attr( 'id', 'QuoteTextGroup' )
            .attr( 'class', F1DataVis.IdStore.quoteText );
        for ( i = 0; i < length; i++ ) {
            textElements.push( _leftTextGrp
                .append( 'text' )
                .attr( 'x', 0 )
                .attr( 'y', 0 )
                .attr( "text-anchor", _textPositions.leftTextAnchor )
                .text( F1DataVis.Texts.Quote[i] ) );
        }
        textHeight = textElements[0]._groups[0][0].getBBox().height;
        totalHeight = ( length * textHeight ) + ( textHeight * 0.5 * ( length - 1 ) );
        _textPositions.leftTextY = _logoButtonPos.top + _logoButtonPos.height / 2 - totalHeight / 2;
        _leftTextGrp
            .attr( 'transform', 'translate(' + _textPositions.leftTextX + ',' + _textPositions.leftTextY + ')' );
        yPos = textHeight * 0.75;
        _textPositions.leftTextGap = textHeight * _textPositions.textGapFactor;
        for ( i = 0; i < length; i++ ) {
            textElements[i]
                .attr( 'x', 0 )
                .attr( 'y', yPos );
            yPos += _textPositions.leftTextGap;
        }

        // Right texts
        textElements = [];
        length = F1DataVis.Texts.DataCredit.length;
        _rightTextGrp = _introGrp
            .append( 'g' )
            .attr( 'id', 'DataCreditTextGroup' );
        for ( i = 0; i < length; i++ ) {
            textElements.push( _rightTextGrp
                .append( 'a' )
                .attr( 'href', F1DataVis.Texts.DataCreditLinks[i] )
                .attr( 'target', '_blank' )
                .append( 'text' )
                .attr( 'x', 0 )
                .attr( 'y', 0 )
                .attr( "text-anchor", _textPositions.rightTextAnchor )
                .attr( 'cursor', 'pointer' )
                .attr( 'class', F1DataVis.IdStore.dataCreditText )
                .on( 'mouseover', function () {
                    this.classList.add( 'anchorHover' );
                } )
                .on( 'mouseout', function () {
                    this.classList.remove( 'anchorHover' );
                } )
                .text( F1DataVis.Texts.DataCredit[i] ) );
        }
        textHeight = textElements[0]._groups[0][0].getBBox().height;
        totalHeight = ( length * textHeight ) + ( textHeight * 0.5 * ( length - 1 ) );
        _textPositions.rightTextY = _logoButtonPos.top + _logoButtonPos.height / 2 - totalHeight / 2;
        _rightTextGrp
            .attr( 'transform', 'translate(' + _textPositions.rightTextX + ',' + _textPositions.rightTextY + ')' );
        yPos = textHeight * 0.75;
        _textPositions.rightTextGap = textHeight * _textPositions.textGapFactor;
        for ( i = 0; i < length; i++ ) {
            textElements[i]
                .attr( 'x', 0 )
                .attr( 'y', yPos );
            yPos += _textPositions.rightTextGap;
        }

        // Bottom text
        textElements = [];
        length = F1DataVis.Texts.ClickToStart.length;
        _clickToStartTextGrp = _introGrp
            .append( 'g' )
            .attr( 'id', 'ClickToStartTextGroup' )
            .attr( 'class', F1DataVis.IdStore.clickToStartText );
        for ( i = 0; i < length; i++ ) {
            textElements.push( _clickToStartTextGrp
                .append( 'text' )
                .attr( 'x', 0 )
                .attr( 'y', 0 )
                .attr( "text-anchor", _textPositions.clickToStartTextAnchor )
                .text( F1DataVis.Texts.ClickToStart[i] ) );
        }
        textHeight = textElements[0]._groups[0][0].getBBox().height;
        totalHeight = ( length * textHeight ) + ( textHeight * 0.5 * ( length - 1 ) );
        _textPositions.clickToStartTextY = _logoButtonPos.top + _logoButtonPos.height + _textPositions.margin.top / 4;
        _clickToStartTextGrp
            .attr( 'transform', 'translate(' + _textPositions.clickToStartTextX + ',' + _textPositions.clickToStartTextY + ')' );
        yPos = textHeight * 0.75;
        _textPositions.clickToStartTextGap = textHeight * _textPositions.textGapFactor;
        for ( i = 0; i < length; i++ ) {
            textElements[i]
                .attr( 'x', 0 )
                .attr( 'y', yPos );
            yPos += _textPositions.clickToStartTextGap;
        }

        // Create personal introductions.
        _textPositions.leftIntroTextY = _textPositions.rightIntroTextY = _textPositions.clickToStartTextY + yPos + _textPositions.margin.top;
        _textPositions.introImageSize = _visualizer.height - _textPositions.leftIntroTextY - _textPositions.margin.top;
        _textPositions.leftIntroTextX = _visualizer.width / 2 - _textPositions.introImageSize - _textPositions.introImageMargin / 2 - _textPositions.margin.right;
        _textPositions.rightIntroTextX = _visualizer.width / 2 + _textPositions.introImageSize + _textPositions.introImageMargin / 2 + _textPositions.margin.left;

        _introGrp
            .append( 'path' )
            .attr( 'id', 'personalIntroDivider' )
            .attr( "stroke-width", _textPositions.introImageMargin * 0.1 )
            .attr( "stroke", '#dfdfdf' )
            .attr( "stroke-opacity", 0.5 )
            .attr( "stroke-dasharray", '15 10' )
            .attr( "fill", "none" )
            .attr( "d", team => d3.line()( [[_visualizer.width / 2, _textPositions.leftIntroTextY], [_visualizer.width / 2, _textPositions.leftIntroTextY + _textPositions.introImageSize ]] ) );

        _leftIntroGrp = _introGrp
            .append( 'g' )
            .attr( 'id', 'LeftIntroGroup' );
        _rightIntroGrp = _introGrp
            .append( 'g' )
            .attr( 'id', 'RightIntroGroup' );

        _leftIntroAnchorGrp = _leftIntroGrp
            .append( 'g' )
            .attr( 'id', 'LeftIntroAnchorGroup' )
            .attr( 'fill-opacity', 0 )
            .attr( 'cursor', 'pointer' )
            .on( 'mouseover', function () {
                _leftIntroAnchorGrp.attr( 'fill-opacity', 1 );
            } )
            .on( 'mouseout', function () {
                _leftIntroAnchorGrp.attr( 'fill-opacity', 0 );
            } );

        _rightIntroAnchorGrp = _rightIntroGrp
            .append( 'g' )
            .attr( 'id', 'RightIntroAnchorGroup' )
            .attr( 'fill-opacity', 0 )
            .attr( 'cursor', 'pointer' )
            .on( 'mouseover', function () {
                _rightIntroAnchorGrp.attr( 'fill-opacity', 1 );
            } )
            .on( 'mouseout', function () {
                _rightIntroAnchorGrp.attr( 'fill-opacity', 0 );
            } );

        // Left intro photo
        anchor = _leftIntroAnchorGrp
            .append( 'a' )
            .attr( 'href', 'https://www.linkedin.com/in/aalok-gokhale-b2031560/' )
            .attr( 'target', '_blank' );

        anchor
            .append( 'rect' )
            .attr( 'x', _visualizer.width / 2 - _textPositions.introImageSize - _textPositions.introImageMargin / 2 - outerRectSize / 2 )
            .attr( 'y', _textPositions.leftIntroTextY - outerRectSize / 2 )
            .attr( 'height', _textPositions.introImageSize + outerRectSize )
            .attr( 'width', _textPositions.introImageSize + outerRectSize )
            .attr( 'ry', _textPositions.introImageSize + outerRectSize )
            .attr( 'rx', _textPositions.introImageSize + outerRectSize )
            .attr( 'fill', '#dfdfdf' );
        anchor
            .append( 'rect' )
            .attr( 'x', _visualizer.width / 2 - _textPositions.introImageSize - _textPositions.introImageMargin / 2 - innerRectSize / 2 )
            .attr( 'y', _textPositions.leftIntroTextY - innerRectSize / 2 )
            .attr( 'height', _textPositions.introImageSize + innerRectSize )
            .attr( 'width', _textPositions.introImageSize + innerRectSize )
            .attr( 'ry', _textPositions.introImageSize + innerRectSize )
            .attr( 'rx', _textPositions.introImageSize + innerRectSize )
            .attr( 'fill', 'url(#LogoNormal_gradient)' );
        anchor
            .append( 'image' )
            .attr( 'x', _visualizer.width / 2 - _textPositions.introImageSize - _textPositions.introImageMargin / 2 )
            .attr( 'y', _textPositions.leftIntroTextY )
            .attr( 'height', _textPositions.introImageSize )
            .attr( 'width', _textPositions.introImageSize )
            .attr( 'href', './images/introPhotoAlk.png' );

        // Right intro photo
        anchor = _rightIntroAnchorGrp
            .append( 'a' )
            .attr( 'href', 'https://www.linkedin.com/in/ankith-kodanda-3365b3103' )
            .attr( 'target', '_blank' );
        anchor
            .append( 'rect' )
            .attr( 'x', _visualizer.width / 2 + _textPositions.introImageMargin / 2 - outerRectSize / 2 )
            .attr( 'y', _textPositions.leftIntroTextY - outerRectSize / 2 )
            .attr( 'height', _textPositions.introImageSize + outerRectSize )
            .attr( 'width', _textPositions.introImageSize + outerRectSize )
            .attr( 'ry', _textPositions.introImageSize + outerRectSize )
            .attr( 'rx', _textPositions.introImageSize + outerRectSize )
            .attr( 'fill', '#dfdfdf' );
        anchor
            .append( 'rect' )
            .attr( 'x', _visualizer.width / 2 + _textPositions.introImageMargin / 2 - innerRectSize / 2 )
            .attr( 'y', _textPositions.leftIntroTextY - innerRectSize / 2 )
            .attr( 'height', _textPositions.introImageSize + innerRectSize )
            .attr( 'width', _textPositions.introImageSize + innerRectSize )
            .attr( 'ry', _textPositions.introImageSize + innerRectSize )
            .attr( 'rx', _textPositions.introImageSize + innerRectSize )
            .attr( 'fill', 'url(#LogoNormal_gradient)' );
        anchor
            .append( 'image' )
            .attr( 'x', _visualizer.width / 2 + _textPositions.introImageMargin / 2 )
            .attr( 'y', _textPositions.leftIntroTextY )
            .attr( 'height', _textPositions.introImageSize )
            .attr( 'width', _textPositions.introImageSize )
            .attr( 'href', './images/introPhotoAnk.png' );

        // Left intro texts
        textElements = [];
        length = F1DataVis.Texts.LeftIntro.length;
        _leftIntroTextGrp = _leftIntroGrp
            .append( 'g' )
            .attr( 'id', 'LeftIntroTextGroup' )
            .attr( 'class', F1DataVis.IdStore.personalIntroText );
        for ( i = 0; i < length; i++ ) {
            textElements.push( _leftIntroTextGrp
                .append( 'text' )
                .attr( 'x', 0 )
                .attr( 'y', 0 )
                .attr( "text-anchor", _textPositions.leftIntroTextAnchor )
                .text( F1DataVis.Texts.LeftIntro[i] ) );
        }
        textHeight = textElements[0]._groups[0][0].getBBox().height;
        totalHeight = ( length * textHeight ) + ( textHeight * 0.5 * ( length - 1 ) );
        _textPositions.leftIntroTextY = _textPositions.leftIntroTextY + _textPositions.introImageSize / 2 - totalHeight / 2;

        _leftIntroTextGrp
            .attr( 'transform', 'translate(' + _textPositions.leftIntroTextX + ',' + _textPositions.leftIntroTextY + ')' );
        yPos = textHeight * 0.75;
        _textPositions.leftIntroTextGap = textHeight * _textPositions.textGapFactor;
        for ( i = 0; i < length; i++ ) {
            textElements[i]
                .attr( 'x', 0 )
                .attr( 'y', yPos );
            yPos += _textPositions.leftIntroTextGap;
        }

        // Right intro texts
        textElements = [];
        length = F1DataVis.Texts.RightIntro.length;
        _rightIntroTextGrp = _rightIntroGrp
            .append( 'g' )
            .attr( 'id', 'RightIntroTextGroup' )
            .attr( 'class', F1DataVis.IdStore.personalIntroText );
        for ( i = 0; i < length; i++ ) {
            textElements.push( _rightIntroTextGrp
                .append( 'text' )
                .attr( 'x', 0 )
                .attr( 'y', 0 )
                .attr( "text-anchor", _textPositions.rightIntroTextAnchor )
                .text( F1DataVis.Texts.RightIntro[i] ) );
        }
        textHeight = textElements[0]._groups[0][0].getBBox().height;
        totalHeight = ( length * textHeight ) + ( textHeight * 0.5 * ( length - 1 ) );
        _textPositions.rightIntroTextY = _textPositions.rightIntroTextY + _textPositions.introImageSize / 2 - totalHeight / 2;

        _rightIntroTextGrp
            .attr( 'transform', 'translate(' + _textPositions.rightIntroTextX + ',' + _textPositions.rightIntroTextY + ')' );
        yPos = textHeight * 0.75;
        _textPositions.rightIntroTextGap = textHeight * _textPositions.textGapFactor;
        for ( i = 0; i < length; i++ ) {
            textElements[i]
                .attr( 'x', 0 )
                .attr( 'y', yPos );
            yPos += _textPositions.rightIntroTextGap;
        }
    };

    this.startStopAnim = function ( doAnimation ) {
        _doAnimation = doAnimation;
        if ( _doAnimation ) {
            _logoGradAnim2();
            d3.select( _visualizer.parentSvg).on( 'mousemove', _checkMousePosition );
        } else {
            d3.select( _visualizer.parentSvg ).on( 'mousemove', null );
        }
    };

    _createTexts();
};
