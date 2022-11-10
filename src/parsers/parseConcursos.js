import { parseSalario } from '../utils';

const {
    parse,
    isValid
} = require('date-fns');

const parseConcursos = (concursos = []) => {
    return concursos.map(parseConcurso);
};

const parseConcurso = (concurso) => {
    const concursoParsed = {...concurso};

    concursoParsed.encerramento = parseDateOrNull(concurso.encerramento);
    concursoParsed.inicio = parseDateOrNull(concurso.inicio);
    concursoParsed.inscricoes = parseDateOrNull(concurso.inscricoes);

    concursoParsed.salario = parseSalario(concurso.salario);
    concursoParsed.vagas = parseInt(concurso.vagas) || null;

    return concursoParsed;
};

const parseDateOrNull = (date) => {
    const parsed = parse(date, 'dd/MM/yyyy', new Date());
    if (isValid(parsed)) return parsed;
    return null;
};

export default parseConcursos;