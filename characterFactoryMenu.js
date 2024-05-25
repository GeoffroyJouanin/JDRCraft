"use strict";

import {save, load, importJSON, exportJSON } from "./storageManager.js";

const listStorageName = "charactersList";
let charactersList = [];

let exportFileName=listStorageName + "File";

const characterBlockClassName = "characterBlock";
let characterContainer = document.getElementById("characterBankContainer");
let mainBlock = document.getElementsByTagName("main")[0];

let importAllButton = document.getElementById("importAllInput");
let exportAllButton = document.getElementById("exportAllButton");

importAllButton.addEventListener('click', (event) => {
    let input = document.createElement("input");
    input.accept = ".json";
    input.type = "file";
    document.body.appendChild(input);
    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            importJSON(file)
                .then(jsonObj => {
                    charactersList = charactersList.concat(jsonObj);
                    save(listStorageName, charactersList);
                    displayList();
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        } else {
            alert('Aucun fichier sélectionné');
        }
    });
    input.click();
    document.body.removeChild(input);
});

exportAllButton.addEventListener("click", (event) => {
    exportJSON(charactersList, exportFileName);
});

let nameInput = document.getElementById("nameInput");
let nameButton = document.getElementById("nameButton");

nameButton.addEventListener("click", (event) => {
    if (nameInput.value === "") {
        return;
    }
    charactersList.push(nameInput.value);
    nameInput.value = "";
    save(listStorageName, charactersList);
    displayList();
})

document.addEventListener("DOMContentLoaded", (event) => {
    charactersList = load(listStorageName);
    if (charactersList == null || charactersList === []) {
        charactersList = [];
        return;
    }
    displayList();
});

function destroyAndRecreateBankContainer()
{
    characterContainer = document.getElementById("characterBankContainer");
    characterContainer.remove();
    characterContainer = document.createElement("section");
    characterContainer.setAttribute("id", "characterBankContainer");
    mainBlock.appendChild(characterContainer);
}

function displayList() {
    destroyAndRecreateBankContainer();
    charactersList = load(listStorageName);
    if (charactersList == null || charactersList === []) {
        charactersList = [];
        return;
    }
    for (let character of charactersList) {
        let newBlock = document.createElement("p");
        newBlock.setAttribute("class", characterBlockClassName);
        newBlock.innerHTML = character;
        characterContainer.appendChild(newBlock);
    }
}