const {Videogame , Genre} = require('../db')
const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env

const getVideogamesById = async(req , res) =>{

    try {
        // Si el id llega por props es un numero , lo busco en la API. Si no, los busca en DB
        const {id} = req.params;
        if(!isNaN(id)){
            const games = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            res.status(200).json(games.data);
        }else{
            const games = await Videogame.findByPk(id,{
                include: [{
                    model:Genre,
                    attributes: ['name'],
                    through:{
                        attributes: []
                    }
                }]
            });
            console.log(games);
            res.status(200).json(games);
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = getVideogamesById;