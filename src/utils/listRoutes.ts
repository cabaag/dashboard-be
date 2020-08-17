function listRoutes(app) {
	app._router.stack.forEach(printRoutes.bind(this, []));
}

function printRoutes(path, layer) {
	if (layer.route) {
		layer.route.stack.forEach(
			printRoutes.bind(this, path.concat(splitRoutes(layer.route.path)))
		);
	} else if (layer.name === 'router' && layer.handle.stack) {
		layer.handle.stack.forEach(
			printRoutes.bind(this, path.concat(splitRoutes(layer.regexp)))
		);
	} else if (layer.method) {
		console.log(
			'	%s		|	/%s',
			layer.method.toUpperCase(),
			path
				.concat(splitRoutes(layer.regexp))
				.filter(Boolean)
				.join('/')
		);
	}
}

function splitRoutes(thing) {
	if (typeof thing === 'string') {
		return thing.split('/');
	} else if (thing.fast_slash) {
		return '';
	} else {
		let match = thing
			.toString()
			.replace('\\/?', '')
			.replace('(?=\\/|$)', '$')
			.match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
		return match
			? match[1].replace(/\\(.)/g, '$1').split('/')
			: '<complex:' + thing.toString() + '>';
	}
}

export { listRoutes };
