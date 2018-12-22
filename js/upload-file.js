//Function to take file uploaded to the form and cache the contents to the browser
//so that it can be saved fror future use
function upload() {
    //Get the first file uploaded
    var file = document.getElementById('file').files[0];
    //Check if the file exists
    if (file) {
        if (getoutput(file) == "json") {
            //Create a reader to read the file
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                //Save the file to localStorage
                localStorage.setItem('json', evt.target.result);
                //Send the user back to the Moodslider page
                document.location.href = "index.html";
            }
            reader.onerror = function (evt) {
                //Alert the user if there was an error reading the file
                alert("error reading file");
            }
        } else {
            alert("Please upload a JSON file");
        }
    } else {
        //Alert the user if they have not selected a file
        alert("No file selected")
    }
}

function getoutput(inputfile) {
    return inputfile.type.split('/')[1];
}