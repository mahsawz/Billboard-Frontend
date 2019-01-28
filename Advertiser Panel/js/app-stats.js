function makeParagraphElement(data) {
  var p = document.createElement("p");
  var b = document.createElement("b");
  b.innerHTML = data;
  p.appendChild(b);
  return p;
}


function getExtraDetails(id) {
  var request = new XMLHttpRequest();
  var url = 'http://127.0.0.1:5000/api/getAppStat/' + id;
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('GET', url, true);
  request.onload = function(e) {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var data = JSON.parse(this.response);
      var app = data.app_stat;
      var message;
      var status = data.status;
      if (status == "OK") {
        message = "تایید شده";
      }
      if (status == "app is waiting to be submitted") {
        message = "در انتظار تایید";
      }
      if (status == "app has been rejected") {
        message = "رد شده";
      }
      var hiddenDiv = document.getElementById(app.id);
      hiddenDiv.innerHTML = "";
      var app_stat = makeParagraphElement("وضعیت تبلیغ : " + message);
      app_stat.setAttribute('style','color:red');
      var submit_date = makeParagraphElement("تاریخ ثبت : " + app.advertise_date.split('T')[0]);
      var expiration_date = makeParagraphElement("تاریخ انقضا : " + app.expiration_date.split('T')[0]);
      var category = makeParagraphElement("دسته بندی اپ : " + app.category);
      var credit = makeParagraphElement("اعتبار : " + app.credit);
      hiddenDiv.appendChild(app_stat);
      hiddenDiv.appendChild(submit_date);
      hiddenDiv.appendChild(expiration_date);
      hiddenDiv.appendChild(category);
      hiddenDiv.appendChild(credit);
    }
  }
  request.send();
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
      for (i = 0; i < apps.length; i++) {
        var app = apps[i];
        var container = document.createElement('div');
        container.setAttribute('class', 'col-md-6 container w3-margin-bottom w3-card my-card'); //
        var icon = document.createElement('img');
        icon.src = app.icon;
        icon.alt = "icon";
        icon.setAttribute('class', ' app-icon w3-margin-top w3-margin-bottom');
        container.appendChild(icon);
        var detailsCont = document.createElement('div');
        var name = makeParagraphElement(app.name);
        var count = makeParagraphElement("تعداد دانلود : " + app.count);
        var hiddenDiv = document.createElement("div");
        hiddenDiv.setAttribute('class', 'w3-hide');
        hiddenDiv.setAttribute('id', app.id);
        detailsCont.appendChild(name);
        detailsCont.appendChild(count);
        detailsCont.appendChild(hiddenDiv);
        var button = document.createElement("button");
        var onclick = "showDetails(" + app.id + ")";
        button.setAttribute('class', 'w3-button w3-section w3-ripple w3-hover-white submit-btn');
        button.setAttribute("onclick", onclick);
        button.innerHTML = "نمایش جزئیات";
        detailsCont.appendChild(button);
        container.appendChild(detailsCont);
        document.getElementById('apps').appendChild(container);
      }
    }
  }
  request.send();
}


function showDetails(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    getExtraDetails(id);
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}
