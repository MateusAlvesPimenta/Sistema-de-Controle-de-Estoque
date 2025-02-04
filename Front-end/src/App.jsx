import { ContextProvider } from './Components/Context/Index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';
import { MainRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { MyNavBar } from './Components/Pages/Navbar';

function App() {

  return (
    <div className="bg-light">
      <ContextProvider >
        <BrowserRouter>
          <MyNavBar />
          <MainRoutes />
        </BrowserRouter>
      </ContextProvider>
    </div>
  )
}

export default App