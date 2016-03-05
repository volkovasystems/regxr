/*:
	@module-license:
		The MIT License (MIT)

		Copyright (c) 2015 Richeve Siodina Bebedor

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"packageName": "regxr",
			"path": "regxr/regxr.js",
			"fileName": "regxr.js",
			"moduleName": "regxr",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/regxr.git"
		}
	@end-module-configuration

	@module-documentation:
	@end-module-documentation

	@include:
	@end-include
*/

if( !( typeof window != "undefined" &&
	"harden" in window ) )
{
	var harden = require( "harden" );
}

if( typeof window != "undefined" && 
	!( "harden" in window ) )
{
	throw new Error( "harden is not defined" ); 
}

var regxr = function regxr( expression, options ){
	var parameters = Array.from( arguments );

	var expressions = parameters.filter( function onEachParameter( parameter ){
		return parameter instanceof RegExp;
	} );

	if( arguments.length != expressions.length ){
		options = parameters.reverse( )[ 0 ];
	
	}else{
		options = "";
	}

	expression = expressions.map( function onEachExpression( expression ){
		return expression.source;
	} ).join( "" );

	return new RegExp( expression, options );
};

if( typeof module != "undefined" ){ 
	module.exports = regxr; 
}

if( typeof global != "undefined" ){
	harden
		.bind( regxr )( "globalize", 
			function globalize( ){
				harden.bind( global )( "regxr", regxr );
			} );
}