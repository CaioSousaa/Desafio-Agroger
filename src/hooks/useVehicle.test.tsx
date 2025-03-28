import { render, screen, fireEvent } from "@testing-library/react";
import { VehicleProvider } from "./useVehicle";
import { useState } from "react";

describe("VehicleProvider", () => {
  it("should render the component without errors", () => {
    render(
      <VehicleProvider>
        <div>Tested Component</div>
      </VehicleProvider>
    );

    expect(screen.getByText("Tested Component")).toBeInTheDocument();
  });

  it("should display 'Results found' when button is clicked", () => {
    const TestComponent = () => {
      const [searchResults, setSearchResults] = useState<string>("No results");

      const onSearch = () => {
        setSearchResults("Results found");
      };

      return (
        <div>
          <button onClick={onSearch}>Search</button>
          <div data-testid="results">{searchResults}</div>
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId("results")).toHaveTextContent("No results");

    fireEvent.click(screen.getByText("Search"));

    expect(screen.getByTestId("results")).toHaveTextContent("Results found");
  });
});
