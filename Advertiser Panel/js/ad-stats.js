function makeParagraphElement(data) {
  var p = document.createElement("p");
  var b = document.createElement("b");
  b.innerHTML = data;
  p.appendChild(b);
  return p;
}


function getAppsStats() {
  var request = new XMLHttpRequest();
  var url = 'http://127.0.0.1:5000/api/getAdvertisedApps';
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('GET', url, true);
  request.onload = function(e) {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var data = JSON.parse(this.response);
      var apps = data.apps;
      var i = 0;
      for (i=0;i<apps.length;i++) {
        var app = apps[i];
        var container = document.createElement('div');
        container.setAttribute('class','col-md-6 container w3-margin-bottom w3-card my-card'); //
        var icon = document.createElement('img');
        icon.src = app.icon;
        icon.alt = "icon";
        icon.setAttribute('class',' app-icon w3-margin-top w3-margin-bottom');
        container.appendChild(icon);
        var detailsCont = document.createElement('div');
        var name = makeParagraphElement(app.name);
        var count = makeParagraphElement("تعداد دانلود : " + app.count);
        var hiddenDiv = document.createElement("div");
        hiddenDiv.setAttribute('class','w3-hide');
        hiddenDiv.setAttribute('id','ad-details');
        detailsCont.appendChild(name);
        detailsCont.appendChild(count);
        detailsCont.appendChild(hiddenDiv);
        var button = document.createElement("button");
        button.onclick = "showDetails('ad-details',this)";
        button.setAttribute('class','w3-button w3-section w3-ripple w3-hover-white submit-btn');
        button.innerHTML = "نمایش جزئیات";
        detailsCont.appendChild(button);
        container.appendChild(detailsCont);
        document.getElementById('apps').appendChild(container);
      }
    }
  }
  request.send();
}


function getSurveysStats() {
  var request = new XMLHttpRequest();
  var url = 'http://127.0.0.1:5000/api/getAdvertisedSurveys';
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('GET', url, true);
  request.onload = function(e) {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var data = JSON.parse(this.response);
      var surveys = data.surveys;
      var i = 0;
      for (i=0;i<surveys.length;i++) {
        var survey = surveys[i];
        var container = document.createElement('div');
        container.setAttribute('class','col-md-6 container w3-margin-bottom w3-card my-card'); //
        var icon = document.createElement('img');
        icon.src = '../img/clipboard.png';
        icon.alt = "icon";
        icon.setAttribute('class',' app-icon w3-margin-top w3-margin-bottom');
        container.appendChild(icon);
        var detailsCont = document.createElement('div');
        var name = makeParagraphElement(survey.title);
        var count = makeParagraphElement("اعتبار :  " + survey.credit);
        var hiddenDiv = document.createElement("div");
        hiddenDiv.setAttribute('class','w3-hide');
        hiddenDiv.setAttribute('id','ad-details');
        detailsCont.appendChild(name);
        detailsCont.appendChild(count);
        detailsCont.appendChild(hiddenDiv);
        var button = document.createElement("button");
        button.onclick = "showDetails('ad-details',this)";
        button.setAttribute('class','w3-button w3-section w3-ripple w3-hover-white submit-btn');
        button.innerHTML = "نمایش جزئیات";
        detailsCont.appendChild(button);
        container.appendChild(detailsCont);
        document.getElementById('surveys').appendChild(container);
      }
    }
  }
  request.send();
}


function showDetails(id, button) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}
