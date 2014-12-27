var Q= require('q');
var FS= require('q-io/fs');
var path= require('path');


function getTree (path, opts) {
	var opts= opts || {};
	var node= genNode(path, opts);
	return Q.when(FS.stat(path))
			.then(function (stat) {
				if(stat.isDirectory()){
					// dir
					node.type= 'dir';
					return Q.when(FS.list(path))
							.then(function (children) {
								var dependents= children.map(function (child) {
									var childPath = path+'/'+child;
									return getTree(childPath, opts);
								})
								return Q.all(dependents).then(function (nodes) {
									if(!opts.showEmptyChildren && nodes.length>0)
										node.children= nodes;
									return node;
								})
							})
				}else{
					// file
					node.type='file';
					return node;
				}
			});
}


function name (basePath) {
	var arr= basePath.split('/');
	return arr[arr.length-1];
}

function genNode (path, opts) {
	var node= { name: name(path) }

	if(opts&&opts.showEmptyChildren)
		node.children= [];

	if(opts&&opts.absolutePath)
		node.path= path;

	return node;
}

module.exports= getTree;