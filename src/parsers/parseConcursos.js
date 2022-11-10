import { parseSalario } from '../utils';

const {
    parse,
    isValid
} = require('date-fns');

const parseConcursos = (concursos = []) => {
    return concursos.map(parseConcurso);
};

const parseConcurso = (concurso) => {
    const concursoParsed = { ...concurso };

    concursoParsed.encerramento = parseDateOrNull(concurso.encerramento);
    concursoParsed.inicio = parseDateOrNull(concurso.inicio);
    concursoParsed.inscricoes = parseDateOrNull(concurso.inscricoes);

    concursoParsed.salario = parseSalario(concurso.salario);
    concursoParsed.vagas = parseInt(concurso.vagas) || null;

    concursoParsed.estados = concurso.estado
        .split(/(\s\e\s|\,)/g)
        .map(estado => `${estado}`.trim())
        .filter(estado => estado.length >= 2);

    concursoParsed.escolaridades = concurso.escolaridade
        .split(/(\s\e\s|\,)/g)
        .map(escolaridade => `${escolaridade}`.trim())
        .filter(escolaridade => escolaridade.length >= 2);

    concursoParsed.id = generateId(concurso);

    return concursoParsed;
};

const generateId = (concurso) => {
    const concursoLocal = { ...concurso };
    delete concursoLocal.inicio;
    delete concursoLocal.encerramento;
    delete concursoLocal.inscricoes;

    return hashCode(Object.values(concursoLocal).join()).toFixed();
};

const hashCode = (str) => {
    var hash = 0,
        i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
};

const parseDateOrNull = (date) => {
    const parsed = parse(date, 'dd/MM/yyyy', new Date());
    if (isValid(parsed)) return parsed;
    return null;
};

export default parseConcursos;