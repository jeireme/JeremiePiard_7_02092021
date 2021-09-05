import Recipe from './recipe.js';

const recipiesContainer = document.getElementById("recipies");
const message = document.getElementById("message");

const searchBar = document.getElementById("searchBar");
const searchReg = new RegExp(/[a-zA-Z]{3,}/);

let recipies = [];

export default class DisplayManager {

    constructor(data) {
        this.recipies = data.recipes;
    }

    homepage() {

        // return; // ! 

        for (let obj of this.recipies) {
            let recipe = new Recipe(obj);
            recipe.display();
            recipies.push(recipe);
        }

        searchBar.addEventListener("input", onSearch);
    }
}

// * looking for word(s) in title, ingredients and description
function onSearch(event) {
    for (let recipe of recipies) recipe.appendChild();

    if (searchReg.test(event.target.value)) {
        for (let recipe of recipies) {
            if (!isWordInTitle(recipe, event) && !isWordInIngredients(recipe, event) && !isWordInDescription(recipe, event)) {
                recipe.removeChild();
            }
        }
    }
    recipiesContainer.hasChildNodes() ? message.style.display = "none" : message.style.display = "flex";
}

function isWordInTitle(recipe, event) {
    return recipe.name.toLowerCase().includes(event.target.value.toLowerCase());
}

function isWordInIngredients(recipe, event) {
    for (let list of recipe.ingredients) {
        if (list.ingredient.toLowerCase().includes(event.target.value.toLowerCase())) return true;
    }
}

function isWordInDescription(recipe, event) {
    // if (event.target.value.toLowerCase().match(/\b\w+\b/g).length > 1) {
    //     return recipe.description.toLowerCase().includes(event.target.value.toLowerCase());
    // }
    // if (event.target.value.toLowerCase().startsWith("pom") ) {
    //     return recipe.description.toLowerCase().includes(event.target.value.toLowerCase());
    // }
    // /*else*/ return recipe.description.toLowerCase().split(/[\s,\?\,\.!]+/).some(word => word === event.target.value.toLowerCase());

    return recipe.description.toLowerCase().split(/[\s,\?\,\.!]+/).some(word => word === event.target.value.toLowerCase());
    // return recipe.description.toLowerCase().includes(event.target.value.toLowerCase());
}

function sendMessage() {
    
}