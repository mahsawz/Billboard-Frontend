function logoutUser() {
  var request = new XMLHttpRequest();
  var url = 'http://127.0.0.1:5000/api/logout';
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('GET', url, true);
  request.onload = function(e) {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var resp = JSON.parse(this.response);
      if (resp.status === "OK") {
        alert("Logout Successful");
        window.location.replace('index.html');
      } else {
        alert("Unsuccessful");
      }
    }
  }
  request.send();
}
