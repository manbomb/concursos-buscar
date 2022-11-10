import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

import { getConcursos } from "../services/g1";
import { reduceUnique } from "../utils";

const ConcursosContext = createContext({
    concursos: [],
    escolaridades: [],
    estados: [],
    tipos: [],
    filterTipo: '',
    filterSalario: 0,
    filterEstado: '',
    filterEscolaridade: ''
});

export const ConcursosProvider = ({ children }) => {

    const [concursos, setConcursos] = useState([]);
    const [escolaridades, setEscolaridades] = useState([]);
    const [estados, setEstados] = useState([]);
    const [tipos, setTipos] = useState([]);

    const [filterTipo, setFilterTipo] = useState("");
    const [filterSalario, setFilterSalario] = useState(0);
    const [filterEstado, setFilterEstado] = useState("");
    const [filterEscolaridade, setFilterEscolaridade] = useState("");

    const [concursosFiltred, setConcursosFiltred] = useState([]);

    const getAndSetTipos = () => {
        const tiposMapped = concursos
            .map(({ tipo }) => tipo)
            .map(tipo => `${tipo}`.trim())
            .reduce(reduceUnique, []);
        setTipos(tiposMapped);
    };

    const getAndSetEstados = () => {
        const estadosMapped = concursos
            .map(({ estados }) => estados)
            .reduce((ac, el) => [...ac, ...el], [])
            .reduce(reduceUnique, []);
        setEstados(estadosMapped);
    };

    const getAndSetEscolaridades = () => {
        const escolaridadesMapped = concursos
            .map(({ escolaridades }) => escolaridades)
            .reduce((ac, el) => [...ac, ...el], [])
            .reduce(reduceUnique, []);
        setEscolaridades(escolaridadesMapped);
    };

    const filterConcursoByTipo = (concurso) => {
        if (!filterTipo) return true;
        return `${concurso.tipo}`.trim() === filterTipo;
    };

    const filterConcursoBySalario = (concurso) => {
        return concurso.salario >= filterSalario;
    };

    const filterConcursoByEstado = (concurso) => {
        if (!filterEstado) return true;
        return [...concurso.estados].includes(filterEstado);
    };

    const filterConcursoByEscolaridade = (concurso) => {
        if (!filterEscolaridade) return true;
        return [...concurso.escolaridades].includes(filterEscolaridade);
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

    useEffect(() => {
        const filtred = concursos
            .filter(filterConcursoByTipo)
            .filter(filterConcursoBySalario)
            .filter(filterConcursoByEstado)
            .filter(filterConcursoByEscolaridade);
        setConcursosFiltred(filtred);
    }, [filterTipo, filterSalario, filterEstado, filterEscolaridade, concursos]);

    return <ConcursosContext.Provider
        value={{
            concursos: concursosFiltred,
            escolaridades,
            estados,
            tipos,
            filterTipo,
            setFilterTipo,
            filterSalario,
            setFilterSalario,
            filterEstado,
            setFilterEstado,
            filterEscolaridade,
            setFilterEscolaridade
        }}
    >
        {children}
    </ConcursosContext.Provider>;
};

export default ConcursosContext;