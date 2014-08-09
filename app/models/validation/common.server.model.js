'use strict';

//common private utility functions
function stripObj(prop) {
	if (typeof prop === 'object') {
		return prop[0];
	} else {
		return prop;
	}
}


//main module function
function Validation() {
//dummy function to hold the various validations
//and any common requirements if they emerge
}

// common validation greater than 0 length
Validation.prototype.nonZeroLength = function(property) {
	 
	var minLength = 4;

	// console.log(JSON.stringify(property));
	// console.log(typeof property);
	// console.log('validation for "%s" is : %s',property, property && property.length > minLength-1);
	var nullCheck = (property === null) ? true : false;
	// console.log('validation for nullCheck on %s',nullCheck);	
	// if it's null bomb back now
	if (nullCheck) {return false;}

	//check for enum values and reset to value
	var strProperty = stripObj(property);
	var lengthCheck = strProperty.length > minLength-1;
	// console.log('validation for lengthCheck on "%s" is %s against %s, so %s',strProperty, strProperty.length, minLength, strProperty.length > minLength-1);
	// console.log('validation return is %s',nullCheck && lengthCheck);
	return (lengthCheck);
};

module.exports = Validation;