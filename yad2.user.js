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
    var results = "";
    var cars = document.getElementsByClassName("feeditem table");
	for (var i = 0; i < cars.length; i++){
		cars[i].click();
        var model = cars[i].getElementsByClassName("title")[0].innerText;
        var how_old = cars[i].getElementsByClassName("middle_col")[0];
        var year = how_old.getElementsByClassName("data")[0].childNodes[0].innerText;
        var hand = how_old.getElementsByClassName("data")[1].childNodes[0].innerText;
		var price = cars[i].getElementsByClassName("price")[0].innerText.replace(',', '').replace('₪', '');
		if (price.includes("לא צוין") || price.includes("לחודש")){
            console.log("removed!!");
            //cars[i].style.visibility = "hidden";
			continue;
        }
		
		
		var more_details = cars[i].getElementsByClassName("details_wrapper")[0].childNodes;
		var kilometer = more_details[0].childNodes[2].innerText;
		var prev_owner = more_details[6].childNodes[2].innerText;
		var curr_owner = more_details[7].childNodes[2].innerText;
		console.log("kilometer: " + kilometer);
		console.log("prev: " + prev_owner + " curr: " + curr_owner);
		if (!prev_owner.includes("פרטית") && !curr_owner.includes("פרטית")){
			console.log("BAD: " + prev_owner + "//" + curr_owner)
			continue;
		}
        results = results + model + ", " + price + ", " + year + ", " + hand + "\n";
		cars[i].click();
	}
	console.log(results);
    console.log("Done");
    download(results, "cars.txt", "txt");
})();

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