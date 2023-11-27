
const names = ['Grzegorz', 'Wiktoria', 'Mateusz', 'Ania', 'Sandra', 'Kasia', 'Izabela', 'Weronika'];

let  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];


const countries = [
    { name: 'Nigeria', continent: 'Africa'},
    { name: 'Nepal', continent: 'Asia'},
    { name: 'Angola', continent: 'Africa'},
    { name: 'Poland', continent: 'Europe'},
    { name: 'Kenya', continent: 'Africa'},
    { name: 'Greece', continent: 'Europe'},
	{ name: 'France', continent: 'Europe'},
	{ name: 'China', continent: 'Asia'}
]

let people = [
    {"id":123, "name":"Rick Deckard", "email":"rick@bladerunner.org"},
    {"id":456, "name":"Roy Batty", "email":"roy@replicant.io"},
    {"id":789, "name":"J.F. Sebastian", "email":"j.f@tyler.com"},
    {"id":258, "name":"Pris", "email":"pris@replicant.io"}
];

let duplicateName = ['John', 'Paul', 'George', 'Ringo', 'Paul', 'Paul', 'Ringo'];


// 1. Na stronach internetowych wyświetlają się nazwy zawierające znak "r".  ( tablica names)
function namesWithR(names) {    
    const filteredNames = names.filter(name => name.toLowerCase().includes("r"));
    
    const ulElement = document.getElementById("sekcja1");
    
    filteredNames.forEach(name => {
        const liElement = document.createElement("li");
        liElement.textContent = name;
        ulElement.appendChild(liElement);
    });    
}


// 2. sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. wynik wyswietl na stronei w sekcji 2
//   sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6 wyników. wynik wyświetl w przeglądarce w sekcji 2
//   inkrementuj wszystkie elementy w tablicy numbers. Nastepnie stwórz nowa tablice zawierajaca tylko elementy nieparzyste. 
//   Nesteopnie Oblicz sumę wszystkich elementów z tablicy. Wynik wyswietl w sekcji 2
function numbersShenanigans(numbers) {
    const lessThan9 =  numbers.every(number => number < 9);
    const lessThan6 = numbers.some(number => number < 6);
    numbers.forEach((number, index) => numbers[index] = number + 1);
    const oddNumbers = numbers.filter(number => number % 2);
    const sum = numbers.reduce((sum, number) => sum + number);

    const ulElement = document.getElementById("sekcja2");
    const liElement = document.createElement("li");
    liElement.textContent = `Czy wszystkie elementy są mniejsze niż 9? ${lessThan9}`;
    ulElement.appendChild(liElement);
    const liElement2 = document.createElement("li");
    liElement2.textContent = `Czy jakieś elementy są mniejsze niż 6? ${lessThan6}`;
    ulElement.appendChild(liElement2);
    const liElement3 = document.createElement("li");
    liElement3.textContent = `Tablica po inkrementacji: ${numbers}`;
    ulElement.appendChild(liElement3);
    const liElement4 = document.createElement("li");
    liElement4.textContent = `Tablica z nieparzystymi: ${oddNumbers}`;
    ulElement.appendChild(liElement4);
    const liElement5 = document.createElement("li");
    liElement5.textContent = `Suma: ${sum}`;
    ulElement.appendChild(liElement5);
}

// 3. Na stronach internetowych wyświetlają się kraje z Europy
function countriesInEurope(countries) {
    const filteredCountries = countries.filter(country => country.continent === "Europe");
    
    const ulElement = document.getElementById("sekcja3");
    
    filteredCountries.forEach(country => {
        const liElement = document.createElement("li");
        liElement.textContent = country.name;
        ulElement.appendChild(liElement);
    });    
}

// 4. Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. wyświetlanie wyników na stronach internetowych.
function replicantEmails(people) {
    const filteredPeople = people.filter(person => person.email.includes("replicant.io"));
    
    const ulElement = document.getElementById("sekcja4");
    
    filteredPeople.forEach(person => {
        const liElement = document.createElement("li");
        liElement.textContent = person.name;
        ulElement.appendChild(liElement);
    });    
}

// 5. usuwanie zduplikowanych wartości z tablicy nazwaduplikatu
function removeDuplicates(duplicateName) {
    const uniqueNames = [...new Set(duplicateName)];
    
    const ulElement = document.getElementById("sekcja5");
    
    uniqueNames.forEach(name => {
        const liElement = document.createElement("li");
        liElement.textContent = name;
        ulElement.appendChild(liElement);
    });    
}