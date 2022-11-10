import { useContext } from 'react';
import ConcursosContext from '../../contexts/Concursos';

import styles from './ListConcursos.module.css';

const ListConcursos = () => {

    const {
        concursos
    } = useContext(ConcursosContext);

    return <div className={styles.container}>
        {concursos.map(concurso => <ConcursoItem concurso={concurso} key={concurso.id} />)}
    </div>
};

const ConcursoItem = ({ concurso }) => {
    return <div className={styles.concursoContainer}>
        <span>Instituição: {concurso.instituicao}</span>
        <span>Local: {concurso.local}</span>
        <span>Vagas: {concurso.vagas}</span>
        <span>Salario: {concurso.salario}</span>
        <a href={concurso.link} target={'_blank'}>Link</a>
    </div>;
};

export default ListConcursos;