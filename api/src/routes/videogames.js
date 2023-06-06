const { Router } = require('express')
const getVideogames = require('../controllers/getVideogames.js')
const postVideogame = require('../controllers/postVideogame.js')
const getVideogamesById = require('../controllers/getVideogamesByid.js')
const getVideogameByName = require('../controllers/getVideogameByName.js')


const router = Router()

router.get('/',getVideogameByName, getVideogames)

router.post('/', postVideogame)

router.get('/:id', getVideogamesById)

module.exports = router;