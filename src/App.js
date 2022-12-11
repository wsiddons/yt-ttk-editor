import { Route, Routes } from 'react-router-dom';
import DragDrop from './components/K3 Template/DragDrop';
import SingleActionTest from './components/Test/SingleActionTest';
import Test from './components/Test/Test';
import Editor from './components/K3 Template/Editor'
import { Provider } from './contexts/Context';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path='/' element={<DragDrop />} />
        <Route path='singleAction' element={<SingleActionTest />} />
        <Route path='/edit' element={<Editor />} />
      </Routes>
    </Provider>
  );
}

export default App;
