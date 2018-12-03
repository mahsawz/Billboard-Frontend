function fillUserInfo(user) {
  var user = JSON.parse(sessionStorage.getItem('user'));
  document.getElementById('user-name').innerHTML = user.name;
  document.getElementById('user-credit').innerHTML = "اعتبار : "+user.credit;
}
