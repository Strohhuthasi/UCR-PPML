// Function to load the JSON-file and adjust the input values
function loadJSON(file, callback) {
    var reader = new FileReader();
    reader.onload = function() {
         try {
            var data = JSON.parse(reader.result);
            callback(data);
        } catch (e) {
            console.error('Invalid JSON file');
        }
    }
    reader.readAsText(file);
}

//Function to read the nested values from the JSON file
 function iterateObject(obj) {
	 var checkboxCounter = 0
        Object.keys(obj).forEach(function(key) {
            const fullKey = key;
            
            // Check if the value is an object
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                // Recursive call for nested objects
                iterateObject(obj[key]);
            } else {
                
                const input = document.getElementById(fullKey);
				
				checkboxes = document.querySelectorAll('input[type="checkbox"]');
				
				//Check the input type of the current object
                if (!input) {
					//Input type is checkbox (mapping input)
					if (typeof obj[key] === 'number') {
						checkboxes[checkboxCounter].checked = obj[key];
						checkboxCounter = checkboxCounter +1;
					} else {
						//Wrong file content
						showError("The uploaded file contained unexpected content that could not be processed. Please check the import again and upload a different file");
						return;
					}
				} else {
					if (input && input.type === 'range') {
						//Input type is slider (user input)
						input.value = obj[key];
						updateValue(input, (input.nextElementSibling).nextElementSibling);
						//handleSliderInput;
					} else if (input && input.type === 'number') {
						//Input type is number (developer input)
						input.value = obj[key];
					}  else {
						//Wrong file content
						showError("The uploaded file contained unexpected content that could not be processed. Please check the import again and upload a different file");
						return;
					}
				}
            }
        });
		checkSums();
    }

// Event-listener for the JSON-file upload 
document.getElementById('uploadButton').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (!file) return;
	
	//Check that uploaded file is JSON
	if(file.type === 'application/json') {
		loadJSON(file, iterateObject);
		document.getElementById('uploadButton').value = '';
	} else {
		//Show error that wrong file was uploaded
		showError("The file uploaded does not have the right format. Please upload a JSON-file.");
	}
	
});