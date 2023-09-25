let debug				= false;

function log ( msg, ...args ) {
    let datetime			= (new Date()).toISOString();
    console.log(`${datetime} [ src/index. ]  INFO: ${msg}`, ...args );
}

function truncate_list ( arr, length = 4 ) {
    const start				= [].slice.call( arr, 0, length );
    const end				= [].slice.call( arr, -length );

    return start.map(v => repr(v,true)).join(", ") + " \u2026 " + end.map(v => repr(v,true)).join(", ");
}

function list_formatter ( arr, minimal = false ) {
    const name				= arr.constructor.name;

    if ( minimal )
	return `${name}(${arr.length})`;

    let contents;
    if ( arr.length > 8 ) {
	contents			= truncate_list( arr ) ;
    } else {
	contents			= arr.map(v => repr(v,true)).join(", ");
    }

    return `${name} (${arr.length}) [ ${contents} ]`;
}

function map_formatter ( obj, minimal = false ) {
    const name				= obj.constructor.name;

    if ( obj instanceof Boolean )
	return minimal ? `Bool(${obj ? 1 : 0})` : `${name}( ${obj.toString()} )`;
    if ( obj instanceof Number || obj instanceof RegExp )
	return minimal ? `${name}(${obj})` : `${name}( ${obj} )`;
    if ( obj instanceof String )
	return minimal ? `${name}("${obj}")` : `${name}( "${obj}" )`;
    if ( obj instanceof Date )
	return minimal ? `${obj.toISOString()}` : `${name}( ${obj.toISOString()} )`;

    const keys				= Object.keys( obj );

    if ( minimal )
	return `${name}(${keys.length})`;

    keys.sort( (a,b) => a.length - b.length );

    let contents			= keys.slice(0,4).map( k => `${k}: ${repr(obj[k])}` ).join(", ")

    if ( keys.length > 4 ) {
	contents		       +=  ` \u2026 ${keys.length - 4} more properties`;
    }

    return `${name} { ${contents} }`;
}

function function_formatter ( fn, minimal ) {
     // We are not using 'fn.name' because anonymous function will use the variable name and that is
     // confusing when displayed.
    const name				= "function";

    if ( minimal )
	return `${name}(${fn.length} ` + (fn.length === 1 ? "arg)" : "args)");

    const args				= fn.toString().match(/\((.*?)\)/);

    return `${name}(${args ? args[1] : ''}) { \u2026 }`;
}

export function repr ( value, minimal = false ) {
    // Input types
    //
    //   - Map
    //       - Boolean
    //       - Number
    //       - String
    //       - Date
    //       - RegExp
    //       - Function
    //       - Object
    //   - List
    //       - Array
    //       - Int8Array
    //       - Uint8Array
    //       - Uint8ClampedArray
    //       - Int16Array
    //       - Uint16Array
    //       - Int32Array
    //       - Uint32Array
    //       - Float32Array
    //       - Float64Array
    //       - BigInt64Array
    //       - BigUint64Array
    //   - Primitives
    //       - string
    //       - number
    //       - bigint
    //       - boolean
    //       - null
    //       - undefined
    //       - symbol
    //
    if ( typeof value === "object" && value !== null ) {
	if ( value.toRepr ) {
	    debug && log("Using custom 'toRepr' method for constructor: %s", value.constructor.name );
	    return value.toRepr( minimal );
	}

	// value is a List type
	if ( Array.isArray(value) ) {
	    return list_formatter( value, minimal );
	}
	if ( ArrayBuffer.isView( value ) ) {
	    return list_formatter( value, minimal );
	}
	// value is a Map type
	else {
	    return map_formatter( value, minimal );
	}
    }
    if ( typeof value === "function" ) {
	return function_formatter( value, minimal );
    }

    // value is a Primitive type
    return String( value );
}
repr.logging				= () => {
    debug				= true;
}

export default repr;
