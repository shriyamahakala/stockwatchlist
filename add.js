const form = document.querySelector('.create-stock');

function update(array, ticker){
    var change = (ticker != "");
    for (let x = 0; x<array.length; x++){
        if (array[x]==ticker){
            change = false;
        }
    }
    if (change){
        array.push(ticker);
        chrome.storage.sync.set({list:array}, function() {
            console.log("added value");
        });
    }
    else{
        console.log("didn't add value");
    }
    
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const ticker = data['ticker'];

  chrome.storage.sync.get({
    list:[] 
    }, function(data) {
   console.log(data.list);
   update(data.list, ticker); //storing the storage value in a variable and passing to update function
    });  

  document.getElementById("ticker").value="";
  
});

