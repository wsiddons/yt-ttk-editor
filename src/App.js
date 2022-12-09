import { Route, Routes } from 'react-router-dom';
import DragDrop from './components/K3 Template/DragDrop';
import SingleActionTest from './components/Test/SingleActionTest';
import Test from './components/Test/Test';

function App() {
  return (
    <Routes>
      <Route path='/' element={<DragDrop />} />
      <Route path='singleAction' element={<SingleActionTest />} />
    </Routes>
  );
}

export default App;
