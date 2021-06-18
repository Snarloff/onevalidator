### onevalidator.js

## OneValidator

**The simplest way to validate your forms for Express, Connect or others applications!**

**Let's start!**

Install the package:

``npm i --save onevalidator``

Import:

```js
const { isStrongPassword } = require('onevalidator')
```
Let's validate!

```js
let password = 'HelloWorld123' // you can validate anothers strings too!

console.log(isStrongPassword(password, {
	symbolCount: 1,
	numberCount: 2,
	maxLength: 11,
	upperCaseCount: 2
}, false))
```

Config your validation:

 - maxLength
 - minLength
 - symbolCount
 - numberCount
 - upperCaseCount
 - lowerCaseCount

|  Functions|  Description|
|--|--|
|  isStrongPassword(str, {config}, raw)| **str** password, for example, **config** are the options above, **raw** if you want to return all password information. Defaults false.

When **raw** is True:


![When raw is True](https://i.imgur.com/hCsQxas.png)

When the returned value is **True**, it means that validation passed. When **false**, did not pass.