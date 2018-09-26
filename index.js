document.addEventListener('DOMContentLoaded', () => {
  d3.json(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
  ).then(data => {
    const colorDomain = d3.extent(data.monthlyVariance, d => d.variance);

    const colorScale = d3
      .scaleLinear()
      .domain(colorDomain)
      .range(['blue', 'red']);

    const colorScale2 = d3
      .scaleLinear()
      .domain([2.8, 3.9, 5, 6.1, 7.2, 8.3, 9.4, 10.6, 11.7, 12.8].reverse())
      .range(d3.schemeRdYlBu[11]);

    const w = 1600;
    const h = 600;
    const padding = 40;

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

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
      .attr('x', d => (d.year - 1753) * 5)
      .attr('y', d => d.month * 40)
      .attr('width', 5)
      .attr('height', 40)
      .style('fill', d => colorScale2(d.variance + 8.66))
      .append('title')
      .text(
        d =>
          `${d.year} - ${monthNames[d.month - 1]}\n${(
            d.variance + 8.66
          ).toFixed(1)}°C\n${d.variance.toFixed(1)}°C`
      );
  });
});
