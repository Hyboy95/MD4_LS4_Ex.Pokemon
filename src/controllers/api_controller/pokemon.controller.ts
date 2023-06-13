import axios from "axios";

export class PokemonController {
    static async getAllPokemon(req: any, res: any) {
        try {
            let page = req.query.page ? +req.query.page : 1;
            let limit = req.query.limit ? +req.query.limit : 12;
            let totalPage = 4;
            let offset = (page - 1) * limit;
            const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
            const response = await axios.get(url);
            const pokemons = response.data.results;

            if (pokemons) {
                const dataArray = [];
                for (const pokemon of pokemons) {
                    let name = pokemon.name;
                    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
                    const response = await axios.get(url);
                    const image = response.data.sprites.front_default;
                    const id = response.data.id;
                    dataArray.push({
                        id: id,
                        name: name,
                        image: image
                    })
                }
                res.render("home", { pokemons: dataArray, totalPage: totalPage, limit: limit, pageCurrent: page })
            } else {
                res.end('<h1>Error<h1>')
            }
        } catch (err) {
            console.log(err.message);
            res.end('<h1>Error<h1>');
        }
    }
    static async getDetailPokemon(req: any, res: any) {
        try {
            let id = req.params.id;
            let page = req.query.page ? +req.query.page : 1;
            let limit = req.query.limit ? +req.query.limit : 12;
            if (id) {
                const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
                const response = await axios.get(url);
                const data = response.data;
                let skillArray = data.abilities;
                let skills = [];
                skillArray.forEach((element: any) => {
                    skills.push(element.ability.name)
                });
 
                const pokemonDetail = {
                    id: id,
                    skills: skills,
                    name: data.name,
                    height: data.height,
                    base_experience: data.base_experience,
                    image: data.sprites.front_default
                }
                
                res.render ('detail', {pokemon: pokemonDetail, pageCurrent: page, limit: limit});
            } else {
                res.end('<h1>Error<h1>');
            }
        } catch (err) {
            console.log(err.message);
            res.end('<h1>Error<h1>');
        }
    }
}