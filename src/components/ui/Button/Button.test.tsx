import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  // Test 1: Renders with primary variant and children
  it("renders button with primary variant and displays children", () => {
    render(<Button variant="primary">Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  // Test 2: Renders with secondary variant
  it("renders button with secondary variant", () => {
    render(<Button variant="secondary">Secondary Button</Button>);

    const button = screen.getByRole("button", { name: /secondary button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Secondary Button");
  });

  // Test 3: Handles click events
  it("calls onClick handler when clicked", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Button variant="primary" onClick={handleClick}>
        Click me
      </Button>
    );

    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test 4: Applies custom className
  it("applies custom className along with default classes", () => {
    render(
      <Button variant="primary" className="custom-class">
        Custom Button
      </Button>
    );

    const button = screen.getByRole("button", { name: /custom button/i });
    expect(button).toHaveClass("custom-class");
    // Verify it still has the default classes
    expect(button).toHaveClass(
      "mt-6",
      "h-14",
      "px-4",
      "rounded-lg",
      "font-bold"
    );
  });

  // Test 5: Disabled state behavior
  it("renders as disabled and prevents click events", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Button variant="primary" onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "disabled:opacity-50",
      "disabled:cursor-not-allowed"
    );

    // Attempt to click disabled button
    await user.click(button);

    // Click handler should not be called when button is disabled
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test 6: Passes through standard button HTML attributes
  it("passes through standard button HTML attributes", () => {
    render(
      <Button
        variant="primary"
        type="submit"
        aria-label="Submit form"
        data-testid="submit-button"
      >
        Submit
      </Button>
    );

    const button = screen.getByRole("button", { name: /submit form/i });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("aria-label", "Submit form");
    expect(button).toHaveAttribute("data-testid", "submit-button");
  });

  // Test 7: Renders with different children types
  it("renders with different children types (text, elements)", () => {
    render(
      <Button variant="primary">
        <span>Text with</span> <strong>formatting</strong>
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Text with formatting");
    expect(button.querySelector("span")).toBeInTheDocument();
    expect(button.querySelector("strong")).toBeInTheDocument();
  });
});
