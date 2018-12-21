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
        } else {
          alert("Question can't be empty");
          return
        }
      }
      if (element.className == "choice") {
        if (element.value != "") {
          if (tempItems.includes(element.value)) {
            alert("Choice shouldn't be repeated");
            return
          } else {
            items.push({
              "context": element.value
            });
            tempItems.push(element.value)
          }
        }
      }
    }
    question = {
      "context": questionTitle,
      "items": items
    }
    if (items.length < 2) {
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
  var desc = document.getElementById('survey-description').value;
  var credit;
  var duration = document.getElementById('survey-duration').value;
  var options = document.getElementsByTagName('option');
  var i;
  for (i = 1; i < options.length; i++) {
    var option = options[i];
    if (option.selected == true && option.value == "null") {
      alert("You should select a credit");
      return;
    }
    if (option.selected == true) {
      credit = option.value;
    }
  }
  var json = {
    'name': surveyName,
    'description': desc,
    'questions': questions,
    'credit': credit,
    'duration': duration
  };
  console.log(JSON.stringify(json));
  sendRequest(json);
}


function sendRequest(data) {
  var request = new XMLHttpRequest();
  var url = 'http://192.168.1.4:5000/api/getSurvey';
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('POST', url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var resp = JSON.parse(this.response);
      if (resp.status === "OK") {
        var main = document.getElementsByClassName('w3-main')[0];
        main.innerHTML = "<h3 style='color:#122b40' class='w3-center'>درخواست شما با موفقیت ثبت گردید و پس از بررسی نتیجه آن به شما اعلام میگردد</h3>";
        alert("Submit Successful")
      } else {
        alert("Unsuccessful");
      }
    }
  }
  request.send(JSON.stringify(data));
}
