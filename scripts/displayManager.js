import Recipe from './recipe.js';

const recipiesContainer = document.getElementById("recipies");
const message = document.getElementById("message");

const searchBar = document.getElementById("searchBar");
const searchReg = new RegExp(/[a-zA-Z]{3,}/);

const inputIngredients = document.getElementById("inputIngredients");
const ingredientContainer = document.getElementById("ingredientContainer");
const ingredientsListIcon = document.getElementById("ingredientsListIcon");

const inputAppliances = document.getElementById("inputAppliances");
const appliancesContainer = document.getElementById("appliancesContainer");
const appliancesListIcon = document.getElementById("appliancesListIcon");

const inputUtensils = document.getElementById("inputUtensils");
const utensilsContainer = document.getElementById("utensilsContainer");
const utensilsListIcon = document.getElementById("utensilsListIcon");

const tagsContainer = document.getElementsByClassName("search__tags")[0];
// const ingredientTags = document.getElementsByClassName("tagIngredient");
// const applianceTags = document.getElementsByClassName("tagAppliance");
// const utensilTags = document.getElementsByClassName("tagUtensils");
let ingredientTags;
let applianceTags;
let utensilTags;

let recipies = [];
let filteredRecipies;

let searchedRecipies;
let filteredByTagsRecipies = [];

let filtersList = document.getElementsByClassName("filter");
let tagsList = [];

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
            recipe.init();
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

////////////////// ? Ingredients

function onIngredientClick(event) {
    inputIngredients.focus();
    ingredientsListIcon.removeEventListener("click", onIngredientClick);
}

function onIngredientFocus(event) {

    setTimeout(function () {
        inputIngredients.setAttribute("placeholder", "Rechercher un ingrédient");
    }, 250);

    let filteredIngredientsWidth = document.getElementById("ingredients").clientWidth;
    if (filteredIngredientsWidth > 200) ingredientContainer.style.width = filteredIngredientsWidth + "px";
    else ingredientContainer.style.width = "300px";

    let filteredIngredientsHeight = document.getElementById("ingredients").offsetHeight;
    ingredientContainer.style.height = (23 + filteredIngredientsHeight) + "px";
    document.getElementById("ingredients").style.opacity = "1";

    toggleIcon(ingredientsListIcon);
}

function onIngredientFocusOut(event) {

    setTimeout(function () {
        inputIngredients.setAttribute("placeholder", "Ingrédients");
        inputIngredients.value = '';
    }, 250);

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

    setTimeout(function () {
        inputAppliances.setAttribute("placeholder", "Rechercher un appareil");
    }, 250);

    let filteredAppliancesWidth = document.getElementById("appliances").clientWidth;
    if (filteredAppliancesWidth > 200) appliancesContainer.style.width = filteredAppliancesWidth + "px";
    else appliancesContainer.style.width = "300px";

    let filteredIngredientsHeight = document.getElementById("appliances").offsetHeight;
    appliancesContainer.style.height = (23 + filteredIngredientsHeight) + "px";
    document.getElementById("appliances").style.opacity = "1";
    toggleIcon(appliancesListIcon);
}

function onAppliancesFocusOut(event) {

    setTimeout(function () {
        inputAppliances.setAttribute("placeholder", "Appareils");
        inputAppliances.value = '';
    }, 250);

    document.getElementById("appliances").style.opacity = "0";
    appliancesContainer.style.width = "150px";
    appliancesContainer.style.height = "23px";

    appliancesListIcon.addEventListener("click", onAppliancesClick);
    toggleIcon(appliancesListIcon);
}

////////////////// ? Utensils

function onUtensilsClick(event) {
    inputUtensils.focus();
    utensilsListIcon.removeEventListener("click", onUtensilsClick);
}

