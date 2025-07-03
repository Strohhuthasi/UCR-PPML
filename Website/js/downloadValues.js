document.getElementById('saveButton').addEventListener('click', function() {
    var rangeInputs = document.querySelectorAll('input[type="range"]');
	var numberInputs = document.querySelectorAll('input[type="number"]');
	var matrixInputs = document.querySelectorAll('input[type="checkbox"]');
    var valuesSliders = {};
	var valuesWeights = {};
	var valuesMatrix = {};

	// Read values of sliders
    rangeInputs.forEach(function(input) {
        valuesSliders[input.id] = parseFloat(input.value);
    });
	
	//Read values of developer weights
	numberInputs.forEach(function(input) {
        valuesWeights[input.id] = input.valueAsNumber;
    });
	
	//Read values of mapping matrix
	matrixInputs.forEach(function(input, index) {
		const key = `checkbox${index + 1}`;
        valuesMatrix[key] = input.checked ? 1 : 0;;
    });
	
	
	var inputData = {valuesSliders, valuesWeights, valuesMatrix};

	//Create JSON file with all values read
    var jsonData = JSON.stringify(inputData);

    // Create JSON-document
    var valuesDocument = new Blob([jsonData], { type: 'application/json' });
    var url = URL.createObjectURL(valuesDocument);

    // Download JSON-document
    var a = document.createElement('a');
    a.href = url;
    a.download = 'inputValues.json';
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
