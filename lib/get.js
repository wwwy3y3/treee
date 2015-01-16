var Q= require('q');
var FS= require('q-io/fs');
var path= require('path');

function get (path, opts) {
	// opts
	var opts= opts || {};
		opts.nodeName= opts.nodeName || 'name';

	return getTree(path, opts);
}

function preprocessList (opts) {
	return function (children) {
			var newChildren= [];
			//if dotfolder
			
			var regexp= /^[.]/; // if start with dot
			children.forEach(function (child) {
				if(opts&&opts.skipDotDir){
					if(!regexp.test(name(child))){
						newChildren.push(child); // append it
					}
				}else{ // push all children
					newChildren.push(child);  
				}
					 
			})
			return newChildren;
		}
}


function getTree (path, opts) {
	// get node prop
	var node= genNode(path, opts);

	return Q.when(FS.stat(path))
			.then(function (stat) {
				if(stat.isDirectory()){
					
					// dir
					node.type= 'dir';
					return Q.when(FS.list(path))
							.then(preprocessList(opts))
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
	var node= {};
		node[opts.nodeName]= name(path);

	if(opts&&opts.showEmptyChildren)
		node.children= [];

	if(opts&&opts.absolutePath)
		node.path= path;

	return node;
}

module.exports= get;