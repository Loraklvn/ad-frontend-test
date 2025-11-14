import React from "react";
import { render, screen } from "@testing-library/react";
import CartIcon from "./CartIcon";

describe("CartIcon", () => {
  // Test 1: Renders SVG element
  it("renders SVG element with correct attributes", () => {
    const { container } = render(<CartIcon />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "24");
    expect(svg).toHaveAttribute("height", "24");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
  });

  // Test 2: Renders path element with correct fill
  it("renders path element with correct fill color", () => {
    const { container } = render(<CartIcon />);

    const svg = container.querySelector("svg");
    const path = svg?.querySelector("path");
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute("fill", "#585660");
  });

  // Test 3: Passes through custom props
  it("passes through custom SVG attributes", () => {
    render(<CartIcon className="custom-class" data-testid="cart-icon" />);

    const svg = screen.getByTestId("cart-icon");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("custom-class");
  });

  // Test 4: Allows custom width and height
  it("allows custom width and height via props", () => {
    const { container } = render(<CartIcon width="32" height="32" />);

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  // Test 5: Has accessible structure
  it("has correct SVG structure for icon usage", () => {
    const { container } = render(<CartIcon />);
    const svg = container.querySelector("svg");
    const path = container.querySelector("path");

    expect(svg).toBeInTheDocument();
    expect(path).toBeInTheDocument();
    expect(svg).toContainElement(path);
  });
});
