function makeParagraphElement(data) {
  var p = document.createElement("p");
  var b = document.createElement("b");
  b.innerHTML = data;
  p.appendChild(b);
  return p;
}


function getExtraDetails(id) {
  var request = new XMLHttpRequest();
  var url = 'http://127.0.0.1:5000/api/getSurveyStat/' + id;
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('GET', url, true);
  request.onload = function(e) {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var data = JSON.parse(this.response);
      var survey = data.survey_stat;
      var message;
      var status = data.status;
      if (status == "OK") {
        message = "تایید شده";
      }
      if (status == "survey is waiting to be submitted") {
        message = "در انتظار تایید";
      }
      if (status == "survey has been rejected") {
        message = "رد شده";
      }
      var hiddenDiv = document.getElementById(survey.id);
      hiddenDiv.innerHTML = "";
      var description = makeParagraphElement("توضیحات : " + survey.description);
      var survey_stat = makeParagraphElement("وضعیت تبلیغ : " + message);
      survey_stat.setAttribute('style','color:red');
      var submit_date = makeParagraphElement("تاریخ ثبت : " + survey.advertise_date.split('T')[0]);
      var expiration_date = makeParagraphElement("تاریخ انقضا : " + survey.expiration_date.split('T')[0]);
      hiddenDiv.appendChild(description);
      hiddenDiv.appendChild(survey_stat);
      hiddenDiv.appendChild(submit_date);
      hiddenDiv.appendChild(expiration_date);
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
        hiddenDiv.setAttribute('id', survey.id);
        detailsCont.appendChild(name);
        detailsCont.appendChild(count);
        detailsCont.appendChild(hiddenDiv);
        var onclick = "showDetails(" + survey.id + ",this" + ")";
        var button = document.createElement("button");
        button.setAttribute("onclick", onclick);
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


function showDetails(id,button) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    getExtraDetails(id);
    x.className += " w3-show";
    button.innerHTML = "بستن جزئیات";
  } else {
    x.className = x.className.replace(" w3-show", "");
    button.innerHTML = "نمایش جزئیات";
  }
}
