function getApps(filter) {
  var request = new XMLHttpRequest();
  var url;
  if (filter == 0) {
      url = 'http://192.168.1.4:5000/api/showApps/';
  }
  else {
    url = 'http://192.168.1.4:5000/api/showApps/'+filter;
  }
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('GET', url, true);
  request.onload = function(e) {
    var data = JSON.parse(this.response);
    apps = data.apps;
    var i;
    for (i = 0; i < apps.length; i++) {
      var app = apps[i];
      console.log(app);
      var container = document.createElement('div');
      container.setAttribute('class', 'col-sm-3');
      var box = document.createElement('div');
      box.setAttribute('class', 'box text-center w3-card');
      var img = document.createElement('img');
      img.src = app.icon;
      img.style.width = "100px";
      var name = document.createElement('h4');
      name.innerHTML = app.name;
      var downloadCount = document.createElement('h4');
      downloadCount.innerHTML = "تعداد دانلود : " + app.count;
      var credit = document.createElement('h4');
      credit.innerHTML = "اعتبار : " + app.credit;
      var button = document.createElement('button');
      button.setAttribute('class', 'btn w3-hover-white');
      button.setAttribute('style', "color: white;background-color: #122b40");
      button.innerHTML = "دانلود اپ";
      box.appendChild(img);
      box.appendChild(name);
      box.appendChild(downloadCount);
      box.appendChild(credit);
      box.appendChild(button);
      container.appendChild(box);
      document.getElementById('apps').appendChild(container);
    }
  }
  request.send();
}
function getAppsByCategory() {
  document.getElementById('apps').innerHTML = "";
  var options = document.getElementsByTagName('option');
  var i;
  for(i=1;i<options.length;i++) {
    var option = options[i];
    if (option.selected == true) {
      getApps(i);
    }
  }
}
