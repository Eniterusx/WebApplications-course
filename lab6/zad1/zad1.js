// initialize the counter variable on page load
var counter = 0;
var swap = false;
var yellowEnabled = true;
var redEnabled = true;
var propagationEnabled = false;

function handleCounter(value) {
    if (!propagationEnabled) {
        event.stopPropagation();
    }
    if (counter == undefined) {
        counter = 0;
    }
    if ((value == "zolty" && !yellowEnabled) || (value == "czerwony" && !redEnabled)) {
        return;
    }
    var add = 0;
    if (!swap) {
        switch(value){
            case "niebieski":
                add = 1;
                break;
            case "czerwony":
                add = 2;
                break;
            case "zolty":
                add = 5;
                break;
        }
    }
    else {
        switch(value){
            case "niebieski":
                add = 5;
                break;
            case "czerwony":
                add = 2;
                break;
            case "zolty":
                add = 1;
                break;
        }
    }

    counter += add;
    console.log(counter);
    document.getElementById("counter").innerHTML = counter;
    document.getElementById("order").innerHTML = "nacisnales " + value + " o wartosci " + add;
    
    // if counter is 30 then disable yellow div button
    if (counter >= 30) {
        yellowEnabled = false;
    }
    if (counter >= 50) {
        redEnabled = false;
    }
}

function enablePropagation() {
    propagationEnabled = !propagationEnabled;
    var txt = propagationEnabled ? "Stop propagation" : "Start propagation";
    document.getElementById("propagation").innerHTML = txt;
}

function resetCounter() {
    counter = 0;
    yellowEnabled = true;
    redEnabled = true;
    document.getElementById("counter").innerHTML = counter;
    document.getElementById("order").innerHTML = "zresetowales licznik";
}

function changeOrder() {
    swap = !swap;

    
    var div = document.getElementById("blue");
    var anchor = div.children[0];

    div.removeChild(anchor);
    div.innerText = swap ? "5" : "1";
    div.appendChild(anchor);

    div = document.getElementById("yellow");
    div.innerText = swap ? "1" : "5";
}