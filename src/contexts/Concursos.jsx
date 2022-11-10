import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

import { getConcursos } from "../services/g1";
import { reduceUnique } from "../utils";

const ConcursosContext = createContext({
    concursos: [],
    escolaridades: [],
    estados: [],
    tipos: []
});

export const ConcursosProvider = ({ children }) => {

    const [concursos, setConcursos] = useState([]);
    const [escolaridades, setEscolaridades] = useState([]);
    const [estados, setEstados] = useState([]);
    const [tipos, setTipos] = useState([]);

    const getAndSetTipos = () => {
        const tiposMapped = concursos
            .map(({ tipo }) => tipo)
            .map(tipo => `${tipo}`.trim())
            .reduce(reduceUnique, []);
        setTipos(tiposMapped);
    };

    const getAndSetEstados = () => {
        const estadosMapped = concursos
            .map(({ estado }) => estado.split(/(\s\e\s|\,)/g))
            .reduce((ac, el) => [...ac, ...el], [])
            .map(estado => `${estado}`.trim())
            .filter(estado => estado.length >= 2)
            .reduce(reduceUnique, []);
        setEstados(estadosMapped);
    };

    const getAndSetEscolaridades = () => {
        const escolaridadesMapped = concursos
            .map(({ escolaridade }) => escolaridade.split(/(\s\e\s|\,)/g))
            .reduce((ac, el) => [...ac, ...el], [])
            .map(esc => `${esc}`.trim())
            .filter(esc => esc.length > 2)
            .reduce(reduceUnique, []);
        setEscolaridades(escolaridadesMapped);
    };

    useEffect(() => {
        toast.promise(getConcursos(), {
            error: "Algo deu errado, não foi possível carregar os concursos!",
            pending: "Carregando concursos...",
            success: "Concursos carregados!"
        })
            .then(results => setConcursos(results));
    }, []);

    useEffect(() => {
        getAndSetEscolaridades();
        getAndSetEstados();
        getAndSetTipos();
    }, [concursos]);

    return <ConcursosContext.Provider
        value={{
            concursos,
            escolaridades,
            estados,
            tipos
        }}
    >
        {children}
    </ConcursosContext.Provider>;
};

export default ConcursosContext;