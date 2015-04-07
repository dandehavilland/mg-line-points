# mg-line-points
Add a node to a line for each point in the series.

**Note:** the addon system is still under heavy development. This project will currently only work with [my pending PR](https://github.com/mozilla/metrics-graphics/pull/351) for metrics-graphics.

### Usage

Install using bower (not yet published):

- `bower install dandehavilland/mg-line-points --save`

Include `dist/mg_line_points.js` in your build, or include it in your HTML:

- `<script src="bower_components/mg-line-points/dist/mg_line-points.js"></script>`

### Options

| Option | Default | Notes |
|--------|---------|-------|
| `line_points` | `true` | Enable this addon. |
| `line_point_size` | args.point_size | Point radius. |
| `line_point_size_for_zero` | 0 | Point radius for zero values. |


### Testing

- `gulp test` to run the Test'em server in continuous mode.
- `npm test` or `gulp test-ci` for a single run, CI mode.


### Requirements

- [Node.JS](http://nodejs.org/)
- [bower](http://bower.io) or [io.js](https://iojs.org/)
- [metrics-graphics](http://metricsgraphicsjs.org/)

### Contributing

Found a bug or have an idea for a new feature? File an issue or, better still, submit a PR :

1. Code your fix / feature.
2. Test it.
3. Submit a PR.
