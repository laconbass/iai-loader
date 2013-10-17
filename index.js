var f = require( 'util' ).format
  , path = require( 'path' )
  , resolve = path.resolve
  , dirname = path.dirname
;

/**
 * Provides the simplest posible API (a function)
 * to perform requires relative to module without
 * knowing dirname when calling the API.
 *
 * @function loader( {string} root )
 *   @returns function load
 *
 * @function load( {string} path )
 *   @param path: the path to be required, relative to `root`
 *   @returns the required module
 */

module.exports = function loader( module ) {
  if( !module || !module.require || !module.filename ){
    throw TypeError( "module given is not a valid module");
  }
  return function load( path ) {
    if( !path ){
      throw Error( f( "Cannot load '%s'", path ) )
    }
    try {
      return module.require( path );
    } catch(err){
      parseError( err );
    }
   // try {
      return require( resolve( dirname(module.filename) , path ) );
    /*} catch(err) {
      parseError( err );
      throw err;
    }*/
  };
}

var notFound = /cannot find module/i

function parseError( err ){
  if( !notFound.test( err.message ) ){
    throw err;
    //throw Error( f( "Cannot load '%s' because %s", path, err.message ) );
  }
}
