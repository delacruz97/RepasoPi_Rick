const server = require("./src/app.js");
const getEpisodesApi = require("./src/controllers/episode");
const { conn } = require("./src/db.js");

// Syncing all the models at once.

// Para la precarga cuando se levanta el server, ejecutar la funcion getEpisodes(). Al ser una peticion vamos a usar async await.

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    getEpisodesApi();
    console.log("Listening at 3001"); // eslint-disable-line no-console
  });
});
