const axios = require("axios");
const { Episode } = require("../db");

const getEpisodesApi = async () => {
  try {
    const allEpisodes = [];
    let apiUrl = "https://rickandmortyapi.com/api/episode";
    for (let i = 0; i <= 1; i++) {
      let apiData = await axios.get(apiUrl);

      apiData.data.results?.forEach((el) => {
        return allEpisodes.push({
          name: el.name,
        });
      });

      apiUrl = apiData.data.info.next;
    }
    //el bulkCreate es para guardar los datos en la base de datos
    await Episode.bulkCreate(allEpisodes);

    return allEpisodes;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getEpisodesApi;
