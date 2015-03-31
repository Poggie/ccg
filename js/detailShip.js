var Path = require('./path');
var gs = require('./globalStyles');
var mfgDB = require('./db/mfg.json');

var DetailShip = React.createClass({
	getInitialState: function () {
		return { 
			showAll: false,
			hover: false
		};
	},
	render: function () {
		var paths = this.props.paths.paths;
		var pathsCount = paths.length;
		var shipInfo = db[this.props.id];

		var pathNodes = _.map(paths, function (path, index) {
			var key = this.props.selected + '_' + this.props.id + index; // generate unique and descriptive key
			return (
				<Path 
					key={key} 
					parentID={this.props.id} 
					data={path} 
					selected={this.props.selected}
					showAtStart={pathsCount == 1}
					showAll={this.state.showAll} 
				/>
			);
		}, this);

		var baseStyle = _.extend({}, {
			position: 'relative',
			width: 1020,
			border: 'thin solid rgb(32, 76, 122)',
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			marginBottom: '2em'
		});

		var headerStyle = _.extend({}, gs.linebg, {
			width: '100%',
			backgroundColor: 'rgba(30, 60, 100, 0.3)',
			padding: '1em',
			margin: '0',
			cursor: 'pointer'
		});

		var mfgStyle = {
			display: 'inline-block',
			fontWeight: 'normal',
			opacity: '0.7'
		};

		var h2Style = {
			display: 'inline-block',
			marginRight: '0.5em'
		};

		var multiplePathsStyle = {
			float: 'right'
		}

		var h4Style = {
			display: 'inline-block',
			fontWeight: 'normal',
			marginRight: '0.5em'
		};

		var expanderStyle = {
			fontSize: '0.8em',
			opacity: this.state.hover ? '1' : '0.7',
			color: this.state.hover ? 'rgb(111, 216, 255)' : 'white',
			textDecoration: this.state.hover ? 'underline' : 'none',
		};

		var limitedTagStyle = _.extend({}, gs.boxRed, {
			color: '#b00',
			padding: '0.25em 0.5em',
			margin: '0.5em 1em',
			verticalAlign: 'baseline'
		});

		var multiplePaths = pathsCount > 1 ?
			<div className="multiplePaths" style={multiplePathsStyle}>
				<h4 className="optimalPathCount" style={h4Style}>
					{pathsCount} optimal paths
				</h4>
			</div>
			: false;

		var limitedTag = shipInfo.limited ?
			<span style={limitedTagStyle}>
				Not currently for sale
			</span>
			: false;


		return (
			<div className="detailShip" style={baseStyle}>
				<div style={headerStyle} onClick={pathsCount > 1 ? this.showAll : false} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
					<h2 style={h2Style}>
						{db[this.props.id].display}
					</h2>
					<h4 style={mfgStyle}>
						{mfgDB[db[this.props.id].mfg].name}
					</h4>
					{limitedTag}
					{multiplePaths}
				</div>
				{pathNodes}
			</div>
		);
	},
	mouseOver: function () {
		this.setState({ hover: true });
	},
	mouseOut: function () {
		this.setState({ hover: false });
	},
	showAll: function () {
		this.setState({
			showAll: this.state.showAll + 1 // use incremental so that children can check to see if the incoming props are different than current
		})
	}
});

module.exports = DetailShip;