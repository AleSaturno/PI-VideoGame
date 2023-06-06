const {Videogame} = require('../db');

const postVideogame = async (req , res) =>{
    try {
        const postGame = await Videogame.create(req.body)
        await postGame.setGenres(req.body.genres)
        const dbGames = await Videogame.findAll({
            where : {name : req.body.name}
        })
        res.status(200).json(dbGames)
    } catch (error) {
        res.status(400).send(error.message)
        
    }
}

module.exports = postVideogame;