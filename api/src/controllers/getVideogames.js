const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const {Videogame , Genre} = require('../db');

const getVideogames = async (req, res) => {
    try {
        // Se crea un arreglo, mientras se inserta los llamados de axios
        const promises = [];
        for (let i = 1; i < 6; i++){
            let apiGet = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
            promises.push(apiGet);
        };

        // Se le aplica la PromiseAll al arreglo de axios y se guarda el resultado mapeado en un nuevo array
        promises = (await Promise.all(promises)).map(prom => prom.data.results.map(videogame => {
            return{
                id: videogame.id,
                name: videogame.name,
                background_image: videogame.background_image,
                rating: videogame.rating,
                genres: videogame.genres.map(genres =>{
                    return{
                        name: genres.name,
                    }
                }),

            }
        }))
        // Para que quede un solo array, se crea una nueva variable con un array vacio y se le concatena cada uno de los arrays de las respuestas de la promesas.

        const allVideogames = [];
        promises.map(games => {allVideogames = allVideogames.concat(games)})
        // Ahora se traen los juegos que pueda tener la db y se los concaquetena con allVideogames

        let dbVideogames = await Videogame.findAll({
            attributes:['id', 'name' , 'background_image' , 'rating'],
            include: [{
                model: Genre,
                attributes: ['name'],
                throught: {
                    attributes: []
                }
            }]
        })
        const respuesta = [...dbVideogames, ...allVideogames]
        res.status(200).json(respuesta)

    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = getVideogames;