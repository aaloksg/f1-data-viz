var F1DataVis = F1DataVis || {};
F1DataVis.IdStore = F1DataVis.IdStore || {};

F1DataVis.main = function () {
    F1DataVis.IdStore.parentSvg = 'ContainerSVG';
    F1DataVis.IdStore.sliderParent = 'sliderGrp';

    // Create parent SVG
    F1DataVis.parentSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    F1DataVis.parentSvg.setAttributeNS(null, 'width', '100%');
    F1DataVis.parentSvg.setAttributeNS(null, 'height', '100%');
    F1DataVis.parentSvg.setAttributeNS(null, 'id', F1DataVis.IdStore.parentSvg);

    var mainDiv = document.getElementById('mainDiv'),
        sliderMargin = { left: 100, right: 100, top: 20, bottom: 20 },
        sliderYPos;
    mainDiv.style.height = window.innerHeight - 20 + 'px';
    mainDiv.appendChild(F1DataVis.parentSvg);

    sliderYPos = window.innerHeight - 20 - 100;

    // Year range
    var years = d3.range(1950, 2019), width = window.innerWidth;

    // Create slider.
    var timeSlider = d3
        .sliderBottom()
        .min(d3.min(years))
        .max(d3.max(years))
        .step(1)
        .width(width - sliderMargin.left - sliderMargin.right)
        .tickFormat(d3.format(''))
        .tickValues(d3.range(1950, 2019, 5).concat([d3.max(years)]))
        .default(d3.max(years));

    // Create group for slider and append to main svg
    sliderGroup = d3.select(F1DataVis.parentSvg)
        .append('g')
        .attr('id', F1DataVis.IdStore.sliderParent)
        .attr('transform', 'translate(' + sliderMargin.left + ',' + sliderYPos + ')');

    // Append slider
    sliderGroup.call(timeSlider);

    // Modify the slider styles.
    // Make tick lines invisible.
    d3.select('#' + F1DataVis.IdStore.parentSvg)
        .selectAll('.tick line')
        .attr('opacity', 0);

    // Change font of tick labels.
    d3.select('#' + F1DataVis.IdStore.parentSvg)
        .selectAll('.axis text')
        .attr('font-size', 14)
        .attr('font-family', 'bahnschrift')
        .attr('fill', '#E70000');

    // Change font of pointer label.
    d3.select('#' + F1DataVis.IdStore.parentSvg)
        .selectAll('.parameter-value text')
        .attr('font-size', 20)
        //.attr('font-style', 'italic')
        .attr('font-weight', 'bold')
        .attr('font-family', 'bahnschrift')
        .attr('y', -27)
        .attr('fill', '#E70000');

    // Change slider size.
    d3.select('#' + F1DataVis.IdStore.parentSvg)
        .selectAll('.track')
        .attr('stroke-width', 14)
        .attr('stroke', '#E70000');
    d3.select('#' + F1DataVis.IdStore.parentSvg)
        .selectAll('.track-inset')
        .attr('stroke-width', 7)
        .attr('stroke', '#005AD4');


}();