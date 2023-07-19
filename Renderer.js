function toUpperFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
}

const toSentenceCase = function(str) {
    let words = str.split(" ");
    let sentenceCaseWords = words.map(word => toUpperFirst(word));
    return sentenceCaseWords.join();
} 

Handlebars.registerHelper('sentenceCase', function (str) {
    return toSentenceCase(str);
})



class Renderer {

    // шаблон для работы с Handlebars
    // const renderApts = function (data) {
    //     $("#results").empty()
    //     console.log(data)     //array of apartments to render
    
    //     const source = $("#apartment-template").html();
    //     const template = Handlebars.compile(source);
    //     let newHTML = template({apartments: data});
    //     $("#results").append(newHTML);
    // }
    constructor() {};

    // renderUserAndFriends(users) {
    //     let source = $("#user-template").html();
    //     let template = Handlebars.compile(source);
    //     let newHTML = template(users.results[0]);
    //     $(".user-container").html("").append(newHTML);

    //     users.results.shift();
    //     source = $("#friends-template").html();
    //     template = Handlebars.compile(source);
    //     newHTML = template({friends: users.results});
    //     $(".friends-container").append(newHTML);
    // }

    renderUser(dataManager) {
        const source = $("#user-template").html();
        const template = Handlebars.compile(source);
        const newHTML = template(dataManager.user);
        const container = $(".user-container"); 
        container.children().not(':first').remove();
        container.append(newHTML);
    }

    renderFriends(dataManager) {
        const source = $("#friends-template").html();
        const template = Handlebars.compile(source);
        const newHTML = template({friends: dataManager.friends});
        const container = $(".friends-container"); 
        container.children().not(':first').remove();
        container.append(newHTML);
    }

    // renderKanyeWestQuotation(data) {
    //     $("#quote-text").html(data.quote);
    //     $("#quote-author").html("Kanye West");
    // }

    renderKanyeWestQuotation(dataManager) {
        $("#quote-text").html(dataManager.quotation);
        $("#quote-author").html("Kanye West");
    }

    // renderPokemon(data) {
    //     const pokeName = data.name;
    //     const pokeImg = data.sprites.front_default;
    //     const source = $("#pokemon-template").html();
    //     const template = Handlebars.compile(source);
    //     const newHTML = template({pokeImg: pokeImg, pokeName: pokeName});
    //     const container = $("#pokemon-container"); 
    //     container.children().not(':first').remove();
    //     container.append(newHTML);

    //     // const divPokeContainer = $("#pokemon-container");
    //     // divPokeContainer.html("");
    //     // divPokeContainer.append(
    //     //     `<img id="pokemon-image" src="${pokeImg}">
    //     //     <div id="pokemon-text">Favourite Pokemon: ${pokeName}</div>`)
    // }

    renderPokemon(dataManager) {
        const source = $("#pokemon-template").html();
        const template = Handlebars.compile(source);
        const newHTML = template(dataManager.pokemon);
        const container = $("#pokemon-container"); 
        container.children().not(':first').remove();
        container.append(newHTML);
    }

    renderMeatText(data) {
        const meatText = data.join();
        const divMeatContainer = $("#meat-container");
        divMeatContainer.html("");
        divMeatContainer.append(
            `<div id="meat-text">${meatText}</div>`)
    }

    renderMeatText(dataManager) {
        const divMeatContainer = $("#meat-container");
        divMeatContainer.html("");
        divMeatContainer.append(
            `<div id="meat-text">${dataManager.meatText}</div>`)
    }

    renderAll(dataManager) {
        this.renderUser(dataManager);
        this.renderFriends(dataManager);
        this.renderKanyeWestQuotation(dataManager);
        this.renderPokemon(dataManager);
        this.renderMeatText(dataManager);

    }

}
