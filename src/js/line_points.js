/**
  Add a node to the line at each data point.
*/

MG.add_hook('global.defaults', function(args) {
  // enable mg-line-points unless it's explicitly disabled
  args.line_points = args.line_points !== false;
  args.line_point_size = args.line_point_size || args.point_size;
});

function addNodesToLines(data, args) {
  var svg = d3.select(args.target)
              .select('svg');

  var container = svg.selectAll('g.mg-line' + data.line_id + '-points')
                    .data([0]).enter()
                    .append('g')
                      .classed('mg-line-points', true)
                      .classed('mg-line' + data.line_id + '-points', true);

  var pointsJoin = container.selectAll('circle.mg-line-point')
                    .data(data);

  var yMedian = d3.median(data, function(d) { return d[args.y_accessor]; });

  var updateTransitionDuration = (args.transition_on_update) ? 1000 : 0;

  pointsJoin.exit().remove();

  var points = pointsJoin.enter()
    .append('circle')
      .classed('mg-line-point', true)
      .classed('mg-line' + data.line_id + '-color', true)
      .classed('mg-area' + data.line_id + '-color', true)
      .attr('r', args.line_point_size);

  points.attr({
    cx: args.scalefns.xf,
    cy: function() {
      return args.scales.Y(yMedian); },
    r: args.line_point_size,
    opacity: 0
  });

  points
    .transition().duration(updateTransitionDuration)
    .attr({
      cy: args.scalefns.yf,
      opacity: 1
    });
}

MG.add_hook('line.after_each_series', addNodesToLines);
