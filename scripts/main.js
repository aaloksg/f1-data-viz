var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};
F1DataVis.IdStore.parentSvg = 'ContainerSVG';
F1DataVis.IdStore.defs = 'F1DataVisDefs';

F1DataVis.handler = F1DataVis.handler || {};


F1DataVis.handler.onresize = function () {
    //console.log( 'Width: ' + window.innerWidth );
    //console.log( 'Height: ' + window.innerHeight );
    F1DataVis.handler.visualizer.update( window.innerWidth, window.innerHeight - 20 );
}

F1DataVis.handler.main = function () {
    F1DataVis.dataHandler.initializeData();

    // Create parent SVG
    var parentSvg = document.createElementNS( "http://www.w3.org/2000/svg", "svg" );
    parentSvg.setAttributeNS( null, 'width', '100%' );
    parentSvg.setAttributeNS( null, 'height', '100%' );
    parentSvg.setAttributeNS( null, 'id', F1DataVis.IdStore.parentSvg );

    var defs = document.createElementNS( 'http://www.w3.org/2000/svg', 'defs' );
    defs.setAttributeNS(null, 'id', F1DataVis.IdStore.defs );
    parentSvg.appendChild( defs );


    var mainDiv = document.getElementById( 'mainDiv' );
    mainDiv.style.height = window.innerHeight - 20 + 'px';
    mainDiv.appendChild( parentSvg );

    F1DataVis.handler.visualizer = new F1DataVis.f1Visualizer( parentSvg );
    F1DataVis.handler.visualizer.initialize( window.innerWidth, window.innerHeight - 20);
    F1DataVis.handler.visualizer.draw();

    //window.addEventListener( 'resize', F1DataVis.handler.onresize );
}();
