import Recipe from './recipe.js';

const recipiesContainer = document.getElementById("recipies");
const message = document.getElementById("message");

const searchBar = document.getElementById("searchBar");
const searchReg = new RegExp(/[a-zA-Z]{3,}/);

const inputIngredients = document.getElementById("inputIngredients");
const inputAppliances = document.getElementById("inputAppliances");
const inputUtensils = document.getElementById("inputUtensils");

const ingredientContainer = document.getElementById("ingredientContainer");
const appliancesContainer = document.getElementById("appliancesContainer");
const utensilsContainer = document.getElementById("utensilsContainer");

const ingredientsListIcon = document.getElementById("ingredientsListIcon");
const appliancesListIcon = document.getElementById("appliancesListIcon");
const utensilsListIcon = document.getElementById("utensilsListIcon");

let recipies = [];
let filteredRecipies;

let ingredientsList = [];
let appliancesList = [];
let utensilsList = [];

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

        searchBar.addEventListener("input", onGeneralSearch);

        inputIngredients.addEventListener("focus", onIngredientFocus);
        inputIngredients.addEventListener("focusout", onIngredientFocusOut);
        ingredientsListIcon.addEventListener("click", onIngredientClick);

        inputAppliances.addEventListener("focus", onAppliancesFocus);
        inputAppliances.addEventListener("focusout", onAppliancesFocusOut);
        appliancesListIcon.addEventListener("click", onAppliancesClick);

        inputUtensils.addEventListener("focus", onUtensilsFocus);
        inputUtensils.addEventListener("focusout", onUtensilsFocusOut);
        utensilsListIcon.addEventListener("click", onUtensilsClick);
    }
}

function setIngredientsList() {
    filteredRecipies = recipies.filter(recipe => recipe.onScreen);
    ingredientsList = [];

    for (let recipe of filteredRecipies) {
        for (let list of recipe.ingredients) {
            if (!ingredientsList.includes(list.ingredient)) ingredientsList.push(list.ingredient);
        }
    }

    for (const ingredient of ingredientsList) {
        document.getElementById("ingredients").innerHTML += '<p>' + ingredient + '</p>';
    }
}

function setAppliancesList() {
    filteredRecipies = recipies.filter(recipe => recipe.onScreen);
    appliancesList = [];

    for (let recipe of filteredRecipies) {
            if (!appliancesList.includes(recipe.appliance)) appliancesList.push(recipe.appliance);
    }

    for (const appliance of appliancesList) {
        document.getElementById("appliances").innerHTML += '<p>' + appliance + '</p>';
    }
}

function setUtensilsList() {
    filteredRecipies = recipies.filter(recipe => recipe.onScreen);
    utensilsList = [];

    for (let recipe of filteredRecipies) {
        for (let ustensil of recipe.ustensils) {
            if (!utensilsList.includes(ustensil)) utensilsList.push(ustensil);
        }
    }

    for (const utensil of utensilsList) {
        document.getElementById("utensils").innerHTML += '<p>' + utensil + '</p>';
    }
}

////////////////// ! Ingredients

function onIngredientClick(event) {
    inputIngredients.focus();
    ingredientsListIcon.removeEventListener("click", onIngredientClick);
}

function onIngredientFocus(event) {
    inputIngredients.setAttribute("placeholder", "Rechercher un ingrédient");

    let filteredIngredientsWidth = document.getElementById("ingredients").clientWidth;
    if (filteredIngredientsWidth > 200) ingredientContainer.style.width = filteredIngredientsWidth + "px";
    else ingredientContainer.style.width = "300px";

    let filteredIngredientsHeight = document.getElementById("ingredients").offsetHeight ;
    ingredientContainer.style.height = (23 + filteredIngredientsHeight) + "px";
    document.getElementById("ingredients").style.opacity = "1";

    toggleIcon(ingredientsListIcon);
}

function onIngredientFocusOut(event) {
    inputIngredients.setAttribute("placeholder", "Ingrédients");
    inputIngredients.value = '';

    document.getElementById("ingredients").style.opacity = "0";
    ingredientContainer.style.width = "150px";
    ingredientContainer.style.height = "23px";
    
    ingredientsListIcon.addEventListener("click", onIngredientClick);
    toggleIcon(ingredientsListIcon);
}

////////////////// ? Appliances 

function onAppliancesClick(event) {
    inputAppliances.focus();
    appliancesListIcon.removeEventListener("click", onAppliancesClick);
}

function onAppliancesFocus(event) {
    inputAppliances.setAttribute("placeholder", "Rechercher un appareil");

    let filteredAppliancesWidth = document.getElementById("appliances").clientWidth;
    if (filteredAppliancesWidth > 200) appliancesContainer.style.width = filteredAppliancesWidth + "px";
    else appliancesContainer.style.width = "300px";

    let filteredIngredientsHeight = document.getElementById("appliances").offsetHeight;
    appliancesContainer.style.height = (23 + filteredIngredientsHeight) + "px";
    document.getElementById("appliances").style.opacity = "1";
    toggleIcon(appliancesListIcon);
}

function onAppliancesFocusOut(event) {
    inputAppliances.setAttribute("placeholder", "Appareils");
    inputAppliances.value = '';

    document.getElementById("appliances").style.opacity = "0";
    appliancesContainer.style.width = "150px";
    appliancesContainer.style.height = "23px";

    appliancesListIcon.addEventListener("click", onAppliancesClick);
    toggleIcon(appliancesListIcon);
}

////////////////// * Utensils

function onUtensilsClick(event) {
    inputUtensils.focus();
    utensilsListIcon.removeEventListener("click", onUtensilsClick);
}

function onUtensilsFocus(event) {
    inputUtensils.setAttribute("placeholder", "Rechercher un ustensile");

    let filteredUtensilsWidth = document.getElementById("utensils").clientWidth;
    if (filteredUtensilsWidth > 200) utensilsContainer.style.width = filteredUtensilsWidth + "px";
    else utensilsContainer.style.width = "300px";

    let filteredIngredientsHeight = document.getElementById("utensils").offsetHeight ;
    utensilsContainer.style.height = (23 + filteredIngredientsHeight) + "px";
    document.getElementById("utensils").style.opacity = "1";
    toggleIcon(utensilsListIcon);
}

function onUtensilsFocusOut(event) {
    inputUtensils.setAttribute("placeholder", "Ustensiles");
    inputUtensils.value = '';

    document.getElementById("utensils").style.opacity = "0";
    utensilsContainer.style.width = "150px";
    utensilsContainer.style.height = "23px";

    utensilsListIcon.addEventListener("click", onUtensilsClick);
    toggleIcon(utensilsListIcon);
}

function toggleIcon(listIcon) {
    if (listIcon.style.transform == "rotate(180deg)") {
        listIcon.style.transform = "rotate(0deg)";
    } else {
        listIcon.style.transform = "rotate(180deg)";
    }
}

function onGeneralSearch(event) {

    for (let recipe of recipies) recipe.appendChild();
    document.getElementById("ingredients").innerHTML = '';
    document.getElementById("appliances").innerHTML = '';
    document.getElementById("utensils").innerHTML = '';

    if (searchReg.test(event.target.value)) {
        for (let recipe of recipies) {
            if (!isWordInTitle(recipe, event) && !isWordInIngredients(recipe, event) && !isWordInDescription(recipe, event)) {
                recipe.removeChild();
            }
        }
        setIngredientsList();
        setAppliancesList();
        setUtensilsList();
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