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
    for (let list of recipies) {
        if (recipiesContainer.contains(list.recipe)) {
            list.removeChild();
        }
    }

    if (searchReg.test(event.target.value)) {
        for (let recipe of recipies) {
            if (isWordInRecipeTitle(recipe.name, event.target.value) || isWordInRecipeIngredients(recipe.ingredients, event.target.value) || isWordInRecipeDescription(recipe.description, event.target.value)) {
                recipe.appendChild();
            }
        }
    } else {
        for (let recipe of recipies) recipe.appendChild();
    }

    recipiesContainer.hasChildNodes() ? message.style.display = "none" : message.style.display = "flex";
}

function isWordInRecipeTitle(title, word) {
    return title.toLowerCase().includes(word.toLowerCase());
}

function isWordInRecipeIngredients(recipeIngredients, word) {
    for (let list of recipeIngredients) {
        if (list.ingredient.toLowerCase().includes(word.toLowerCase())) return true;
    }
}

function isWordInRecipeDescription(recipeDescription, word) {
    return recipeDescription.toLowerCase().split(/[\s,\?\,\.!]+/).some(string => string === word.toLowerCase());
}