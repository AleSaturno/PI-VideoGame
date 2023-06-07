import {GET_ALLGAMES , GET_GAMESBYNAME , GET_GENRES} from "./actions";

const initialState = {
    allGames : [],
    gamesByname: [],
    genres: []
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_ALLGAMES:
            return{
                ...state,
                allGames: action.payload
            }
        case GET_GAMESBYNAME:
            return{
                ...state,
                gamesByname: action.payload
            }     
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }    

        default:
            return{
                ...state
            }
    }
    
}

export default reducer;