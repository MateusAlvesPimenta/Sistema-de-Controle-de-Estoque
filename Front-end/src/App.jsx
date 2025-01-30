import { ContextProvider } from './Components/Context/Index';
import { Suppliers } from './Components/Pages/Suppliers/Index';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="bg-light">
      <ContextProvider >
        <Suppliers />
      </ContextProvider>
    </div>
  )
}

export default App