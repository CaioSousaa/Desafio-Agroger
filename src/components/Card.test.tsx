import { render, screen } from "@testing-library/react";
import { useVehicle } from "../hooks/useVehicle";
import { Card } from "./Card";
import { vi } from "vitest";

vi.mock("../hooks/useVehicle", () => ({
  useVehicle: vi.fn(),
}));

describe("Card Component", () => {
  it("should display a message when there are no vehicles", () => {
    (useVehicle as jest.Mock).mockReturnValue({ searchResults: [] });

    render(<Card />);

    expect(
      screen.getByText("Oops! Nenhum veículo aqui ainda!")
    ).toBeInTheDocument();
  });

  it("should render vehicle details when searchResults contains data", () => {
    (useVehicle as jest.Mock).mockReturnValue({
      searchResults: [
        {
          Modelo: "Civic",
          Marca: "Honda",
          AnoModelo: "2022",
          Valor: "R$ 120.000",
        },
      ],
    });

    render(<Card />);

    expect(screen.getByText("Civic")).toBeInTheDocument();
    expect(screen.getByText("Honda - 2022")).toBeInTheDocument();
    expect(screen.getByText("R$ 120.000")).toBeInTheDocument();
  });
});
