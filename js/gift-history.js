function getGiftHistory() {
  var request = new XMLHttpRequest();
  var url = 'http://192.168.1.4:5000/api/gifthistory';
  request.crossDomain = true;
  request.withCredentials = true;
  request.open('GET', url, true);
  request.onload = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var resp = JSON.parse(this.response);
      if (resp.status === "OK") {
        var historyData = resp.history;
        console.log(historyData);
        var i;
        if (historyData.length == 0) {
          document.getElementById('history-table'). innerHTML = "<h1>تا به حال گیفتی دریافت نکرده اید<h1>"
        }
        else {
          for (i=0;i<historyData.length;i++) {
            var record = historyData[i];
            console.log(record);
            var tableRow = document.createElement('tr');
            var code = document.createElement('th');
            code.innerHTML = record.code;
            tableRow.appendChild(code);
            var desc = document.createElement('th');
            desc.innerHTML = record.description;
            tableRow.appendChild(desc);
            var date = document.createElement('th');
            date.innerHTML = record.date.split('T')[0];
            tableRow.appendChild(date);
            document.getElementById('history-table').appendChild(tableRow);
          }
        }
      }
    } else {
      alert("Request not made");
    }
  }
  request.send();
}
