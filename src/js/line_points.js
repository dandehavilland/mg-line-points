/**
  Add a node to the line at each data point.

  Options:

    `line_points`:              (true) | false              # Enable this plugin?
    `line_point_size`:          (args.point_size) | number  # Point radius
    `line_point_size_for_zero`: (0) | number                # Point radius for zero values

*/

MG.add_hook('global.defaults', function(args) {
  // enable mg-line-points unless it's explicitly disabled
  args.line_points              = args.line_points !== false;

  args.line_point_size          = args.line_point_size || args.point_size;

  args.line_point_size_for_zero = 0;
});

function addNodesToLines(data, existingLine, args) {
  var svg = d3.select(args.target)
              .select('svg');

  var container = svg.select('g.mg-line' + data.line_id + '-points');
  if (container.empty()) {
    container = svg.append('g')
                  .classed('mg-line-points', true)
                  .classed('mg-line' + data.line_id + '-points', true);
  }

  container.moveToFront();

  var pointsJoin = container.selectAll('circle.mg-line-point')
                    .data(data);

  var yMedian = d3.median(data, function(d) { return d[args.y_accessor]; });

  var updateTransitionDuration = (args.transition_on_update) ? 1000 : 0;

  var points = pointsJoin.enter()
                .append('circle')
                  .classed('mg-line-point', true)
                  .classed('mg-line' + data.line_id + '-color', true)
                  .classed('mg-area' + data.line_id + '-color', true)
                  .attr({
                    cx: args.scalefns.xf,
                    r: calculatePointRadius,
                    opacity: 0
                  });

  // initial load
  if (existingLine.empty()) {
    if (args.animate_on_load) {
      points
        .attr({
          cy: function() { return args.scales.Y(yMedian); }
        })
        .transition().duration(1000)
          .attr({
            cy: args.scalefns.yf,
            opacity: 1
          });

    } else {
      points.attr({
        cy: args.scalefns.yf,
        opacity: 1
      });
    }
  }

  // subsequent updates
  else {
    pointsJoin
      .transition().duration(updateTransitionDuration)
      .attr({
        cy: args.scalefns.yf,
        cx: args.scalefns.xf,
        opacity: 1,
        r: calculatePointRadius
      });

    pointsJoin.exit()
      .transition().duration(updateTransitionDuration / 2)
      .attr('opacity', 0)
      .remove();
  }


  function calculatePointRadius(d) {
    if (d[args.y_accessor] === 0) {
      return args.line_point_size_for_zero;
    } else {
      return args.line_point_size;
    }
  }
}

MG.add_hook('line.after_each_series', addNodesToLines);
