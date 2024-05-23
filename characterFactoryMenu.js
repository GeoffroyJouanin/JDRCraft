"use strict";

let download = document.getElementById("download");
let nameButton = document.getElementById("nameButton");
let nameInput = document.getElementById("nameInput");

let nameUser = "Jean";
let characters = [];

nameButton.addEventListener("click", (event) => {
    if (nameInput.value === "")
    {
        return;
    }
   nameUser = nameInput.value;
   nameInput.value = "";
});

download.addEventListener("click", (event) => {
    const data = {
        name: nameUser,
        age: 30,
        city: "Paris"
    };

// Convertir l'objet en une chaîne JSON
    const jsonStr = JSON.stringify(data, null, 2);

// Créer un Blob avec le contenu JSON
    const blob = new Blob([jsonStr], { type: "application/json" });

// Créer un lien pour le téléchargement
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';

// Ajouter le lien au document et déclencher le téléchargement
    document.body.appendChild(a);
    a.click();

// Nettoyer
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    characters.push(data);
    localStorage.setItem("characters", JSON.stringify(characters));
});

document.addEventListener("DOMContentLoaded", (event) => {
    characters = JSON.parse(localStorage.getItem("characters"));
    if (characters === "" || !characters)
    {
        characters = [];
    }
    for (let character of characters)
    {
        let display = document.createElement("p");
        display.innerHTML = character.name;
        let bank = document.getElementById("bankContainer");
        bank.appendChild(display);
    }
})

