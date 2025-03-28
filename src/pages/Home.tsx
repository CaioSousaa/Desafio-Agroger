import { SiFiat } from "react-icons/si";
import { Card } from "../components/Card";
import { Navbar } from "../components/Navbar";
import { useVehicle } from "../hooks/useVehicle";

export function Home() {
  const { onSearch } = useVehicle();
  return (
    <>
      <Navbar />
      <div className="content-home-page">
        <button
          type="button"
          className="request-button"
          onClick={() => onSearch()}
        >
          <div className="circular-contour">
            <SiFiat />
          </div>
          <span>Novo veículo FIAT</span>
        </button>
        <Card />
      </div>
    </>
  );
}
