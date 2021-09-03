import DisplayManager from './displayManager.js';

const url = "https://raw.githubusercontent.com/jeireme/JeremiePiard_7_02092021/master/data/recipes.json";
// const url = "../data/recipes.json";

fetch(url).then(response => {
        if (response.ok) return response.json();
        else throw new Error('Something went wrong');
    })
    .then(datas => {
        let display = new DisplayManager(datas);
        display.homepage();
    })
    .catch((error) => {
        console.log(error)
    });