import Recipe from './recipe.js';

const recipiesContainer = document.getElementById("recipies");
const searchBar = document.getElementById("searchBar");
const message = document.getElementById("message");

let recipies = [];
let searchReg = new RegExp(/[a-zA-Z]{3,}/);

export default class DisplayManager {

    constructor(data) {
        this.recipies = data.recipes;
    }

    homepage() {
        for (let obj of this.recipies) {
            let recipe = new Recipe(obj);
            recipe.display();
            recipies.push(recipe);
        }

        searchBar.addEventListener("input", onSearch);
    }
}

function onSearch(event) {
    for (let recipe of recipies) recipe.appendChild();

    if (searchReg.test(event.target.value)) {
        for (let recipe of recipies) {
            if (!recipe.name.toLowerCase().includes(event.target.value.toLowerCase())) {
                recipe.removeChild();
            }
        }
    }

    recipiesContainer.hasChildNodes() ? message.style.display = "none" : message.style.display = "flex";
}