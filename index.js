var f = require( 'util' ).format
  , npath = require( 'path' )
  , resolve = npath.resolve
  , dirname = npath.dirname
  , basename = npath.basename
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
      throw Error( "Cannot load '"+path+"'" )
    }
    try {
      return module.require( path );
    } catch(err){
      parseError( err );
    }
    try {
      return require( resolve( dirname(module.filename), path ) );
    } catch(err) {
      parseError( err );
    }
    if( !~path.indexOf( "/" ) ){
      try {
        return require( "iai-"+path )
      } catch(err) {
        parseError( err );
      }
    }
    throw Error( "Cannot load '"+ path +"' because cannot find module" );
  }
}

var notFound = /cannot find module/i;

function parseError( err ){
  if( !notFound.test( err.message ) ){
    //throw err;
    throw Error( "Error while loading: "+err.message );
  }
}
