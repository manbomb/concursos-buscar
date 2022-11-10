import { useContext, useState } from 'react';

import ConcursosContext from '../../contexts/Concursos';

import Select from '../select/Select';

import styles from './FilterHeader.module.css';

const FilterHeader = () => {

    const {
        escolaridades,
        estados,
        tipos,
        filterEscolaridade,
        setFilterEscolaridade,
        filterEstado,
        setFilterEstado,
        setFilterSalario,
        filterTipo,
        setFilterTipo
    } = useContext(ConcursosContext);

    const [salarioValueString, setSalarioValueString] = useState("");

    const handleChangeSalario = (evt) => {
        const stringSalario = evt.target.value;
        const floatSalario = parseFloat(stringSalario) || 0;
        setFilterSalario(floatSalario);
        setSalarioValueString(stringSalario);
    };

    return <div className={styles.container}>
        <Select onChange={setFilterTipo} value={filterTipo} options={tipos} />
        <Select onChange={setFilterEscolaridade} value={filterEscolaridade} options={escolaridades} />
        <Select onChange={setFilterEstado} value={filterEstado} options={estados} />
        <input type={'text'} onChange={handleChangeSalario} value={salarioValueString} placeholder={"Salário mínimo"} />
    </div>;
};

export default FilterHeader;