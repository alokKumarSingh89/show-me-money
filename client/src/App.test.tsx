import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";
import App from "./App";
import { Header } from "./components/Header";
import { Card } from "./components/Card";

jest.mock("./components/Header");
jest.mock("./components/Card");

describe("Render App", () => {
  beforeEach(() => {
    cleanup();
  });
  it("Render component whithout report data", () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() => Promise.reject({ statusCode: 404 })) as jest.Mock
      );
    render(<App />);
    expect(Header).toHaveBeenCalled();
    expect(Card).not.toHaveBeenCalled();
  });
  it("Render component whith report data", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({ statusCode: 200, data: { title: "", data: [] } }),
        })
      ) as jest.Mock
    );
    render(<App />);
    expect(Header).toHaveBeenCalled();
    await waitFor(() => expect(Card).toHaveBeenCalled());
  });
});
