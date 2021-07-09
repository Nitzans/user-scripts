// ==UserScript==
// @name         Yad2
// @namespace    chenitzan
// @include      https://www.yad2.co.il/*
// @version      0.1
// @description  Parsing ads!
// @author       Nitzan Shpigel
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    var results = [];
    var cars = document.getElementsByClassName("feeditem table");
	for (var i = 0; i < cars.length; i++){
		var price = cars[i].getElementsByClassName("price")[0].innerText;
        var model = cars[i].getElementsByClassName("title")[0].innerText;
        var hand = cars[i].getElementById("data_hand_"+i).innerText;
        console.log(hand);
        console.log(price);
		if (price.includes("לא צוין") || price.includes("לחודש")){
            console.log("removed!!");
            cars[i].remove();
			continue;
        }

        results.push(model + ", " + price + "\n");
        //console.log(model + ", " + price);
	}
    for (const x in results)
    {
        console.log(results[x]);
    }
    console.log("Done");
})();