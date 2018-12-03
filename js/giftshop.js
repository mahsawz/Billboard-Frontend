function getGifts() {
  var request = new XMLHttpRequest();
  var url = 'http://127.0.0.1:5000/api/giftshop';
  request.open('GET', url, true);
  request.onload = function(e) {
    var data = JSON.parse(this.response);
    gifts = data.gifts;
    var i;
    for (i = 0; i < gifts.length; i++) {
      var gift = gifts[i];
      console.log(gift);
      var container = document.createElement('div');
      container.setAttribute('class', 'col-sm-3');
      var box = document.createElement('div');
      box.setAttribute('class', 'thumbnail text-center w3-card');
      var img = document.createElement('img');
      img.src = "img/appstore.jpeg";
      var name = document.createElement('h4');
      name.innerHTML = gift.name;
      var cost = document.createElement('h4');
      cost.innerHTML = " هزینه : " + gift.cost;
      var desc = document.createElement('h4');
      desc.innerHTML = gift.description;
      var button = document.createElement('button');
      button.setAttribute('class', 'btn w3-hover-white');
      button.setAttribute('style', "color: white;background-color: #122b40");
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#proceedbox');
      button.innerHTML = "دریافت گیفت";
      box.appendChild(img);
      box.appendChild(name);
      box.appendChild(cost);
      box.appendChild(desc);
      box.appendChild(button);
      container.appendChild(box);
      document.getElementById('gifts').appendChild(container);
    }
  }
  request.send();

}
