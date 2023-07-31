import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './pages/components/Sidebar';
import Vista1 from './pages/Vista1';
import Vista2 from './pages/Vista2';
import Vista3 from './pages/Vista3';
import Paises from './pages/Paises';
import Continentes from './pages/Continentes';

function App() {


  return (
    <>
      <BrowserRouter>
        <div className='container-fluid'>
          <div className='row'>
            <Sidebar></Sidebar>

            <main className='col-sm-12 col-md-9 vh-100'>

              <Routes>
                <Route path='/' element={<Paises></Paises>}></Route>
                <Route path='/continentes' element={<Continentes></Continentes>}></Route>
                <Route path='/vista-1' element={<Vista1></Vista1>}></Route>
                <Route path='/vista-2' element={<Vista2></Vista2>}></Route>
                <Route path='/vista-3' element={<Vista3></Vista3>}></Route>
              </Routes>

            </main>
          </div>
        </div>
      </BrowserRouter>

    </>
  );
}

export default App;
