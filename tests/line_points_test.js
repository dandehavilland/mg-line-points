/* global MG */

module('line points');

test('adds a node to the line chart for each data point in the series', function() {
  var args = {
    chart_type: 'line',
    target: '#qunit-fixture',
    title: 'This is a test',
    data: [{
      x: 1,
      y: 1
    },{
      x: 2,
      y: 2
    },{
      x: 3,
      y: 3
    }],
    x_accessor: 'x',
    y_accessor: 'y'
  };

  MG.data_graphic(args);

  equal(document.querySelectorAll('#qunit-fixture svg g.mg-line-points circle.mg-line-point').length, 3, 'Correct number of points added');
});
