function enableSubmitButton() {
  document.getElementById('submit-btn').disabled = false;
}

function showQuestions() {
  var survey_id = sessionStorage.getItem("survey_id");
  var request = new XMLHttpRequest();
  var url = 'http://192.168.1.4:5000/api/fillSurvey/' + survey_id;
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('GET', url, true);
  var qDiv = document.getElementById('questions');
  request.onload = function(e) {
    var resp = JSON.parse(this.response);
    var data = resp.survey;
    console.log(data);
    document.getElementById('question-title').innerHTML = "" + data.title;
    document.getElementById('question-description').innerHTML = "" + data.description;
    var questions = data.questions;
    window.setTimeout(function(){enableSubmitButton()},questions.length*10000); //wait 10 seconds for each question and then enable submit button
    var i;
    for (i = 0; i < questions.length; i++) {
      var q_object = questions[i];
      // Question Title Part
      var questionDiv = document.createElement('div');
      questionDiv.setAttribute('class', 'question');
      var rowDiv = document.createElement('div');
      rowDiv.setAttribute('class', 'w3-row');
      var questionContainer = document.createElement('div');
      questionContainer.setAttribute('class', 'w3-col');
      questionContainer.setAttribute('dir', 'rtl');
      var questionText = document.createElement('h3');
      questionText.setAttribute('style', 'color: #122b40');
      questionText.innerHTML = (i + 1) + "." + " " + q_object.context;
      questionContainer.appendChild(questionText);
      rowDiv.appendChild(questionContainer);
      questionDiv.appendChild(rowDiv);
      //Question choices
      var q_items = q_object.items;
      var j;
      var flexContainer = document.createElement('div');
      flexContainer.setAttribute('class', 'w3-row flex-container2');
      flexContainer.setAttribute('dir', 'rtl');
      for (j = 0; j < q_items.length; j++) {
        var item = q_items[j];
        var itemDiv = document.createElement('div');
        itemDiv.setAttribute('class', 'w3-col m3');
        var inputElement = document.createElement('input');
        inputElement.setAttribute('class', 'w3-radio');
        inputElement.setAttribute('name', q_object.id);
        inputElement.setAttribute('type', 'radio');
        inputElement.setAttribute('id', "item" + item.id);
        var labelElement = document.createElement('label');
        labelElement.innerHTML = item.context;
        itemDiv.appendChild(inputElement);
        itemDiv.appendChild(labelElement);
        if (j == 0) {
          inputElement.checked = true;
        }
        if (j % 4 == 0) {
          questionDiv.appendChild(flexContainer);
          var newContainer = document.createElement('div');
          newContainer.setAttribute('class', 'w3-row flex-container2');
          newContainer.setAttribute('dir', 'rtl');
          flexContainer = newContainer;
        }
        flexContainer.appendChild(itemDiv);
        if (j == q_items.length - 1) {
          questionDiv.appendChild(flexContainer);
        }
      }
      document.getElementById('questions').appendChild(questionDiv);
    }
  }
  request.send();
}


function sendAnswers() {
  var items = document.getElementsByClassName('w3-radio');
  var i;
  var chosenItems = [];
  for (i = 1; i < items.length; i++) {
    var item = items[i];
    if (item.checked == true) {
      var id = item.id.split('m');
      id = id[1];
      chosenItems.push("" + id);
    }
  }
  var json = {
    'items': chosenItems
  };
  console.log(chosenItems);
  var request = new XMLHttpRequest();
  var url = 'http://192.168.1.4:5000/api/submitFilling';
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('POST', url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var resp = JSON.parse(this.response);
      document.getElementById('questions').innerHTML = "";
      var div = document.createElement('div');
      div.setAttribute('class', 'text-center');
      div.setAttribute('dir', 'rtl');
      var result = document.createElement('h3');
      if (resp.status == "OK") {
        result.innerHTML = "نظرسنجی با موفقیت ثبت گردید."
        getUpdatedData();
      }
      if (resp.status == "user has already filled this survey") {
        result.innerHTML = "قبلا به این نظرسنجی پاسخ داده اید. لطفا نظرسنجی دیگری انتخاب فرمایید."
      }
      div.appendChild(result);
      document.getElementById('questions').appendChild(div);
      document.getElementById('submit-btn').style.display = "none";
    }
  }
  request.send(JSON.stringify(json));
}
