function openModal(imgSrc) {
    document.getElementById('myModal').style.display = 'block';
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('overlay').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function changePhoto(n) {
    // Pobierz obecny indeks zdjęcia
    let currentIndex = Array.from(document.querySelectorAll('.gallery img')).findIndex(img => img.src === document.getElementById('modalImg').src);

    // Oblicz nowy indeks zdjęcia
    let newIndex = (currentIndex + n + document.querySelectorAll('.gallery img').length) % document.querySelectorAll('.gallery img').length;

    // Zmień źródło obrazu w oknie modalnym
    document.getElementById('modalImg').src = document.querySelectorAll('.gallery img')[newIndex].src;
}