function onUtensilsFocus(event) {

    setTimeout(function () {
        inputUtensils.setAttribute("placeholder", "Rechercher un ustensile");
    }, 250);

    let filteredUtensilsWidth = document.getElementById("utensils").clientWidth;
    if (filteredUtensilsWidth > 200) utensilsContainer.style.width = filteredUtensilsWidth + "px";
    else utensilsContainer.style.width = "300px";

    let filteredIngredientsHeight = document.getElementById("utensils").offsetHeight;
    utensilsContainer.style.height = (23 + filteredIngredientsHeight) + "px";
    document.getElementById("utensils").style.opacity = "1";
    toggleIcon(utensilsListIcon);
}

function onUtensilsFocusOut(event) {

    setTimeout(function () {
        inputUtensils.setAttribute("placeholder", "Ustensiles");
        inputUtensils.value = '';
    }, 250);

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

    document.getElementById("ingredients").innerHTML = '';
    document.getElementById("appliances").innerHTML = '';
    document.getElementById("utensils").innerHTML = '';

    // if (tagsList.length > 0) deleteAllTags();

    for (let recipe of recipies) {
        recipe.searched = true;
        recipe.appendChild();
    }

    if (searchReg.test(event.target.value)) {
        for (let recipe of recipies) {
            if (!isWordInTitle(recipe, event.target.value) && !isWordInIngredients(recipe, event.target.value) && !isWordInDescription(recipe, event.target.value)) {
                recipe.searched = false;
                recipe.removeChild();
            }
        }
        searchedRecipies = recipies.filter(recipe => recipe.searched);
        setFiltersList();
    }
    recipiesContainer.hasChildNodes() ? message.style.display = "none" : message.style.display = "flex";
}

function hasTagAlreadyBeenSelected(event) {
    for (const tag of tagsList) {
        if (tag.name == event.target.innerText) {
            tag.classList.add("alreadySelected");
            setTimeout(function () {
                tag.classList.remove("alreadySelected");
            }, 1500);
            return;
        }
    }
    generateNewTag(event);
}

function generateNewTag(event) {
    let tag = document.createElement('div');
    let tagName = event.target.innerText;

    if (event.target.classList.contains("isIngredient")) {
        tag.innerHTML = '<p><span class="search__tags__name">' + tagName + '</span><i class="far fa-times-circle"></i></p>';
        tag.type = "ingredient";
        tag.name = tagName;
    } else if (event.target.classList.contains("isAppliance")) {
        tag.innerHTML = '<p><span class="search__tags__name">' + tagName + '</span><i class="far fa-times-circle"></i></p>';
        tag.type = "appliance";
        tag.name = tagName;
    } else if (event.target.classList.contains("isUtensil")) {
        tag.innerHTML = '<p><span class="search__tags__name">' + tagName + '</span><i class="far fa-times-circle"></i></p>';
        tag.type = "utensil";
        tag.name = tagName;
    }

    tag.classList.add("animationTag");
    setTimeout(function () {
        tag.classList.remove("animationTag");
    }, 1500);
    tag.querySelector('i').addEventListener("click", deleteTags);
    tagsList.push(tag);

    onFilterSearch();
    setFiltersList();

    if (tagsContainer.style.height < "60px") {
        tagsContainer.style.height = "60px";
        setTimeout(function () {
            tagsContainer.appendChild(tag);
        }, 250);
    } else tagsContainer.appendChild(tag);
}

function onFilterSearch() {

    for (const recipe of searchedRecipies) {
        recipe.selectedByTags = true;
        recipe.appendChild();
        if (isRecipeNotSelectedByTags(recipe)) {
            recipe.selectedByTags = false;
            recipe.removeChild();
        }
    }

    filteredByTagsRecipies = searchedRecipies.filter(recipe => recipe.selectedByTags);

    recipiesContainer.hasChildNodes() ? message.style.display = "none" : message.style.display = "flex";
}

