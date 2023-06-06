const { Router } = require('express')
const getVideogames = require('../controllers/getVideogames')
const postVideogame = require('../controllers/postVideogame')
const getVideogamesById = require('../controllers/getVideogamesByid')
const getVideogamesByName = require('../controllers/getVideogamesByName')


const router = Router()

router.get('/',getVideogamesByName, getVideogames)

router.post('/', postVideogame)

router.get('/:id', getVideogamesById)

module.exports = router;