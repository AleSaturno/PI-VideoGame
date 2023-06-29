import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { url } from "../../redux/actions";
import { getAllGames } from "../../redux/actions";
import validations from "./Validations.js";
import style from './Forms.module.css'

const CreateForm = () => {
  const [gameData, setGameData] = useState({
    name: "",
    description: "",
    released: "",
    background_image: "",
    rating: "",
    platforms: [],
    genres: [],
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  let allGenres = useSelector((state) => state.genres);

  useEffect(() => {
    setErrors(validations(gameData));
  }, [gameData]);

  useEffect(() => {
    setIsValid(Object.keys(errors).length === 0);
  }, [errors]);

  const handleInputChange = (event) => {
    setGameData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddGenre = (event) => {
    event.preventDefault();
    const genreId = event.target.name;
    const updatedGenres = gameData.genres.includes(genreId)
      ? gameData.genres.filter((genre) => genre !== genreId)
      : [...gameData.genres, genreId];

    setGameData((prevData) => ({
      ...prevData,
      genres: updatedGenres,
    }));

    setErrors(validations({
      ...gameData,
      genres: updatedGenres,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const game = {
      ...gameData,
      rating: parseInt(gameData.rating),
      genres: gameData.genres.map((genre) => parseInt(genre)),
      
    };

    if (game.background_image && !game.background_image.length) {
      delete game.background_image;
    }

    dispatch(getAllGames());

    try {
      const response = await axios.post(`${url}/videogames`, game);
      alert('El Video Juego ha sido creado exitosamente!!');
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || error.message;
        alert(errorMessage); 
      } else {
        alert('Ocurrió un error en la solicitud');
      }
    }
  };

  return (
    <div className={style.master}>
      <section className={style.seccion}>
        <div className={style.imageContainer}>
          <div className={style.inputs}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={gameData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div className={style.inputs}>
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              name="description"
              value={gameData.description}
              onChange={handleInputChange}
              placeholder="Descripción del juego"
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description}</p>
            )}
          </div>

          <div className={style.inputs} >
            <label htmlFor="background_image">Image: </label>
            <input
              type="text"
              name="background_image"
              value={gameData.background_image}
              onChange={handleInputChange}
              placeholder="Aqui va una URL"
            />
            {errors.background_image && (
              <p style={{ color: "red" }}>{errors.background_image}</p>
            )}
          </div>

          <div className={style.inputs}>
            <label htmlFor="rating">Rating: </label>
            <input
              type="text"
              name="rating"
              value={gameData.rating}
              onChange={handleInputChange}
              placeholder="Agregar Clasificación"
            />
            {errors.rating && <p style={{ color: "red" }}>{errors.rating}</p>}
          </div>

          <div className={style.inputs}>
            <label htmlFor="platforms">Platforms: </label>
            <input
              type="text"
              name="platforms"
              value={gameData.platforms}
              onChange={handleInputChange}
              placeholder="Agregar la plataforma"
            />
            {errors.platforms && (
              <p style={{ color: "red" }}>{errors.platforms}</p>
            )}
          </div>

          <div className={style.inputs}>
            <label htmlFor="released">Release: </label>
            <input
              type="date"
              name="released"
              value={gameData.released}
              onChange={handleInputChange}
            />
            {errors.released && <p style={{ color: "red" }}>{errors.released}</p>}
          </div>

          <div className={style.genres}>
            <div>
              {allGenres.map((genre) => (
                <button
                  name={genre.id}
                  onClick={handleAddGenre}
                  key={genre.id}
                  style={{
                    backgroundColor: gameData.genres.includes(genre.id.toString())
                      ? "blue"
                      : "white",
                  }}
                >
                  {genre.name}
                </button>
              ))}
            </div>

            {errors.genres && <p style={{ color: "red" }}>{errors.genres}</p>}
          </div>

          <button
            className={style.boton}
            type="submit"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </section>
    </div>
  );
};

export default CreateForm;
