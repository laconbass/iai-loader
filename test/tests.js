var assert = require( "chai" ).assert
  , loader = require( "../" )
;

describe( "function #loader", function() {
    it( "should return a function when called passing a module", function(){
        assert.isFunction( loader( module ) );
    })
    it( "should throw an error when called passing any other thing", function(){
      for( var name in cases ){
        assert.throws(function(){
          loader( name );
        }, TypeError, /.*/, name)
      }
    })
})

describe( "function #łoad", function(){
  it( "should require modules from the node_modules path", function(){
    var load = loader( module );
    assert.deepEqual( load( "chai" ), require("chai") );
    assert.deepEqual( load( "mocha" ), require("mocha") );
  })
  it( "should require modules relative to module's path", function(){
    var load = loader( module );
    assert.deepEqual( load( "tests" ), cases );
  })
  it( "should throw an error if the module does not exist", function(){
    var load = loader( module );
    assert.throws(function(){
      load( "something-that-does-not-exist" );
    }, Error, /cannot find module/i )
  })
  it( "should throw any error thrown while requiring", function(){
    var load = loader( module );
    assert.throws(function(){
      load( "syntax-error" );
    }, SyntaxError )
  })
})

var cases = module.exports = {
  "integer literal string zero": "0",
  "integer literal string negative": "-10",
  "integer literal string positive": "5",
  "integer literal decimal zero": 0,
  "integer literal decimal negative": -16,
  "integer literal decimal positive": 32,
  "integer literal octal string": "040",
  "integer literal octal number": 0144,
  "integer literal hexadecimal string": "0xFF",
  "integer literal hexadecimal number": 0xFFF,
  "floating-point literal with point string negative": "-1.6",
  "floating-point literal with point string positive": "4.536",
  "floating-point literal with comma string negative": "-4,536",
  "floating-point literal with comma string positive": "4,536",
  "floating-point literal number negative": -2.6,
  "floating-point literal number positive": 3.1415,
  "floating-point literal exponential notation": 8e5,
  "floating-point literal exponential notation string": "123e-2",
  "string literal empty": "",
  "string literal whitespaces": "        ",
  "string literal tabs": "\t\t",
  "string literal alphanumeric": "abcdefghijklm1234567890",
  "string literal non-numeric": "xabcdefx",
  "string literal number with preceding non-numeric characters": "bcfed5.2",
  "string literal number with trailling non-numeric characters": "7.2acdgs",
  "boolean literal true": true,
  "boolean literal false": false,
  "infinity primitive": Infinity,
  "infinity positive": Number.POSITIVE_INFINITY,
  "infinity negative": Number.NEGATIVE_INFINITY,
  "undefined value": undefined,
  "undefined real": Object.this_var_does_not_exist,
  "null": null,
  "NaN": NaN,
  "array object": [ 1, 2, 3, 4 ],
  "date object": new Date(2009,1,1),
  "empty object": new Object(),
  "anonymousf function": function(){},
  "named function": function thisIsMyName(){}
};


