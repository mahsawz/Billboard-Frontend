function getGifts() {
  var request = new XMLHttpRequest();
  var url = 'http://192.168.1.4:5000/api/giftshop';
  request.crossDomain = true;
  request.withCredentials = true;
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
      button.setAttribute('name',gift.id);
      button.setAttribute('onclick','confirmGiftInfo(this)');
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


var selectedId = 0;
function confirmGiftInfo(button) {
  var giftId = eval(button.getAttribute('name'));
  selectedId = giftId;
  var gifts = document.getElementsByClassName('thumbnail');
  var selected = (gifts[giftId-1]).childNodes; // note : first element isn't static. If static, giftId shouldn't be decremented
  document.getElementById('gift-name').innerHTML = selected[1].innerHTML;
  document.getElementById('gift-cost').innerHTML = selected[2].innerHTML;
  document.getElementById('gift-description').innerHTML = selected[3].innerHTML;
}


function getGiftCode() {
  var url =  'http://192.168.1.4:5000/api/shoppingresult/' + selectedId;
  var request = new XMLHttpRequest();
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('GET', url, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    if (data.status == "OK") {
      var giftInfo = data.record;
      document.getElementById('gift-code').innerHTML = giftInfo.code;
      getUpdatedData();
    }
    if (data.status == "not enough credit") {
      document.getElementById('gift-redeem-result').innerHTML = 'اعتبار شما برای دریافت این گیفت کافی نیست';
    }
    if (data.status == "gift has been finished") {
      document.getElementById('gift-redeem-result').innerHTML = "با عرض پوزش، این گیفت در حال حاضر موجود نیست. لطفا گیفت دیگری را انتخاب بفرمایید";
    }
  }
  request.send();
}
