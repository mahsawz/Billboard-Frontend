function submitApp() {
  console.log("Submit app");
  var appName = document.getElementById('app-name').value;
  var appLink = document.getElementById('app-link').value;
  var appIcon = document.getElementById('app-icon').value;
  var appDuration = document.getElementById('app-duration').value;
  var selectedCredit;
  var selectedCategory;
  var options = document.getElementsByTagName('option');
  var i;
  for (i = 1; i < options.length; i++) {
    var option = options[i];
    if (option.className == "duration-op") {
      if (option.selected == true && option.value == "null") {
        alert("You should select a credit");
        return;
      }
      if (option.selected == true) {
        selectedCredit = option.value;
      }
    }
    if (option.className == "category-op") {
      if (option.selected == true && option.value == "null") {
        alert("You should select a category");
        return;
      }
      if (option.selected == true) {
        if (option.value == "بازی") {
          selectedCategory = "Game";
        }
        if (option.value == "اپلیکیشن") {
          selectedCategory = "App";
        }
      }
    }
    var app = {
      "name": appName,
      "icon": appIcon,
      "credit": selectedCredit,
      "dlLink": appLink,
      "duration": appDuration,
      "category":selectedCategory
    }
    console.log(app);
    sendRequest(app);
  }
}

function sendRequest(data) {
  var request = new XMLHttpRequest();
  var url = 'http://192.168.1.4:5000/api/getApp';
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('POST', url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var resp = JSON.parse(this.response);
      if (resp.status === "OK") {
        alert("Submit Successful");
        var main = document.getElementsByClassName('w3-main')[0];
        main.innerHTML = "<h3 style='color:#122b40' class='w3-center'>درخواست شما با موفقیت ثبت گردید و پس از بررسی نتیجه آن به شما اعلام میگردد</h3>";
      } else {
        alert("Unsuccessful");
      }
    }
  }
  request.send(JSON.stringify(data));
}
