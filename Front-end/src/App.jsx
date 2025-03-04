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
        <div className="d-flex">
          <MyNavBar />
          <MainRoutes />
        </div>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App