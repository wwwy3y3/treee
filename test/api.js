var treee= require('../');
var jsome= require('jsome');

treee.get(process.cwd()+'/test/folder')
	 .done(function (arr) {
	 	jsome(arr);
	 }, function (err) {
	 	console.log(err);
	 })