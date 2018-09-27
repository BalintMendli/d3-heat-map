document.addEventListener('DOMContentLoaded', () => {
  d3.json(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
  ).then(data => {
    const colorScale = d3
      .scaleLinear()
      .domain([2.8, 3.9, 5, 6.1, 7.2, 8.3, 9.4, 10.6, 11.7, 12.8].reverse())
      .range(d3.schemeRdYlBu[11]);

    const w = 1600;
    const h = 600;
    const padding = 60;

    const yearMin = d3.min(data.monthlyVariance, d => d.year);
    const yearMax = d3.max(data.monthlyVariance, d => d.year);

    const xScale = d3
      .scaleLinear()
      .domain([yearMin, yearMax])
      .range([2 * padding, w - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 12])
      .range([padding, h - 2 * padding]);

    d3.select('#container')
      .append('h1')
      .text('Monthly Global Land-Surface Temperature')
      .attr('id', 'title');
    d3.select('#container')
      .append('h2')
      .text('1753 - 2015: base temperature 8.66℃')
      .attr('id', 'sub-title');

    const svg = d3
      .select('#container')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg
      .selectAll('rect')
      .data(data.monthlyVariance)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.year))
      .attr('y', d => yScale(d.month - 1))
      .attr('width', (w - 3 * padding) / (yearMax - yearMin))
      .attr('height', (h - 3 * padding) / 12)
      .style('fill', d => colorScale(d.variance + 8.66))
      .append('title')
      .text(
        d =>
          `${d.year} - ${d3.timeFormat('%B')(new Date(0, d.month - 1))}\n${(
            d.variance + 8.66
          ).toFixed(1)}°C\n${d.variance.toFixed(1)}°C`
      );

    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat(d3.format('.4r'))
      .ticks(25);

    svg
      .append('g')
      .attr('transform', `translate(0, ${h - 2 * padding})`)
      .call(xAxis)
      .attr('id', 'x-axis')
      .append('text')
      .text('Years')
      .style('text-anchor', 'middle')
      .attr('transform', `translate(${(w + padding) / 2},40)`)
      .attr('fill', 'black')
      .attr('font-size', '16px');

    const yAxis = d3
      .axisLeft(yScale)
      .tickValues([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
      .tickFormat(d => d3.timeFormat('%B')(new Date(0, d)));

    const yAxisGroup = svg
      .append('g')
      .attr('transform', `translate(${2 * padding},0)`)
      .call(yAxis)
      .attr('id', 'y-axis');

    yAxisGroup
      .append('text')
      .text('Months')
      .style('text-anchor', 'middle')
      .attr('transform', `translate(-55,${(h - padding) / 2}) rotate(-90)`)
      .attr('fill', 'black')
      .attr('font-size', '16px');

    yAxisGroup
      .selectAll('.tick text')
      .style('text-anchor', 'end')
      .attr('y', 17);
  });
});
