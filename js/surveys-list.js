function getSurveys() {

  const surveyImg = document.createElement('img');
  surveyImg.setAttribute('src', "img/clipboard.png");
  surveyImg.setAttribute('style', 'width:100px;');
  surveyImg.setAttribute('alt', "Clip Icon");
  var request = new XMLHttpRequest();
  var url = 'http://127.0.0.1:5000/api/showSurvey';
  request.open('GET', url, true);
  request.onload = function(e) {
    var data = JSON.parse(this.response);
    console.log(data);
    var i;
    for (i = 0; i < data.length; i++) {
      var object = data[i];
      var container = document.createElement('div');
      container.setAttribute('class', 'row');

      var responsive = document.createElement('div');
      responsive.setAttribute('class', 'col-sm-12');

      var box = document.createElement('div');
      box.setAttribute('class', 'box2 w3-card');

      var details = document.createElement('div');
      details.setAttribute('class', 'flex-container w3-row text-center');

      var imgDiv = document.createElement('div');
      imgDiv.setAttribute('class', 'survey-info w3-col m3');
      var img = surveyImg.cloneNode(true);
      imgDiv.appendChild(img);

      var titleDiv = document.createElement('div');
      titleDiv.setAttribute('class', 'survey-info w3-col m3');
      titleDiv.innerHTML = object.title;

      var creditDiv = document.createElement('div');
      creditDiv.setAttribute('class', 'survey-info w3-col m3');
      creditDiv.innerHTML = object.credit + " : اعتبار";

      var buttonDiv = document.createElement('div');
      buttonDiv.setAttribute('class', 'survey-info w3-col m3');
      var button = document.createElement('button');
      button.setAttribute('class', 'btn w3-hover-white');
      button.setAttribute('style', "color: white;background-color: #122b40");
      button.setAttribute('onclick', "goToSurvey(this)");
      button.setAttribute('name', object.id + "");
      button.innerHTML = "پاسخگویی";
      buttonDiv.appendChild(button);
      details.appendChild(imgDiv);
      details.appendChild(titleDiv);
      details.appendChild(creditDiv);
      details.appendChild(buttonDiv);

      box.appendChild(details);
      responsive.appendChild(box);
      container.appendChild(responsive);
      document.getElementById('surveys').appendChild(container);
    }
  }
  request.send();
}

function goToSurvey(button) {
  sessionStorage.setItem("survey_id", eval(button.getAttribute('name')));
  window.location.assign("survey-answer.html");

}
