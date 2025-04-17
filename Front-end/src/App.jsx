import {useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';

import { ContextProvider } from './Context/Index';
import { MainRoutes } from './Routes';
import { MyNavBar } from './Pages/MyNavbar';

function App() {

  const location = useLocation();
  const hideNavBarRoutes = ["/", "/register"];
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname);
  
  return (
    <ContextProvider >
        <div className="d-flex">
          {!shouldHideNavBar && <MyNavBar />}
          <MainRoutes />
        </div>
    </ContextProvider>
  )
}

export default App