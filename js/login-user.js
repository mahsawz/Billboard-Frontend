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
        sessionStorage.setItem('user', JSON.stringify(resp.user));
        window.location.replace('app.html');
      } else {
        alert("User info not correct");
      }
    } else {
      alert("Request not made");
    }
  }
  request.send(JSON.stringify(user));
}

function signupUser() {
  var request = new XMLHttpRequest();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('pass').value;
  var passrepeat = document.getElementById('passrpt').value;
  if (password != passrepeat) {
    alert("Please repeat password correctly");
    return;
  }
  var user = {
    'name': name,
    'email': email,
    'password': password
  };
  var url = 'http://127.0.0.1:5000/api/signup';
  request.open('POST', url, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var resp = JSON.parse(this.response);
      if (resp.status == "OK") {
        alert("Signup Successful");
      }
      else {
        alert("Signup Unsuccessful");
      }
    } else {
      alert("Request not made");
    }
  }
  request.send(JSON.stringify(user));
}
