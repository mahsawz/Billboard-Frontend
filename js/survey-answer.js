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
    document.getElementById('questions').appendChild(questionDiv);
  }
}
request.send();
