const { default: axios } = require("axios");
const { default: parseConcursos } = require("../parsers/parseConcursos");

const urlData = "https://s3.glbimg.com/v1/AUTH_529fe1362b534020a55de48496cc9da8/especiais/2018/lista-de-concursos/data/data.json";

export const getConcursos = async () => {
    return axios.get(urlData)
        .then((res) => res.data)
        .then((data) => data.docs)
        .then(concursos => parseConcursos(concursos));
};