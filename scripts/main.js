var F1DataVis = F1DataVis || {};

F1DataVis.main = function () {
    F1DataVis.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    F1DataVis.svg.setAttributeNS(null, 'width', '100%');
    F1DataVis.svg.setAttributeNS(null, 'height', '100%');
    F1DataVis.svg.setAttributeNS(null, 'id', 'ContainerSVG');
    var svgParent = document.getElementById('svgParent');
    svgParent.appendChild(F1DataVis.svg);


}();