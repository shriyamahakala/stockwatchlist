
async function searchForStock(ticker){
    const url = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=' + ticker + '&region=US';
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': '8f27df3b30msh70a8410ef061302p15a498jsnaf425aa82b4f',
		    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
	    }
};
    try {
        const element = document.getElementById("div1");
        const response = await fetch(url,options);
        const record = await response.json();
        const heading = document.createElement("b");
        heading.appendChild(document.createTextNode(ticker));
        element.appendChild(heading);

        let para = document.createElement("p");
        let node = document.createTextNode("current price: "+ record.financialData.currentPrice.raw);
        para.appendChild(node);
        element.appendChild(para);

        para = document.createElement("p");
        node = document.createTextNode("Price to Book: "+ record.defaultKeyStatistics.priceToBook.fmt);
        para.appendChild(node);
        element.appendChild(para);

        para = document.createElement("p");
        node = document.createTextNode("Price to Earnings Growth: "+ record.defaultKeyStatistics.pegRatio.fmt);
        para.appendChild(node);
        element.appendChild(para);

        
    } catch (error) {
        const element = document.getElementById("div1");

        let para = document.createElement("p");
        let node = document.createTextNode("could not find stock");
        para.appendChild(node);
        element.appendChild(para);

    }
};

chrome.storage.sync.get({
    list:[]}, function(data) {
        for (var x =0; x<data.list.length; x++){
            searchForStock(data.list[x]);
        }
    }
);


