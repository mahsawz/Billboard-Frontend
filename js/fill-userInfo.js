function fillUserInfo(user) {
  var user = JSON.parse(sessionStorage.getItem('user'));
  document.getElementById('user-name').innerHTML = user.name;
  document.getElementById('user-credit').innerHTML = "اعتبار : "+user.credit;
}


function getUpdatedData() {
  var user = JSON.parse(sessionStorage.getItem('user'));
  var request = new XMLHttpRequest();
  var userId = user.id;
  var json = {"user_id" : userId};
  var url = 'http://127.0.0.1:5000/api/getUser';
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('POST', url, true);
  request.onload = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var resp = JSON.parse(this.response);
      if (resp.status === "OK") {
        var updatedUser = resp.user;
        sessionStorage.removeItem("user");
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        fillUserInfo();
      } else {
        alert("Unsuccessful");
      }
    }
  }
  request.send(JSON.stringify(json));
}
