import styles from './App.module.css';
import { ConcursosProvider } from './contexts/Concursos';

const App = () => {
    return <ConcursosProvider>
        <div className={styles.container} />
    </ConcursosProvider>;
}

export default App;
