import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import { LocationsProvider } from "./providers/LocationsProvider";

function App() {
  return (
    <LocationsProvider>
      <Sidebar />
      <Map />
    </LocationsProvider>
  );
}

export default App;
