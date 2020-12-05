
function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display == "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

var newsrc = "peels/peel1.png";

function changeImage() {
if ( newsrc == "peels/peel1.png" ) {
	document.images["rr"].src = "peels/peel1.png";
	document.images["rr"].alt = "Peel";
	newsrc  = "oranges/orange2.png";
}
else {
	document.images["rr"].src = "oranges/orange2.png";
	document.images["rr"].alt = "Orange";
	newsrc  = "peels/peel1.png";
}
}
