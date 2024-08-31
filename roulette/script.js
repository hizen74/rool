const imageInput = document.getElementById('imageInput');
const imageContainer = document.getElementById('imageContainer');
const pickButton = document.getElementById('pickButton');
const selectedImage = document.getElementById('selectedImage');
let imagesArray = [];

// Charger le son
const clickSound = new Audio('clic.mp3');

// Charger les images depuis le dossier local
function loadImagesFromFolder() {
    fetch('D:/RandomImagePicker/image roulette')
        .then(response => response.json())
        .then(data => {
            imagesArray = data.map(file => `D:/RandomImagePicker/image roulette/${file}`);
            displayRandomImage();
        })
        .catch(error => console.error('Erreur lors du chargement des images:', error));
}

// Charger les images sélectionnées
imageInput.addEventListener('change', function() {
    imagesArray = [];
    imageContainer.innerHTML = ''; // Vider le conteneur d'images

    for (let i = 0; i < imageInput.files.length; i++) {
        const file = imageInput.files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            imageContainer.appendChild(img);
            imagesArray.push(e.target.result); // Ajouter l'image à la liste des images
        };

        reader.readAsDataURL(file);
    }
});

// Fonction pour afficher les images en défilement avec son
function shuffleImages() {
    if (imagesArray.length > 0) {
        let currentIndex = 0;
        const totalDuration = 6000; // Durée totale du défilement (6 secondes)
        const intervalDuration = 100; // Temps entre chaque changement d'image (100ms)
        const interval = setInterval(function() {
            selectedImage.src = imagesArray[currentIndex];
            clickSound.play(); // Jouer le son à chaque image affichée
            currentIndex = (currentIndex + 1) % imagesArray.length;
        }, intervalDuration);

        // Arrêter le défilement après 6 secondes et choisir une image au hasard
        setTimeout(function() {
            clearInterval(interval);
            const randomIndex = Math.floor(Math.random() * imagesArray.length);
            selectedImage.src = imagesArray[randomIndex];
            clickSound.play(); // Jouer le son pour l'image sélectionnée
        }, totalDuration);
    } else {
        alert('Veuillez d\'abord ajouter des images.');
    }
}

// Fonction pour afficher une image aléatoire au chargement de la page
function displayRandomImage() {
    if (imagesArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * imagesArray.length);
        selectedImage.src = imagesArray[randomIndex];
        clickSound.play(); // Jouer le son pour l'image sélectionnée
    }
}

// Assigner la fonction shuffleImages au bouton
pickButton.addEventListener('click', shuffleImages);

// Charger les images depuis le dossier local au chargement de la page
window.onload = loadImagesFromFolder;
