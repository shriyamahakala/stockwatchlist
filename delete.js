const form = document.querySelector('.delete-stock');
const button = document.querySelector('.delete-all');


function update(array, ticker){
    var change = -1;
    for (let x = 0; x<array.length; x++){
        if (array[x]==ticker){
            change = x;
        }
    }
    if(change!=-1){
        array.splice(change, 1);
        chrome.storage.sync.set({list:array}, function() {
            console.log("deleted value");
        });
    }
    else{
        console.log("didn't delete value");
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

button.addEventListener('click', function(){
    chrome.storage.sync.clear();
});



