const { Router } = require('express');
require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');
const {Videogame} = require('../db');
const express = require('express');
const {Op} = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Informacion de la API en GET

const GetApiInfo = async () =>{
    const paginaDeJuegos = [];
    let apiURL = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    while(paginaDeJuegos.length < 5) {
        paginaDeJuegos.push(apiURL.data.results)
        apiURL = await axios.get(apiURL.data.next);
    }
    const apiInfo = paginaDeJuegos.flat().map((event) => {
        return ({
            id: event.id,
            name: event.name,
            image: e.background_image,
        })
    })
}


module.exports = router;
