const passwordInput = document.querySelector('.pass-field input');
const passwordRepeat = document.querySelector('.pass-field-repeat input');
const eyeIcon = document.querySelector(".pass-field i");
const eyeIconRepeat = document.querySelector(".pass-field-repeat i");
const requirementList = document.querySelectorAll(".password-rules li");

const requirements = [
    {regex: /.{8,}/, index: 0}, // 8 znaków
    {regex: /[^a-zA-Z0-9]/, index: 1}, // znak specjalny
    {regex: /[A-Z]/, index: 2}, // wielka litera
    {regex: /[0-9]/, index: 3} // cyfra
]
// make an event listener that activates after enter press on the password field
passwordInput.addEventListener("keyup", (e) => {
    if (e.key !== 'Enter') return;
    requirements.forEach(item => {
        const isValid = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];

        if (isValid) {
            requirementItem.firstElementChild.className = 'fa-solid fa-check';
        } else {
            requirementItem.firstElementChild.className = 'fas fa-times';
        }
    });
});

// check if the passwords match
passwordRepeat.addEventListener("keyup", (e) => {
    if (e.key !== 'Enter') return;
    if (e.target.value === passwordInput.value) {
        // get the class of the parent element of the input
        passwordRepeat.className = 'pass-f pass-field-repeat success';
        passwordRepeat.classList.remove('shake');
        passwordRepeat.nextElementSibling.classList.remove('shake-icon');
    } else {
        passwordRepeat.className = 'pass-f pass-field-repeat error';
        passwordRepeat.classList.add('shake');
        passwordRepeat.nextElementSibling.classList.add('shake-icon');
    }
});

eyeIcon.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    
    eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`;
    eyeIcon.classList.toggle('active');
});

eyeIconRepeat.addEventListener('click', () => {
    passwordRepeat.type = passwordRepeat.type === 'password' ? 'text' : 'password';
    
    eyeIconRepeat.className = `fa-solid fa-eye${passwordRepeat.type === "password" ? "" : "-slash"}`;
    eyeIconRepeat.classList.toggle('active');
});
