import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
let data: any = [];
describe("Card", () => {
  it("Render without data", () => {
    render(<Card title="Header" data={data} />);
    expect(screen.getByText(/Don't Have Report/)).toBeInTheDocument();
  });
  it("Render with data", async () => {
    data = [
      {
        title: "My Bank Account",
        section: "Bank",
        "07 October 2024": "126.70",
        "08 October 2023": "99.60",
      },
    ];
    render(<Card title="Show me" data={data} />, {
      baseElement: document.body,
    });
    const title = await screen.findByText("Show me");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("My Bank Account")).toBeInTheDocument();
  });
});
