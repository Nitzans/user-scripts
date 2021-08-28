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

(function run() {
    var results = "";
    var cars = document.getElementsByClassName("feeditem table");
	for (var k = 0; k < cars.length; k++){
		var id = cars[k].children[0].id;
		var item = document.getElementById(id);
		item.click();
	}
	for (var i = 0; i < cars.length; i++){
		if (cars[i].getElementsByClassName("full_price")[0] != null){
            cars[i].style.display = "none";
			continue;
        }
        var model = cars[i].getElementsByClassName("title")[0].innerText;
        var how_old = cars[i].getElementsByClassName("middle_col")[0];
        var year = how_old.getElementsByClassName("data")[0].childNodes[0].innerText;
        var hand = how_old.getElementsByClassName("data")[1].childNodes[0].innerText;
		var price = cars[i].getElementsByClassName("price")[0].innerText.replace(',', '').replace('₪', '');
		var link = cars[i].getElementsByClassName("share-template new-tab share-item")[0];
		if (link != null){
			link = link.href;
		}
		
		var curr_owner = "";
		curr_owner = document.getElementById("more_details_ownerID");
		if (curr_owner != null){
			console.log(curr_owner);
			curr_owner = curr_owner.childNodes[0].innerText;
			if (!curr_owner.includes("פרטית")){
				console.log("Owner status: " + curr_owner + ". Removed! ")
				cars[i].remove();
				continue;
			}
		}
		var prev_owner = "";
		prev_owner = document.getElementById("more_details_previousOwner");
		if (prev_owner!=null){
			console.log(prev_owner);
			prev_owner = prev_owner.childNodes[0].innerText;
			console.log(prev_owner);
			if (!prev_owner.includes("פרטית")){
				console.log("Owner status: " + prev_owner + ". Removed! ")
				cars[i].remove();
				continue;
			}
		}
        results = results + model + ", " + price + ", " + year + ", " + hand + ", " + link + "\n";
		
	}
	console.log(results);
    console.log("Done");
	for (var e = 0; e < 1000; e++){
		console.log('.');
	}
    //download(results, "cars.txt", "txt");
})();


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);

    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    };
}