
module.exports.index = function ( req, res ) {

   var p = require( "path" );
   var fs = require( "../scripts/utils/fs/file_access.js" );
   var path = p.join( __dirname, '../public/index.html' );
   var data = fs.getFileUTF8( path );
   res.send( data );
}




