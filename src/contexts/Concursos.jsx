import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

import { getConcursos } from "../services/g1";

const ConcursosContext = createContext({
    concursos: [],
    escolaridades: [],
    estados: [],
    tipos: []
});

export const ConcursosProvider = ({ children }) => {

    const [concursos, setConcursos] = useState([]);

    useEffect(() => {
        toast.promise(getConcursos(), {
            error: "Algo deu errado, não foi possível carregar os concursos!",
            pending: "Carregando concursos...",
            success: "Concursos carregados!"
        })
            .then(results => setConcursos(results));
    }, []);

    return <ConcursosContext.Provider
        value={{
            concursos
        }}
    >
        {children}
    </ConcursosContext.Provider>;
};

export default ConcursosContext;