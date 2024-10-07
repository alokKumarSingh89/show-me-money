import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("Render", () => {
    render(<Header title="Header" />);
    expect(screen.getByText(/Header/)).toBeInTheDocument();
  });
});
