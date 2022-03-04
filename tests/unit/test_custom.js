const path				= require('path');
const log				= require('@whi/stdlog')(path.basename( __filename ), {
    level: process.env.LOG_LEVEL || 'fatal',
});

const expect				= require('chai').expect;
const repr				= require('../../src/index.js');

if ( process.env.LOG_LEVEL )
    repr.logging();


class Rectangle {
    constructor ( x, y ) {
	this.x				= x;
	this.y				= y;
    }

    toRepr ( minimal ) {
	return minimal
	    ? `${this.constructor.name}(${this.x},${this.y})`
	    : `${this.constructor.name} { x: ${this.x}, y: ${this.y} }`;
    }
}


function basic_tests () {
    it("should use toString", async () => {
	{
	    let value			= new Rectangle( 3, 4 );
	    let str			= repr( value );

	    expect( str			).to.equal(`Rectangle { x: 3, y: 4 }`);
	}

	{
	    let value			= new Rectangle( 3, 4 );
	    let str			= repr( value, true );

	    expect( str			).to.equal(`Rectangle(3,4)`);
	}
    });
}

describe("Debug", () => {

    describe("Basic", basic_tests );

});
