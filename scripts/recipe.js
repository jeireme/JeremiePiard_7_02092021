const recipies = document.getElementById("recipies");

export default class Medias {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;
        this.image = "poke.jpg";
        this.recipe = document.createElement('div');
    }

    display() {
        this.recipe.className = "recipe";
        this.recipe.id = this.id;
        this.recipe.innerHTML = `
            <div class="recipe__preview">
                <img src="img/recipies/${this.id}.jpg" alt="Prévisualisation du plat">
            </div>
            <div class="recipe__informations">
                <div class="recipe__informations__header">
                    <p>${this.name}</p>
                    <p class="recipe__informations__header--time"><i class="far fa-clock"></i><span class="recipe__time">${this.time} min</span></p>
                </div>
                <div class="recipe__informations__ingredients">
                    <div class="recipe__informations__ingredients__list">
                        ${setIngredients(this.ingredients)}
                    </div>
                    <div class="recipe__informations__ingredients__text${isNameTakingTwoLines(this.name)}">
                        <p>${this.description}</p>
                    </div>
                </div>
            </div>
        `;

        recipies.appendChild(this.recipe);
    }

    appendChild() {
        recipies.appendChild(this.recipe);
    }

    removeChild() {
        recipies.removeChild(this.recipe);
    }
}

function setIngredients(ingredients) {
    let html = '';

    for (const ingredient of ingredients) {
        html += '<p>' + ingredient.ingredient;
        if (ingredient.quantity) html += ' : ' + ingredient.quantity; // ! faire attention à "coco" ne comporte pas trop de "oooo"
        if (ingredient.unit) html += '' + ingredient.unit;
        html += '</p>';
    }

    return html;
}

function isNameTakingTwoLines(name) {
    if (name.length > 28) return ' recipe__informations__ingredients__text--shorter';
    else return '';
}