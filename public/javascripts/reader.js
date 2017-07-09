//Reads CSV and Parses contents into JSON for submission to the server.

window.onload = function() {
  var fileInput = document.getElementById('fileInput');
  var fileDisplayArea = document.getElementById('fileDisplayArea');

  fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var textType = /csv.*/;

    if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        csvString = reader.result;
        //console.log(csvString);
        parsedCsvString = Papa.parse(csvString, {header: true});
        console.log(parsedCsvString);
        let blogPostsArray = JSON.stringify(parsedCsvString.data);
        fileDisplayArea.value = blogPostsArray;
      }
      reader.readAsText(file);  
    } else {
      fileDisplayArea.innerText = "File not supported!"
    }
  });
}
