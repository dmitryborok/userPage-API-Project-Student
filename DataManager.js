class DataManager {
    constructor() {
        this._user = {};
        this._friends = [];
        this._quotation = "";
        this._meatText = "";
        this._pokemon = {};
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

    setQuotation(dataFromApi) {
        this._quotation = dataFromApi.quote;
    }

    setMeatText(dataFromApi) {
        this._meatText = dataFromApi.join();
    }

    setPokemon(dataFromApi) {
        this._pokemon.pokeName = dataFromApi.name; 
        this._pokemon.pokeImg = dataFromApi.sprites.front_default; 
    }
        
    saveToLocalStorage() {
        // for (let key in this) {
        //     localStorage.setItem(key, JSON.stringify(this[key]));
        // }
        localStorage.setItem("user", JSON.stringify(this));
    }

    getFromLocalStorage() {
        // for (let key in this) {
        //     this[key] = JSON.parse(localStorage.getItem(key));
        // }
        const thiscopy = JSON.parse(localStorage.getItem("user"));
        for (let key in this) {
             this[key] = thiscopy[key];
        }
    }
}