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

    return concursoParsed;
};

const parseDateOrNull = (date) => {
    const parsed = parse(date, 'dd/MM/yyyy', new Date());
    if (isValid(parsed)) return parsed;
    return null;
};

export default parseConcursos;