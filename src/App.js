import { Route, Routes } from 'react-router-dom';
import DragDrop from './components/Templates/K3 Template/DragDrop';
import SingleActionTest from './components/Test/SingleActionTest';
import Test from './components/Test/Test';
import Editor from './components/Templates/K3 Template/Editor'
import { Provider } from './contexts/Context';
import Menuv2 from './components/Menu/Menuv2';
import HorizontalSplitEditor from './components/Templates/HorizontalSplitTemplate/HorizontalSplitEditor';
import FullHeight from './components/Templates/FullHeight/FullHeight';
import FullWidthWithCam from './components/Templates/FullWidthWithCam/FullWidthWithCam';
import RANDDY from './components/RANDDY/RANDDY';
import Landing from './components/Landing/Landing';
import RandyResize from './components/RANDDY/RandyResize';
import RandyResizev2 from './components/RANDDY/RandyResizev2';
import RandyResizev3PERCENT from './components/RANDDY/RandyResizev3PERCENT';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/menu' element={<Menuv2 />} />
        <Route path='/upload' element={<DragDrop />} />
        <Route path='/singleAction' element={<SingleActionTest />} />
        <Route path='/fps-template' element={<Editor />} />
        <Route path='/50-50-template' element={<HorizontalSplitEditor />} />
        <Route path='/full-template' element={<FullHeight />} />
        <Route path='/full-width-cam-template' element={<FullWidthWithCam />} />
        <Route path='/dirtyburger' element={<RandyResizev2 />} />
      </Routes>
    </Provider>
  );
}

export default App;
