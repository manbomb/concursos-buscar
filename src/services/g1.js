const { default: axios } = require("axios");

const urlData = "https://s3.glbimg.com/v1/AUTH_529fe1362b534020a55de48496cc9da8/especiais/2018/lista-de-concursos/data/data.json";

const getConcursos = async () => {
    return axios.get(urlData)
        .then((res) => res.data)
        .then((data) => data.docs);
};

module.exports = {
    getConcursos
};