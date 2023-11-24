let cities;

fetch('city.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        if(Array.isArray(data)) cities = data;
        else if (typeof data === 'object') cities = Object.keys(data).map(key => data[key]);

        var el1 = document.getElementById("el1");
        var el2 = document.getElementById("el2");
        var el3 = document.getElementById("el3");
        var el4 = document.getElementById("el4");
        var el5 = document.getElementById("el5");
        var el6 = document.getElementById("el6");
        var el7 = document.getElementById("el7");
        
        var malopolskaCities = [];
        var aCities = [];
        var bigCities = [];
        let cities4 = cities.slice();
        var citiesOver80000 = 0;
        var citiesBelow80000 = 0;
        var citiesForPArea = [];
        var areAllOver5000 = false;
        var pomorskieOver5000count = 0;

        for (var i = 0; i < cities.length; i++){
            if(cities4[i]["people"] > 100000){
                cities4[i]["name"] += " city";
                bigCities.push(" " + cities4[i]["name"]);
            }

            if(cities[i]["province"]==="małopolskie") malopolskaCities.push(" " + cities[i]["name"] );

            let a_count = 0;
            for(var j = 0; j < cities.length; j++)
                if(cities[i]["name"][j] === 'a') a_count++;
            if (a_count === 2) aCities.push(" " + cities[i]["name"]);

            if(cities4[i]["people"] > 80000) citiesOver80000++;
            else if(cities4[i]["people"] < 80000) citiesBelow80000++;

            if(cities[i]["name"][0].toLowerCase() === 'p') citiesForPArea.push(cities[i]["area"]);

            if(cities[i]["province"]==="pomorskie"){
                if(cities[i]["people"] > 5000) pomorskieOver5000count++;
                else areAllOver5000 = false;
            }
        }

        let sum = citiesForPArea.reduce((a, b) => a + b, 0);
        let mean = sum / citiesForPArea.length;

        el1.textContent = malopolskaCities;
        el2.textContent = aCities;
        el3.textContent = cities.sort((a, b) => b["density"] - a["density"])[5]["name"];
        el4.textContent = bigCities;
        el5.textContent = citiesOver80000 > citiesBelow80000 ? "Więcej jest miast ponad 80 000 mieszkańców" : "Więcej jest miast poniżej 80 000 mieszkańców";
        el6.textContent = "Średnia: " + mean;
        el7.textContent = areAllOver5000 ? "Wszystkie są powyżej 5000 mieszkańców i jest ich " : "Nie wszystkie są powyżej 5000 mieszkańców, jest ich tylko "
        el7.textContent += pomorskieOver5000count;
        el7.textContent += areAllOver5000 ? el7.textContent :  " z " + cities.filter(city => city["province"]==="pomorskie").length;
    })
