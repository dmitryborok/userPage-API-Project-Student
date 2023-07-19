let renderer = new Renderer();
let apiManager = new APIManager();
let dataManager = new DataManager();


const refresh = function() {
    apiManager.getRandomUser().then((data) => {
        dataManager.setUserAndFriends(data);
        renderer.renderUser(dataManager);
        renderer.renderFriends(dataManager);
    });

    apiManager.getRandomKanyeWestQuotation().then((data) => {
        dataManager.setQuotation(data);
        renderer.renderKanyeWestQuotation(dataManager);
    });

    apiManager.getAllPokemons()
        .then(pokemons => apiManager.getRandomPokemon(pokemons)
        .then(data => {
            dataManager.setPokemon(data);
            renderer.renderPokemon(dataManager)
        }));
        
    apiManager.getMeatText().then((data) => {
        dataManager.setMeatText(data);
        renderer.renderMeatText(dataManager);
    });
    
    // apis
    // generation

}

$("#generate-btn").on("click", function() {
    refresh();
})

$("#save-btn").on("click", function() {
    dataManager.saveToLocalStorage();
    alert("Current user saved to local storage");
})

$("#load-btn").on("click", function() {
    dataManager.getFromLocalStorage();
    renderer.renderAll(dataManager);
})

refresh();