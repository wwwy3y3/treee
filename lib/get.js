var Q= require('q');
var FS= require('q-io/fs');
var path= require('path');


function getTree (path) {
	var node= { name: name(path), path: path, children: [] };
	return Q.when(FS.stat(node.path))
			.then(function (stat) {
				if(stat.isDirectory()){
					// dir
					return Q.when(FS.list(node.path))
							.then(function (children) {
								var dependents= children.map(function (child) {
									var childPath = path+'/'+child;
									return getTree(childPath);
								})
								return Q.all(dependents).then(function (nodes) {
									node.children= nodes;
									return node;
								})
							})
				}else{
					// file
					return node;
				}
			});
}


function name (basePath) {
	var arr= basePath.split('/');
	return arr[arr.length-1];
}

module.exports= getTree;