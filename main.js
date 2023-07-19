let renderer = new Renderer();
// let apiManager = new APIManager();
let dataManager = new DataManager();


const refreshUserAndFriends = async function() {
    await dataManager.setRandomUserAndFriendsFromApi();
    renderer.renderUser(dataManager);
    renderer.renderFriends(dataManager);
}

const refreshRandomKanyeWestQuotation = async function() {
    await dataManager.setRandomKanyeWestQuotationFromApi();
    renderer.renderKanyeWestQuotation(dataManager);    
} 

const refreshPokemons = async function() {
    await dataManager.setPokemonFromApi();
    renderer.renderPokemon(dataManager);    
} 

const refreshMeat = async function() {
    await dataManager.setMeatTextFromApi();
    renderer.renderMeatText(dataManager);    
} 

const refreshAll = function() {
    refreshUserAndFriends();
    refreshRandomKanyeWestQuotation();
    refreshPokemons();
    refreshMeat();
}

$("#generate-btn").on("click", function() {
    refreshAll();
})

$("#save-btn").on("click", function() {
    dataManager.saveToLocalStorage();
    renderer.renderUser(dataManager);
    console.log(localStorage["users"]);
})

$(document).click(function(){
    $(".load-saved").hide();
  });
  

$("#load-btn").on("click", function(ev) {
    renderer.renderLoadSaved(dataManager.getUserNamesFromLocalStorage());
    ev.stopPropagation();
    console.log(localStorage["users"]);
})

$(".load-saved-container").on("click", "li", function (ev) {
    const index = $(this).index();
    dataManager.loadUserFromLocalStorage(index);
    renderer.renderLoadSaved(null, false);
    renderer.renderAll(dataManager);
    ev.stopPropagation();
    console.log(localStorage["users"]);
})

$("#clear-btn").on("click", function() {
    dataManager.clearLocalStorage();
    renderer.renderUser(dataManager);
})

refreshAll();