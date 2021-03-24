window.onload = function () {
    yes();
    no();
}

var height = window.innerHeight;
var width = window.innerWidth;

function yes() {
    var btnYes = document.getElementById('yes');

    btnYes.addEventListener('click', function () {
        alert('""');
    });
}

function no() {
    var btnNo = document.getElementById('no');

    btnNo.addEventListener('mouseover', function () {
        var x = Math.floor(Math.random() * height);
        var y = Math.floor(Math.random() * width);

        console.log("x= " + x + " y = " + y);
        document.getElementById('no').style.left=y+"px";
        document.getElementById("no").style.top=x+"px";
    });
}