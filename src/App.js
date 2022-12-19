import { Route, Routes } from 'react-router-dom';
import DragDrop from './components/Templates/K3 Template/DragDrop';
import SingleActionTest from './components/Test/SingleActionTest';
import Editor from './components/Templates/K3 Template/Editor'
import { Provider } from './contexts/Context';
import Menuv2 from './components/Menu/Menuv2';
import HorizontalSplitEditor from './components/Templates/HorizontalSplitTemplate/HorizontalSplitEditor';
import FullHeight from './components/Templates/FullHeight/FullHeight';
import FullWidthWithCam from './components/Templates/FullWidthWithCam/FullWidthWithCam';
import RANDDY from './components/RANDDY/RANDDY';
import Landing from './components/Landing/Landing';
import RandyResizev2 from './components/RANDDY/RandyResizev2';
import K3Template from './components/TemplatesV2/K3Template/K3Template';
import FullHeightTemplate from './components/TemplatesV2/FullHeight/FullHeightTemplate';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/menu' element={<Menuv2 />} />
        <Route path='/upload' element={<DragDrop />} />
        <Route path='/singleAction' element={<SingleActionTest />} />
        <Route path='/fps-template' element={<K3Template />} />
        {/* <Route path='/fps-template' element={<Editor />} /> */}
        <Route path='/50-50-template' element={<HorizontalSplitEditor />} />
        <Route path='/full-template' element={<FullHeightTemplate />} />
        <Route path='/full-width-cam-template' element={<FullWidthWithCam />} />
        <Route path='/dirtyburger' element={<RandyResizev2 />} />
      </Routes>
    </Provider>
  );
}

export default App;
