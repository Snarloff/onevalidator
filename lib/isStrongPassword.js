/*
Copyright (c) 2021 Snarloff
Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

const upperCaseRegex = /^[A-Z]$/;
const lowerCaseRegex = /^[a-z]$/;
const numberRegex 	 = /^[0-9]$/;
const symbolRegex 	 = /^[-#!$%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]$/;
const emailRegex		 = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * @param {String} _string - A password string
 * @param {Number} _min - A min length for password
 */
function _minLength(_string, _min){
	if (_string.length < _min)
		return false
	return true
}

/**
 * @param {String} _string - A password string
 * @param {Number} _max - A max length for password
 */
function _maxLength(_string, _max){
	if (_string.length > _max) 
		return false
	return true
}

/**
 * @param {String} _letterByLetter - A password in letter-by-letter format
 */
function _analysis(_letterByLetter) {

	let config = {
		symbolCount: 0,
		numberCount: 0,
		upperCaseCount: 0,
		lowerCaseCount: 0
	}

	_letterByLetter.forEach((char) => {

		if (upperCaseRegex.test(char)) {
			config['upperCaseCount'] += 1
		} else if (lowerCaseRegex.test(char)) {
			config['lowerCaseCount'] += 1
		} else if (numberRegex.test(char)) {
			config['numberCount'] += 1
		} else if (symbolRegex.test(char)) {
			config['symbolCount'] += 1
		}

	})

	return config
}

/**
 * @param {String} _string - A password string
 * @param {Object} _data - Settings for strong password
 * @param {Boolean} _raw - Show the complete result, defaults False
 */
function isStrongPassword(_string=String, _data=Object, _raw=false){

	if (!_data || !_string) throw new TypeError('The String or Data parameter is null.')

	const { maxLength=0, minLength=0, symbolCount=0, numberCount=0, upperCaseCount=0, lowerCaseCount=0 } = _data
	const _config = _analysis(_string.trim().split('')) // letter-by-letter format using split

	let result = { points: 0 }; // default object value

	/*
		when the returned value is true, 
		it means that validation passed. 
		when false, did not pass.
	*/

	if (maxLength) { 
		if (_maxLength(_string, maxLength)) {
			_config['maxLength'] = true; result['points'] += 10; 
		} else {
			_config['maxLength'] = false
		}
	} else if (minLength) {
		if (_minLength(_string, minLength)) {
			_config['minLength'] = true; result['points'] += 10;
		}  else { 
			_config['minLength'] = false;
		}
	}

	if (symbolCount != 0 && _config['symbolCount'] >= symbolCount) result['points'] += 10; 
	if (numberCount != 0 && _config['numberCount'] >= numberCount) result['points'] += 10;
	if (upperCaseCount != 0 && _config['upperCaseCount'] >= upperCaseCount) result['points'] += 10;
	if (lowerCaseCount != 0 && _config['lowerCaseCount'] >= upperCaseCount) result['points'] += 10;

	if (!_raw) {
		if ((Object.keys(_data).length * 10) == result['points']) {
			return result['result'] = true;
		}
		return result['result'] = false;
	} else {
		_config['points'] = result['points']
		return _config		
	}
}

module.exports = {
	isStrongPassword
}