import Recipe from './recipe.js';

let recipies = [];

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
    }
}