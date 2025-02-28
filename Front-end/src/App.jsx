import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';

import { ContextProvider } from './Components/Context/Index';
import { MainRoutes } from './Routes';
import { MyNavBar } from './Components/Pages/MyNavbar';

function App() {

  return (
    <ContextProvider >

        <BrowserRouter>
          <MyNavBar />
          <MainRoutes />
        </BrowserRouter>
    </ContextProvider>
  )
}

export default App