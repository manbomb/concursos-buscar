import styles from './App.module.css';

import FilterHeader from './components/filterHeader/FilterHeader';
import ListConcursos from './components/listConcursos/ListConcursos';

import { ConcursosProvider } from './contexts/Concursos';

const App = () => {
    return <ConcursosProvider>
        <div className={styles.container}>
            <FilterHeader />
            <ListConcursos />
        </div>
    </ConcursosProvider>;
}

export default App;
