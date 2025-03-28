import { VehicleProvider } from "./hooks/useVehicle";
import { Home } from "./pages/Home";
import "./sass/index.scss";

function App() {
  return (
    <VehicleProvider>
      <Home />
    </VehicleProvider>
  );
}

export default App;
