function submitSurvey() {
  var questionDivs = document.getElementsByClassName('q');
  var i;
  if (questionDivs.length < 1) {
    alert("Survey can't be empty");
    return
  }
  questions = [];
  for (i = 0; i < questionDivs.length; i++) {
    var questionDiv = questionDivs[i];
    var questionChilds = questionDiv.childNodes;
    var j;
    var questionTitle;
    var tempItems = [];
    var items = [];
    for (j = 0; j < questionChilds.length; j++) {
      var element = questionChilds[j];
      if (element.className == "question") {
        if (element.value != "") {
          questionTitle = element.value;
        }
        else {
          alert("Question can't be empty");
          return
        }
      }
      if (element.className == "choice") {
        if (element.value != "") {
          if (tempItems.includes(element.value) ) {
            alert("Choice shouldn't be repeated");
            return
          }
          else {
            items.push({"context" : element.value});
            tempItems.push(element.value)
          }
        }
      }
    }
    question = {
      "context": questionTitle,
      "items": items
    }
    if (items.length <2) {
      alert("Number of choices shouldn't be less than 2");
      return
    }
    questions.push(question);
  }
  var surveyName = document.getElementById('question_name').value;
  if (surveyName == "") {
    alert("Survey name can't be empty");
    return
  }
  var desc = "Survey Description" //Get desc later when added to page
  var credit = 100;
  var duration = "30";
  var json = {
    'name': surveyName,
    'description': desc,
    'questions': questions,
    'credit' : credit,
    'duration':duration
  };
  console.log(JSON.stringify(json));
  sendRequest(json);
}


function sendRequest(data) {
  var request = new XMLHttpRequest();
  var url = 'http://127.0.0.1:5000/api/getSurvey';
  request.open('POST', url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var resp = JSON.parse(this.response);
      if (resp.status === "OK") {
        alert("Submit Successful")
      } else {
        alert("Unsuccessful");
      }
    }
  }
  request.send(JSON.stringify(data));
}