function setFiltersList() {

    document.getElementById("ingredients").innerHTML = '';
    document.getElementById("appliances").innerHTML = '';
    document.getElementById("utensils").innerHTML = '';

    filteredRecipies = (filteredByTagsRecipies.length > 0) ? filteredByTagsRecipies : searchedRecipies;

    setIngredientsList();
    setAppliancesList();
    setUtensilsList();

    for (let filter of filtersList) {
        filter.addEventListener("click", hasTagAlreadyBeenSelected);
    }
}

function setIngredientsList() {

    ingredientsList = [];

    for (let recipe of filteredRecipies) {
        for (let list of recipe.ingredients) {
            if (!ingredientsList.includes(list.ingredient)) ingredientsList.push(list.ingredient);
        }
    }

    for (const ingredient of ingredientsList) {
        document.getElementById("ingredients").innerHTML += '<p class="filter isIngredient">' + ingredient + '</p>';
    }
}

function setAppliancesList() {
    appliancesList = [];

    for (let recipe of filteredRecipies) {
        if (!appliancesList.includes(recipe.appliance)) appliancesList.push(recipe.appliance);
    }

    for (const appliance of appliancesList) {
        document.getElementById("appliances").innerHTML += '<p class="filter isAppliance">' + appliance + '</p>';
    }
}

function setUtensilsList() {
    utensilsList = [];

    for (let recipe of filteredRecipies) {
        for (let ustensil of recipe.ustensils) {
            if (!utensilsList.includes(ustensil)) utensilsList.push(ustensil);
        }
    }

    for (const utensil of utensilsList) {
        document.getElementById("utensils").innerHTML += '<p class="filter isUtensil">' + utensil + '</p>';
    }
}

function isRecipeNotSelectedByTags(recipe) {
    return (tagsList.length > 0) && !(isRecipeSelectedByIngredientTags(recipe.ingredientsList) && isRecipeSelectedByApplianceTags(recipe.appliance) && isRecipeSelectedByUtensilTags(recipe.utensilsList));
}

function isRecipeSelectedByIngredientTags(recipeIngredients) {
    ingredientTags = tagsList.filter(tag => tag.type == "ingredient");
    if (ingredientTags.length == 0) return true;
    for (const ingredientTag of ingredientTags) {
        if (!recipeIngredients.includes(ingredientTag.name.toLowerCase())) return false;
    }
    return true;
}

function isRecipeSelectedByApplianceTags(recipeAppliance) {
    applianceTags = tagsList.filter(tag => tag.type == "appliance");
    if (applianceTags.length == 0) return true;
    for (const applianceTag of applianceTags) {
        if (recipeAppliance.toLowerCase() == applianceTag.name.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function isRecipeSelectedByUtensilTags(recipeUtensils) {

    utensilTags = tagsList.filter(tag => tag.type == "utensil");
    if (utensilTags.length == 0) return true;
    for (const utensilTag of utensilTags) {
        if (!recipeUtensils.includes(utensilTag.name.toLowerCase())) return false;
    }
    return true;
}

function deleteTags(event) {
    let tagDiv = event.target.closest('div');

    // new list of tags without the deleted one
    tagsList = tagsList.filter(tag => tag.name != tagDiv.innerText);

    tagsContainer.removeChild(tagDiv);
    onFilterSearch();
    setFiltersList();
    isTagsListEmpty();
}

function isTagsListEmpty() {
    if (!tagsContainer.hasChildNodes()) tagsContainer.style.height = "0px";
}

function isWordInTitle(recipe, word) {
    return recipe.name.toLowerCase().includes(word.toLowerCase());
}

function isWordInDescription(recipe, word) {
    return recipe.description.toLowerCase().split(/[\s,\?\,\.!]+/).some(string => string === word.toLowerCase());
}

function isWordInIngredients(recipe, word) {
    for (let list of recipe.ingredients) {
        if (list.ingredient.toLowerCase().includes(word.toLowerCase())) return true;
    }
}

function deleteAllTags() {
    for (const tag of tagsList) {
        tagsContainer.removeChild(tag);
    }
    tagsContainer.style.height = "0px";
}