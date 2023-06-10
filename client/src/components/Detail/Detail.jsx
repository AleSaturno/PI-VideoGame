import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios';

const Detail = () =>{

    const{id} = useParams();
    const [gameDetail, setGameDetail] = useState({})

    useEffect(()=>{
        const getAxios = async() =>{
            const detail = await axios.get(`http://localhost:3001/videogames/${id}`)
            setGameDetail(detail.data)
        }
        getAxios()
    },[id])

    return(
        <div>
            <h1>{gameDetail.name}</h1>
            <h2>Genres: {gameDetail.genres.map((genre => genre.name).join(','))}</h2>
            <h2>Rating: {gameDetail.rating} </h2>
            <h2>Platforms: {gameDetail.platforms}</h2>
            <h2>Released: {gameDetail.realesed}</h2>

        </div>
    )
}


export default Detail