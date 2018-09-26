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
      .range([padding, w - padding]);

    const yScale = d3
      .scaleTime()
      .domain([new Date(0, 0, 1), new Date(0, 11, 31)])
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
    console.log(
      yScale(new Date(0, 1 - 1)),
      yScale(new Date(0, 2 - 1)),
      yScale(new Date(0, 3 - 1))
    );
    svg
      .selectAll('rect')
      .data(data.monthlyVariance)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.year))
      .attr('y', d => yScale(new Date(0, d.month - 1)))
      .attr('width', (w - 2 * padding) / (yearMax - yearMin))
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
      .attr('id', 'x-axis');

    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%B'));

    svg
      .append('g')
      .attr('transform', `translate(${padding},0)`)
      .call(yAxis)
      .attr('id', 'y-axis')
      .selectAll('.tick text')
      .style('text-anchor', 'end')
      .attr('y', 17);
  });
});
