// Buat Stopwatch nya
var detikNya = 00;
var secondNya = 00;
var nambahdetikNya = document.getElementById("detik");
var nambahsecondNya = document.getElementById("second");
var interval;

// Buat Tombol pada Stopwatch
var tombolMulai = document.getElementById("mulai");
var tombolBerenti = document.getElementById("berenti");
var tombolReset = document.getElementById("ulang");

// Mulai Stopwatch
function mulaiStopwatch() {
    secondNya++;

    if(secondNya < 9) {
        nambahsecondNya.innerHTML = "0" + secondNya;
    }

    if(secondNya > 9) {
        nambahsecondNya.innerHTML = secondNya;
    }

    if(secondNya > 99) {
        detikNya++;
        nambahdetikNya.innerHTML = "0" + detikNya;
        secondNya = 0;
        nambahsecondNya.innerHTML = "0" + 0;
    }

    if(detikNya>9) {
        nambahdetikNya.innerHTML = detikNya;
    }
}

tombolMulai.onclick = function() {
    interval = setInterval(mulaiStopwatch);
};

tombolBerenti.onclick = function() {
    clearInterval(interval);
}

tombolReset.onclick = function() {
    clearInterval(interval);
    secondNya = "00";
    detikNya = "00";
    nambahdetikNya.innerHTML = detikNya;
    nambahsecondNya.innerHTML = secondNya;
}
