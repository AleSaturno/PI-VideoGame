import {useNavigate} from 'react-router-dom';

const Landing = () =>{
    
    const navigate = useNavigate()

    return(
        <div>
            <button onClick={() => navigate('/home')}>Bienvenido</button>
        </div>
    )
}


export default Landing;