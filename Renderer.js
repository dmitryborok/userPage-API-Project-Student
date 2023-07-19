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

    constructor() {
        this.userContainer = $(".user-container");
        this.friendsContainer = $(".friends-container");
        this.pokemonContainer = $(".pokemon-container");
        this.loadSavedContainer = $(".load-saved-container");
        this.loadSaved = $(".load-saved");
        this.meatContainer = $(".meat-container");
    };


    renderUser(dataManager) {
        const source = $("#user-template").html();
        const template = Handlebars.compile(source);
        const newHTML = template(dataManager.user);
        this.userContainer.empty().append(newHTML);
        if (dataManager._isSaved) {
            this.userContainer.append(`<div id="user-saved">Saved</div>`)
        }
    }

    renderFriends(dataManager) {
        const source = $("#multiple-users-template").html();
        const template = Handlebars.compile(source);
        const newHTML = template({users: dataManager.friends});
        this.friendsContainer.empty().append(newHTML);
    }

    renderKanyeWestQuotation(dataManager) {
        $("#quote-text").html(dataManager.quotation);
        $("#quote-author").html("Kanye West");
    }

    renderPokemon(dataManager) {
        const source = $("#pokemon-template").html();
        const template = Handlebars.compile(source);
        const newHTML = template(dataManager.pokemon);
        this.pokemonContainer.empty().append(newHTML);
    }

    renderMeatText(dataManager) {
        this.meatContainer.empty().append(
            `<div id="meat-text">${dataManager.meatText}</div>`)
    }

    renderAll(dataManager) {
        this.renderUser(dataManager);
        this.renderFriends(dataManager);
        this.renderKanyeWestQuotation(dataManager);
        this.renderPokemon(dataManager);
        this.renderMeatText(dataManager);

    }

    renderLoadSaved(users, doShow) {
        if (doShow === undefined) {
            doShow = true;
        }
        if (!doShow)   {
            this.loadSaved.css("display", "none");
        } else if (this.loadSaved.is(":hidden")) {
            this.loadSaved.children().first().html(users.length === 0 ? "No Saved Users" : "Load Saved Users");
            const source = $("#multiple-users-template").html();
            const template = Handlebars.compile(source);
            const usersFormattedArray = users.map(item => (item._user)); // temporary solution 
            const newHTML = template({users: usersFormattedArray});
            this.loadSavedContainer.empty().append(newHTML);
            this.loadSaved.css("display", "inline-block");
        } else {
            this.loadSaved.css("display", "none");
        }
    }


}
