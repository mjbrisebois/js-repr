const path				= require('path');
const log				= require('@whi/stdlog')(path.basename( __filename ), {
    level: process.env.LOG_LEVEL || 'fatal',
});

const expect				= require('chai').expect;
const repr				= require('../../src/index.js');

if ( process.env.LOG_LEVEL )
    repr.logging();

function basic_tests () {
    it("should format arrays", async () => {
	{
	    const input			= [0,1,2,3,4,5,6,7,8,9];
	    const str			= repr( input );
	    expect( str			).to.equal("Array (10) [ 0, 1, 2, 3 … 6, 7, 8, 9 ]");
	    const min			= repr( input, true );
	    expect( min			).to.equal("Array(10)");
	}

	{
	    const input			= [0,1,2,3,4,5];
	    const str			= repr( input );
	    expect( str			).to.equal("Array (6) [ 0, 1, 2, 3, 4, 5 ]");
	    const min			= repr( input, true );
	    expect( min			).to.equal("Array(6)");
	}
    });

    it("should format objects", async () => {
	{
	    const input			= { x: 3, y: 4 };
	    const str			= repr( input );
	    expect( str			).to.equal("Object { x: 3, y: 4 }");
	    const min			= repr( input, true );
	    expect( min			).to.equal("Object(2)");
	}

	{
	    const input			= {a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0};
	    const str			= repr( input );
	    expect( str			).to.equal("Object { a: 0, b: 0, c: 0, d: 0 … 6 more properties }");
	    const min			= repr( input, true );
	    expect( min			).to.equal("Object(10)");
	}

	{
	    const input			= new Boolean(1);
	    const str			= repr( input );
	    expect( str			).to.equal("Boolean( true )");
	    const min			= repr( input, true );
	    expect( min			).to.equal("Bool(1)");
	}

	{
	    const input			= new Number(1728127);
	    const str			= repr( input );
	    expect( str			).to.equal("Number( 1728127 )");
	    const min			= repr( input, true );
	    expect( min			).to.equal("Number(1728127)");
	}

	{
	    const input			= new String("Hello world!");
	    const str			= repr( input );
	    expect( str			).to.equal(`String( "Hello world!" )`);
	    const min			= repr( input, true );
	    expect( min			).to.equal(`String("Hello world!")`);
	}

	{
	    const input			= new Date(1646429736851);
	    const str			= repr( input );
	    expect( str			).to.equal("Date( 2022-03-04T21:35:36.851Z )");
	    const min			= repr( input, true );
	    expect( min			).to.equal("2022-03-04T21:35:36.851Z");
	}

	{
	    const input			= new RegExp(".*", "gi");
	    const str			= repr( input );
	    expect( str			).to.equal("RegExp( /.*/gi )");
	    const min			= repr( /.*/gi, true );
	    expect( min			).to.equal("RegExp(/.*/gi)");
	}

	{
	    const input			= function callback( obj ) { return String(obj); };
	    const str			= repr( input );
	    expect( str			).to.equal("function( obj ) { … }");
	    const min			= repr( input, true );
	    expect( min			).to.equal("function(1 arg)");
	}

	{
	    const input			= () => {};
	    const str			= repr( input );
	    expect( str			).to.equal("function() { … }");
	    const min			= repr( input, true );
	    expect( min			).to.equal("function(0 args)");
	}
    });

    it("should format typed arrays", async () => {
	{
	    const input			= new Uint8Array([0,1,2,3,4,5,6,7,8,9]);
	    const str			= repr( input );
	    expect( str			).to.equal("Uint8Array (10) [ 0, 1, 2, 3 … 6, 7, 8, 9 ]");
	    const min			= repr( input, true );
	    expect( min			).to.equal("Uint8Array(10)");
	}

	{
	    const input			= new Float64Array([0.0123456789]);
	    const str			= repr( input );
	    expect( str			).to.equal("Float64Array (1) [ 0.0123456789 ]");
	    const min			= repr( input, true );
	    expect( min			).to.equal("Float64Array(1)");
	}

	{
	    const input			= new BigUint64Array([0n,18446744073709551615n]);
	    const str			= repr( input );
	    expect( str			).to.equal("BigUint64Array (2) [ 0, 18446744073709551615 ]");
	    const min			= repr( input, true );
	    expect( min			).to.equal("BigUint64Array(2)");
	}
    });

    it("should format primitive values", async () => {
	{
	    const input			= "string";
	    const str			= repr( input );
	    expect( str			).to.equal("string");
	    const min			= repr( input, true );
	    expect( min			).to.equal("string");
	}

	{
	    const input			= 12345678;
	    const str			= repr( input );
	    expect( str			).to.equal("12345678");
	    const min			= repr( input, true );
	    expect( min			).to.equal("12345678");
	}

	{
	    const input			= 12345678n;
	    const str			= repr( input );
	    expect( str			).to.equal("12345678");
	    const min			= repr( input, true );
	    expect( min			).to.equal("12345678");
	}

	{
	    const input			= false;
	    const str			= repr( input );
	    expect( str			).to.equal("false");
	    const min			= repr( input, true );
	    expect( min			).to.equal("false");
	}

	{
	    const input			= null;
	    const str			= repr( input );
	    expect( str			).to.equal("null");
	    const min			= repr( input, true );
	    expect( min			).to.equal("null");
	}

	{
	    const input			= undefined;
	    const str			= repr( input );
	    expect( str			).to.equal("undefined");
	    const min			= repr( input, true );
	    expect( min			).to.equal("undefined");
	}

	{
	    const input			= Symbol();
	    const str			= repr( input );
	    expect( str			).to.equal("Symbol()");
	    const min			= repr( input, true );
	    expect( min			).to.equal("Symbol()");
	}
    });

    it("should format with minimal", async () => {
	{
	    const input			= [ [], {}, new Boolean(1), new Number(1), new String("hi"), new Date(1646429736851), RegExp(/.*/gi), () => {} ];
	    const str			= repr( input );
	    expect( str			).to.equal(`Array (8) [ Array(0), Object(0), Bool(1), Number(1), String("hi"), 2022-03-04T21:35:36.851Z, RegExp(/.*/gi), function(0 args) ]`);
	    const min			= repr( input, true );
	    expect( min			).to.equal("Array(8)");
	}

	{
	    const input			= [ 0, 1, 2, 3, 4, 5, 6, 7, 8, new Uint8Array() ];
	    const str			= repr( input );
	    expect( str			).to.equal("Array (10) [ 0, 1, 2, 3 … 6, 7, 8, Uint8Array(0) ]");
	    const min			= repr( input, true );
	    expect( min			).to.equal("Array(10)");
	}
    });
}

describe("Debug", () => {

    describe("Basic", basic_tests );

});
