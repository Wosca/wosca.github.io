function generatePassword() {
	var passwordLength = document.getElementById("passwordLength").value;
	var includeUppercase = document.getElementById("includeUppercase").checked;
	var includeLowercase = document.getElementById("includeLowercase").checked;
	var includeNumbers = document.getElementById("includeNumbers").checked;
	var includeSymbols = document.getElementById("includeSymbols").checked;
  
	var uppercaseCharCodes = arrayFromLowToHigh(65, 90);
	var lowercaseCharCodes = arrayFromLowToHigh(97, 122);
	var numberCharCodes = arrayFromLowToHigh(48, 57);
	var symbolCharCodes = arrayFromLowToHigh(33, 47)
	  .concat(arrayFromLowToHigh(58, 64))
	  .concat(arrayFromLowToHigh(91, 96))
	  .concat(arrayFromLowToHigh(123, 126));
  
	var charCodes = [];
	if (includeUppercase) charCodes = charCodes.concat(uppercaseCharCodes);
	if (includeLowercase) charCodes = charCodes.concat(lowercaseCharCodes);
	if (includeNumbers) charCodes = charCodes.concat(numberCharCodes);
	if (includeSymbols) charCodes = charCodes.concat(symbolCharCodes);
  
	var passwordCharacters = [];
	for (var i = 0; i < passwordLength; i++) {
	  var characterCode =
		charCodes[Math.floor(Math.random() * charCodes.length)];
	  passwordCharacters.push(String.fromCharCode(characterCode));
	}
	document.getElementById("password").innerText = passwordCharacters.join("");
  }
  
  function arrayFromLowToHigh(low, high) {
	var array = [];
	for (var i = low; i <= high; i++) {
	  array.push(i);
	}
	return array;
  }
  