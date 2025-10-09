"use strict";

let container = document.querySelector('.container');
let btnDebut = document.querySelector('.debut');
let btnFin = document.querySelector('.fin');
let scoreConteneur = document.querySelector('.score');
let tempsConteneur = document.querySelector('.temps') || document.querySelector('.Temps');

let chrono;
let interval;
let enCours = false; 

btnDebut.onclick = function() {
    if (enCours) return; 
    enCours = true;

    let score = 0;
    let temps = 30;
    container.innerHTML = "";

    scoreConteneur.textContent = "Score : 0";
    tempsConteneur.textContent = "Temps : " + temps + "s";

    chrono = setInterval(function() {
        temps--;
        tempsConteneur.textContent = "Temps : " + temps + "s";

        if (temps <= 0) {
            stopGame();
            afficherPopup("Le jeu est terminé ! Score final : " + score + " Merci d'avoir joué !");
        }
    }, 1000);

    interval = setInterval(function showTarget() {
        let cible = document.createElement('img');
        cible.id = "cible";
        cible.src = "couronne.png";
        container.appendChild(cible);

        cible.onload = function() {
            cible.style.position = "absolute";

            const maxTop = container.clientHeight - cible.height;
            const maxLeft = container.clientWidth - cible.width;

            cible.style.top = Math.random() * maxTop + 'px';
            cible.style.left = Math.random() * maxLeft + 'px';
        };

        cible.onclick = function() {
            score++;
            scoreConteneur.textContent = "Score : " + score;
            cible.remove();
        };

        setTimeout(function() {
            if (cible.parentNode) {
                cible.remove();
            }
        }, 2000);
    }, 1500);
};

btnFin.onclick = function() {
    if (enCours) {
        stopGame();
        afficherPopup("Tu veux déjà faire une pause ?");
    }
};

function stopGame() {
    clearInterval(interval);
    clearInterval(chrono);
    enCours = false;
}

function afficherPopup(message) {
    document.getElementById("messageFin").textContent = message;
    document.getElementById("popupFin").classList.add("active");
}
