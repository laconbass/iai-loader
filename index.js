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
    // try requiring...
    var result;
    if( !~path.indexOf("/") ) {
      result = tryRequire( path );
    }
    if( !result ) {
      result = tryRequire( resolve( dirname(module.filename), path ) );
    }
    if( !result && !~path.indexOf("/") ) {
      result = tryRequire( "iai-"+path );
    }
    // parse result
    if( !result ) {
      throw Error( "Cannot load '"+ path +"' because cannot find module" )
    }
    return result;
  }
}

function tryRequire( mod_name ){
  try {
    return require( mod_name );
  } catch(err) {
    if( err.message != "Cannot find module '"+mod_name+"'" ){
      throw err;
      throw Error( "Error while loading: " + err );
    }
  }
}
