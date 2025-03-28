import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";

interface Vehicle {
  TipoVeiculo: number;
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  SiglaCombustivel: string;
}

interface Item<T> {
  code: number;
  name: string;
}

interface VehicleProviderProps {
  children: ReactNode;
}

interface VehicleProviderData {
  vehicleData: Vehicle[];
  searchResults: Vehicle[];
  onSearch: () => void;
}

type SelectedVehicle = Item<"selectedVehicle">;

const VehicleContext = createContext<VehicleProviderData>(
  {} as VehicleProviderData
);

export function VehicleProvider({ children }: VehicleProviderProps) {
  const [years, setYears] = useState<number[]>([]);
  const [vehicleCodes, setVehicleCodes] = useState<number[]>([]);
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  const [searchResults, setSearchResults] = useState<Vehicle[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<SelectedVehicle[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/21/modelos");

      const vehiclesArray = response.data.modelos || [];

      const fiveVehicles = vehiclesArray.slice(0, 3);

      const codes = fiveVehicles.map(
        (vehicle: { codigo: number }) => vehicle.codigo
      );

      setVehicleCodes(codes);
      setSelectedVehicles(fiveVehicles);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const allYears: number[] = [];

      for (let i = 0; i < vehicleCodes.length; i++) {
        try {
          const response = await api.get(`/21/modelos/${vehicleCodes[i]}/anos`);

          const yearsData = response.data || [];

          const codesYear = yearsData.map(
            (year: { codigo: string }) => year.codigo
          );

          allYears.push(...codesYear);
        } catch (error) {
          console.error(error);
        }
      }

      setYears(allYears);
    };

    if (vehicleCodes.length > 0) {
      fetchData();
    }
  }, [vehicleCodes]);

  useEffect(() => {
    const fetchData = async () => {
      const vehicles: Vehicle[] = [];

      if (years.length > 0) {
        for (let i = 0; i <= 2; i++) {
          try {
            const response = await api.get(
              `/21/modelos/${vehicleCodes[0]}/anos/${years[i]}`
            );
            const data = response.data;

            if (data.TipoVeiculo) {
              vehicles.push(data);
            }
          } catch (error) {
            console.error(
              `Erro ao buscar dados para o ano ${years[i]}:`,
              error
            );
          }
        }

        for (let i = 3; i <= 5; i++) {
          try {
            const response = await api.get(
              `/21/modelos/${vehicleCodes[1]}/anos/${years[i]}`
            );
            const data = response.data;

            if (data.TipoVeiculo) {
              vehicles.push(data);
            }
          } catch (error) {
            console.error(
              `Erro ao buscar dados para o ano ${years[i]}:`,
              error
            );
          }
        }

        for (let i = 6; i <= 9; i++) {
          try {
            const response = await api.get(
              `/21/modelos/${vehicleCodes[2]}/anos/${years[i]}`
            );
            const data = response.data;

            if (data.TipoVeiculo) {
              vehicles.push(data);
            }
          } catch (error) {
            console.error(
              `Erro ao buscar dados para o ano ${years[i]}:`,
              error
            );
          }
        }

        setVehicleData(vehicles);
      }
    };

    if (vehicleCodes.length > 0 && years.length > 0) {
      fetchData();
    }
  }, [vehicleCodes, years]);

  const onSearch = () => {
    if (vehicleData.length > 0) {
      setSearchResults((prevResults) => [...prevResults, vehicleData[0]]);
      setVehicleData((prevData) => {
        const updatedData = prevData.slice(1);
        return updatedData;
      });
    }
  };

  return (
    <VehicleContext.Provider value={{ onSearch, searchResults, vehicleData }}>
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicle() {
  return useContext(VehicleContext);
}
