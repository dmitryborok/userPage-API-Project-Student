

class DataManager {
    static urlUser = "https://randomuser.me/api/?results=7&inc=name,location,picture";
    static urlKanyeWestQuotation = "https://api.kanye.rest";
    static urlPokemon = "https://pokeapi.co/api/v2/pokemon";
    static urlEndpointPokemonAll = "?limit=100000&offset=0";
    static urlMeat = "https://baconipsum.com/api/?type=meat-and-filler&paras=1";
    static queryHeroku = "https://random-word-api.herokuapp.com/word";
    static myApiKeyHeroku = "aoAgVNwWXZshSsdfrOy2a0sW89UdNCZK";

    constructor() {
        this._user = {};
        this._friends = [];
        this._quotation = "";
        this._meatText = "";
        this._pokemon = {};
        this._isSaved = false;
        this._gif = "";
    }


    set user(userData) {
        this._user = {name: {
                        first: userData.name.first,
                        last: userData.name.last
                    },
                 location: {
                    city: userData.location.city,
                    country: userData.location.country
                 },
                 picture: userData.picture
                }
    }

    get user() {
        return this._user;
    }

    set friends(friendsData) {
        this._friends = [];
        for (let friend of friendsData) {
            this._friends.push(
                        {name: {
                                first: friend.name.first,
                                last: friend.name.last
                            }
                        });
        }
    }
    
    setUserAndFriends(users) {
        this.user = users.results[0];
        users.results.shift();
        this.friends = users.results;
    }

    get friends() {
        return this._friends;
    }

    set quotation(quotationString) {
        this._quotation = quotationString;
    }

    get quotation() {
        return this._quotation;
    }

    set meatText(meatTextString) {
        this._meatText = meatTextString;
    }

    get meatText() {
        return this._meatText;
    }

    get pokemon() {
        return this._pokemon;
    }

    get gif() {
        return this._gif;
    }

    saveToLocalStorage() {
        if (this._isSaved) return;
        const usersJSON = localStorage.getItem("users");
        if ((usersJSON === 'undefined') || (usersJSON === null)) { 
            localStorage.setItem("users", JSON.stringify([this]));
        } else {
            const users = JSON.parse(usersJSON);
            users.push(this);
            localStorage.setItem("users", JSON.stringify(users)); 
        } 
        this._isSaved = true;
    }

    getUserNamesFromLocalStorage() {
        const usersJSON = localStorage.getItem("users");
        if ((usersJSON === 'undefined') || (usersJSON === null)) { 
            return [];
        } else {
            const users = JSON.parse(localStorage.getItem("users")); 
            return users.map(item => (item._user));
        }
    }
    
    loadUserFromLocalStorage(index)
    {    
        const usersJSON = localStorage.getItem("users");
        if ((usersJSON === 'undefined') || (usersJSON === null)) {
            console.log("key 'users' undefined in localStorage")
            return;
        }
        const users = JSON.parse(usersJSON);
        if ((index < 0) || (index >= users.length)) {
            console.log(`index ${index} out of range: users.length === ${users.length}`)
            return;
        }

        for (let key in this) {
             this[key] = users[index][key];
        }
        this._isSaved = true;
    }

    clearLocalStorage() {
        localStorage.removeItem("users");
        this._isSaved = false;
    }

    static getApi(url) {
        return new Promise((resolve, reject) => 
            $.ajax({method: "GET", 
                    url: url,
                    success: (data) => resolve(data),
                    reject: (err) => reject(err)
                    }))
    }
    
    async setRandomUserAndFriendsFromApi() {
        const userData = await DataManager.getApi(DataManager.urlUser);
        const firstUser = userData.results[0];
        this._user = {name: {
                        first: firstUser.name.first,
                        last: firstUser.name.last
                    },
                    location: {
                        city: firstUser.location.city,
                        country: firstUser.location.country
                    },
                    picture: firstUser.picture
                    }
        userData.results.shift();
        this.friends = userData.results;
        this._isSaved = false;
    }

    static randomPokemonName(pokemons) {
        const pokemonNo = Math.floor(Math.random()*pokemons.count);
        return pokemons.results[pokemonNo].name;
    } 

    async setPokemonFromApi () {
        const pokemons = await DataManager.getApi(DataManager.urlPokemon + DataManager.urlEndpointPokemonAll);
        const pokemon = await DataManager.getApi(DataManager.urlPokemon + "/" + DataManager.randomPokemonName(pokemons));
        const arrPokemonGif = await DataManager.getApi(DataManager.queryGiphy(pokemon.name));
        this._pokemon.pokeName = pokemon.name; 
        this._pokemon.pokeImg = pokemon.sprites.front_default; 
        if (arrPokemonGif.data.length === 0) {
            this._gif = "";
        } else {
            this._gif = arrPokemonGif.data[0].embed_url;
        }
        this._isSaved = false;
    }

    async setRandomKanyeWestQuotationFromApi() {
        const dataFromApi = await DataManager.getApi(DataManager.urlKanyeWestQuotation);
        this._quotation = dataFromApi.quote;
        this._isSaved = false;
    }
    
    async setMeatTextFromApi() {
        const dataFromApi = await DataManager.getApi(DataManager.urlMeat);
        this._meatText = dataFromApi.join();
        this._isSaved = false;
    }

    static queryGiphy(word) {
        return `https://api.giphy.com/v1/gifs/search?q=${word}&api_key=${DataManager.myApiKeyHeroku}`;
    }

    
}