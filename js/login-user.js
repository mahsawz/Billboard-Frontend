function verifyUser() {
  var request = new XMLHttpRequest();
  var email = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var url = 'http://127.0.0.1:5000/api/login';
  var user = {
    'email': email,
    'password': password
  };
  request.open('POST', url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var resp = JSON.parse(this.response);
      if (resp.status === "OK") {
        sessionStorage.setItem('user',resp.user);
        window.location.replace('app.html');
      }
      else {
        alert("User info not correct");
      }
    }
    else {
      alert("Request not made");
    }
  }
  request.send(JSON.stringify(user));
}
