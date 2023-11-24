function addContact() {
    var nameInput = document.getElementById('name');
    var phoneInput = document.getElementById('phone');

    if (validateName(nameInput.value) && validatePhone(phoneInput.value)) {
        var contactList = document.getElementById('contactList');
        var contactDiv = document.createElement('div');
        contactDiv.className = 'contact';

        var contactName = document.createElement('span');
        contactName.className = 'contact-name';
        contactName.textContent = nameInput.value + ' ';

        var contactPhone = document.createElement('span');
        contactPhone.className = 'contact-phone';
        contactPhone.textContent = phoneInput.value;

        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#128465;';
        deleteButton.onclick = function() {
            contactDiv.remove();
        };
        // wrap contactName and contactPhone in a div
        var contactInfo = document.createElement('div');
        contactInfo.className = 'contact-info';
        contactInfo.appendChild(contactName);
        contactInfo.appendChild(contactPhone);
        
        contactDiv.appendChild(contactInfo);
        contactDiv.appendChild(deleteButton);

        contactList.appendChild(contactDiv);

        nameInput.value = '';
        phoneInput.value = '';
    } else {
        alert('Niepoprawne dane. Sprawdź wprowadzone informacje.');
    }
}

function validateName(name) {
    var nameRegex = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż -]+$/;
    return nameRegex.test(name);
}

function validatePhone(phone) {
    var phoneRegex = /^[+]?(\d ?){9,12}$/;
    return phoneRegex.test(phone);
}