import { IoCarSportOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { Button } from "./Button";
import { useVehicle } from "../hooks/useVehicle";

export function Card() {
  const { searchResults } = useVehicle();

  return (
    <>
      {searchResults.length === 0 ? (
        <h1>Oops! Nenhum veículo aqui ainda!</h1>
      ) : (
        searchResults.map((vehicle, index) => (
          <div key={index} className="card-content">
            <div className="description-car">
              <h1>{vehicle.Modelo}</h1>
              <span>
                {vehicle.Marca} - {vehicle.AnoModelo}
              </span>
              <p>{vehicle.Valor}</p>
            </div>

            <div className="buttons">
              <Button.Root style={{ background: "#ff791f" }}>
                <Button.Content>
                  <span>3</span>
                  <p>Unidades</p>
                </Button.Content>
              </Button.Root>

              <Button.Root style={{ background: "#20a7d9" }}>
                <Button.Content>
                  <LuMapPin />
                </Button.Content>
              </Button.Root>

              <button className="large-button">
                <IoCarSportOutline />
                <span>Comprar agora</span>
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
