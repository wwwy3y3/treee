var treee= require('../');
var jsome= require('jsome');

treee.get(process.cwd()+'/test/folder', { nodeName: 'label', skipDotDir: true, showRelative: true })
	 .done(function (arr) {
	 	jsome(arr);
	 }, function (err) {
	 	console.log(err);
	 })