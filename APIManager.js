//This is the class that will manage all your APIs

class APIManager {
    constructor() {
        this.urlUser = "https://randomuser.me/api/?results=7&inc=name,location,picture";
        this.urlKanyeWestQuotation = "https://api.kanye.rest";
        this.urlPokemon = "https://pokeapi.co/api/v2/pokemon";
        this.urlEndpointPokemonAll = "?limit=100000&offset=0";
        this.urlMeat = "https://baconipsum.com/api/?type=meat-and-filler&paras=3";
    }

    getRandomUser() {
        return new Promise((resolve, reject) => 
            $.ajax({method: "GET", 
                    url: this.urlUser,
                    success: (data) => resolve(data),
                    reject: (err) => reject(err)
                    }))
    }
    
    getRandomKanyeWestQuotation() {
        return new Promise((resolve, reject) => 
            $.ajax({method: "GET", 
                    url: this.urlKanyeWestQuotation,
                    success: (data) => resolve(data),
                    reject: (err) => reject(err)
                    }))
    }
    
    getAllPokemons() {
        return new Promise((resolve, reject) => 
            $.ajax({method: "GET", 
                    url: this.urlPokemon + this.urlEndpointPokemonAll,
                    success: (data) => resolve(data),
                    reject: (err) => reject(err)
                    }))
    }
    
    getRandomPokemonName(pokemons) {
        const pokemonNo = Math.floor(Math.random()*pokemons.count);
        return pokemons.results[pokemonNo].name;
    } 
    
    getRandomPokemon(pokemons)  {
        return new Promise((resolve, reject) => 
            $.ajax({method: "GET", 
                    url: this.urlPokemon + "/" + this.getRandomPokemonName(pokemons),
                    success: (data) => resolve(data),
                    reject: (err) => reject(err)
                    }))
    }

    getMeatText() {
        return new Promise((resolve, reject) => 
            $.ajax({method: "GET", 
                    url: this.urlMeat,
                    success: (data) => resolve(data),
                    reject: (err) => reject(err)
                    }))
    }
    
}
