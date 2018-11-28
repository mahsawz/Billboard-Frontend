var survey_id = sessionStorage.getItem("survey_id");
var request = new XMLHttpRequest();
var url = 'http://127.0.0.1:5000/api/fillSurvey/'+1;
request.open('GET', url, true);
var qDiv = document.getElementById('questions');
request.onload = function(e) {
  var data = JSON.parse(this.response);
  console.log(data);
  document.getElementById('question-title').innerHTML = "" + data.title;
  document.getElementById('question-description').innerHTML = "" + data.description;
  var questions = data.questions;
  var i;
  for (i=0;i<questions.length;i++) {
    var q_object = questions[i];
    // Question Title Part
    var questionDiv = document.createElement('div');
    questionDiv.setAttribute('class','question');
    var rowDiv = document.createElement('div');
    rowDiv.setAttribute('class','w3-row');
    var questionContainer = document.createElement('div');
    questionContainer.setAttribute('class','w3-col');
    questionContainer.setAttribute('dir','rtl');
    var questionText = document.createElement('h3');
    questionText.setAttribute('style','color: #122b40');
    questionText.innerHTML = (i+1) + "."+ " " + q_object.context;
    questionContainer.appendChild(questionText);
    rowDiv.appendChild(questionContainer);
    questionDiv.appendChild(rowDiv);
    //Question choices
    var q_items = q_object.items;
    var j;
    var flexContainer = document.createElement('div');
    flexContainer.setAttribute('class','w3-row flex-container2');
    flexContainer.setAttribute('dir','rtl');
    for (j=0;j<q_items.length;j++) {
      var item = q_items[j];
      var itemDiv = document.createElement('div');
      itemDiv.setAttribute('class','w3-col m3');
      var inputElement = document.createElement('input');
      inputElement.setAttribute('class','w3-radio');
      inputElement.setAttribute('name',q_object.id);
      inputElement.setAttribute('type','radio');
      var labelElement = document.createElement('label');
      labelElement.innerHTML = item.context;
      itemDiv.appendChild(inputElement);
      itemDiv.appendChild(labelElement);
      if (j==0) {
        inputElement.checked = true;
      }
      if (j%4 == 0) {
        questionDiv.appendChild(flexContainer);
        var newContainer = document.createElement('div');
        newContainer.setAttribute('class','w3-row flex-container2');
        newContainer.setAttribute('dir','rtl');
        flexContainer = newContainer;
      }
      flexContainer.appendChild(itemDiv);
      if (j==q_items.length-1){
        console.log("Mola");
        questionDiv.appendChild(flexContainer);
      }
    }
    document.getElementById('questions').appendChild(questionDiv);
  }
}
request.send();
