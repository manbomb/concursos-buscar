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

    const mapEscolaridades = () => {
        const escolaridadesMapped = concursos
            .map(({ escolaridade }) => escolaridade.split(/(\s\e\s|\,)/g))
            .reduce((ac, el) => [...ac, ...el])
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
        mapEscolaridades();
    }, [concursos]);

    return <ConcursosContext.Provider
        value={{
            concursos,
            escolaridades
        }}
    >
        {children}
    </ConcursosContext.Provider>;
};

export default ConcursosContext;