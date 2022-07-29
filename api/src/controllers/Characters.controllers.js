//requiero axios para hacer la peticion a la api
const axios = require("axios");
//requiero el modelo de la base de datos
const { Character, Episode } = require("../db");

//trayendo la informacion de la api
const getApiCharacters = async () => {
  try {
    //me creo un arreglo vacio para guardar la informacion de la api
    const allCharacters = [];
    //me creo una variable para guardar la url de la api
    let apiUrl = "https://rickandmortyapi.com/api/character";
    //creo un for para que me recorra todos los personajes de la api,para ver como funcionaria el for, se tendria que leer la documentacion minima de la api
    for (let i = 0; i <= 4; i++) {
      let apiData = await axios.get(apiUrl);

      apiData.data.results?.forEach((el) => {
        return allCharacters.push({
          id: el.id,
          name: el.name,
          species: el.species,
          origin: el.origin.name,
          image: el.image,
          characterApi: true,
        });
      });

      //me creo una variable para guardar la informacion de la api
      //data.info.next es la pagina siguiente de la api
      apiUrl = apiData.data.info.next;
    }
    return allCharacters;
  } catch (error) {
    console.log(error);
  }
};

//creando una funcion para guardar los personajes en la base de datos
const getDbCharacters = async () => {
  try {
    return await Character.findAll({
      include: {
        model: Episode,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllInfo = async () => {
  try {
    const dbInfo = await getDbCharacters();
    const apiInfo = await getApiCharacters();
    //spread operator me traigo toda la informacion de la base de datos y la de la api y me la guardo en un arreglo nuevo
    const infoTotal = dbInfo?.concat(apiInfo);
    return infoTotal;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getApiCharacters,
  getDbCharacters,
  getAllInfo,
};
