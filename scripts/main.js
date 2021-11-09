import DisplayManager from './displayManager.js';

class Main {

    url = "https://raw.githubusercontent.com/jeireme/JeremiePiard_7_02092021/master/data/recipes.json";

    constructor() {
        this._fetchData();
    }

    async _fetchData() {
        try {
            const data = await fetch(this.url);
            if (data) {
                const json = await data.json();
                let display = new DisplayManager(json);
                display.homepage();
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Main();
});