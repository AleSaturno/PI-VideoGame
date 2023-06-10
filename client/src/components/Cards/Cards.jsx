import Card from '../Card/Card';
import {useState} from 'react';
import { useSelector } from 'react-redux';



const Cards = () =>{

    const buttons = [];
    const allGames = games.map(game =>{
        return{
            ...game,
            genres: game.genres.map(genre => genre.name).join(', '),
        }

    })
   let message = 'Cargando';
   const [page, setPage] = useState(0);
   const [genre , setGenre] = useState('');
   const [orderAlf , setOrderAlf] = useState('');
   const [orderRtg , setOrderRtg] = useState('');
   const [origin , setOrigin] = useState('');
   const genres = useSelector(state => state.genres);

   const handlePage = (event) => {
        setPage(event.target.value*15);
    }

    const handlePagePrev = () => {
        setPage(page - 15)
    }
    const handlePageNext = () => {
        setPage(page + 15)
    }
    const handleFilterByGenre = (event) => {
        setGenre(event.target.value)
        page>0 && setPage(0)
    }
    const handleFilterByOrg = (event) => {
        setOrigin(event.target.value)
    }
    const handleOrderAlf = (event) => {
        setOrderAlf(event.target.value)
        setOrderRtg('')
    }
    const handleOrderRtg = (event) => {
        setOrderRtg(event.target.value)
        setOrderAlf('')
    }



    if (genre !== '') {
        allGames = allGames.filter(game => game.genres.includes(genre))
        if(!allGames.length) message = 'No hay juegos con ese genero.'
    }
    
    if(origin === 'api') {
        allGames = allGames.filter(game => !isNaN(game.id))
    }
    
    if(origin === 'db') {
        allGames = allGames.filter(game => isNaN(game.id))
        if(!allGames.length)  message = 'No hay juegos en la base de datos con esa especificación.'
    }
    
    if(origin === 'all') {
        allGames = games;
        setOrigin('')
        if(!genre.length)setGenre('')
    }

    for(let i = 1; i <= Math.ceil(allGames.length/15); i++){
        buttons.push(i)
    }
    
    if(orderAlf === 'A-Z'){
        allGames.sort((x,y) => {
            if(x.name < y.name)return -1;
            if(x.name > y.name)return 1;
            return 0;
        })
    }
    if(orderAlf === 'Z-A'){
        allGames.sort((x,y) => {
            if(x.name < y.name)return  1;
            if(x.name > y.name)return -1;
            return 0;
        })
    }
    if(orderRtg === 'Ascending'){
        allGames.sort((x,y) => x.rating - y.rating)
    }
    if(orderRtg === 'Descending'){
        allGames.sort((x,y) => y.rating - x.rating)
    }

    return(
        <div className='filter'>
        {genres.map(genre => <button value={genre.name} onClick={handleFilterByGenre} key={genre.id}>{genre.name}</button>)}
       </div>,
       <div className='filter'>
        <button onClick={handleFilterByOrg} value='api' > Site Games </button>    
        <button onClick={handleFilterByOrg} value='db' > Users Games </button>    
        <button onClick={handleFilterByOrg} value='all' > All Games </button>    
        <button onClick={handleOrderAlf} value='A-Z' >&uArr;&dArr; A-Z </button>
        <button onClick={handleOrderAlf} value='Z-A' >&uArr;&dArr; Z-A </button>
        <button onClick={handleOrderRtg} value='Ascending' >&uArr; Raiting </button>
        <button onClick={handleOrderRtg} value='Descending' >&dArr; Raiting </button>
       </div>,        
       <div className='pagination' >
        { page>0 && <button onClick={handlePagePrev}>&lArr;</button>}   
        {buttons.map((button,i) => <button value={i} onClick={handlePage} key={i}>{button}</button>)}
        { page<(allGames.length-15) && <button onClick={handlePageNext}>&rArr;</button>}   
       </div>,
       <div className='cards'>
        { allGames.length ? allGames.slice(page, (page+15)).map((game,i) => <Card game={game} key={i}/>) : <p>{message}</p>}
       </div>
    )
}


export default Cards;