import Recipe from './recipe.js';

let recipies = [];
let searchBar = document.getElementById("searchBar");
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
                // console.log("recipe.name = " + recipe.name);
                recipe.removeChild();
            }
        }
    }


}