import styles from './Select.module.css';

const Select = ({ options = [], onChange = () => {}, value = '' }) => {
    return <select
        onChange={evt => onChange(evt.target.value)}
        value={value}
    >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>;
};

export default Select;