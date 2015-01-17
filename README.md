## treee
walk through file system and output a tree

## install
``` javascript
npm install treee
```

## api
### treee.get(dirpath, options)
#### parameters
*	dirpath {Stirng}: the dir you want to get file system tree from
*	options {Object}: options including:
	*	`nodeName` {String}, default:`name` : the key you want to get file node name from
	*	`skipDotDir` {Boolean}, default:false : ignore dot prefix dir or not (e.g, `.gitignore`)
	*	`showEmptyChildren` {Boolean}, default:false : show empty children array even if the node doesn't contain any children
	*	`showRelative` {Boolean}, default:false : add a `path` attribute to every node, showing the relative path from the `dirpath` 
	*	`absolutePath` {Boolean}, default:false : show absolute path in every node

## examples
``` javascript
var treee= require('treee');
treee.get(<dirpath>, { nodeName: 'label' })
	 .then(function(tree){
	 	// do whatever you want to the tree
	 	/* tree=
			{	
			    label: "folder",
			    type: "dir",
			    children: [
			        {
			            label: "test1",
			            type: "file"
			        },
			        {
			            label: "test2",
			            type: "file",
			        }
			    ]
			}
	 	*/
	 })
```