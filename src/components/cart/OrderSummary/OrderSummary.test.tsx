import React from "react";
import { render, screen } from "@testing-library/react";
import OrderSummary from "./OrderSummary";
import { Game } from "@/utils/endpoint";

// Mock Button component
jest.mock("@/components/ui/Button", () => {
  return function MockButton({
    children,
    variant,
    className,
    ...props
  }: {
    children: React.ReactNode;
    variant: string;
    className?: string;
    [key: string]: unknown;
  }) {
    return (
      <button data-variant={variant} className={className} {...props}>
        {children}
      </button>
    );
  };
});

const mockGames: Game[] = [
  {
    id: "1",
    name: "Game 1",
    genre: "Action",
    description: "Description 1",
    image: "/image1.jpg",
    price: 59.99,
    isNew: true,
  },
  {
    id: "2",
    name: "Game 2",
    genre: "RPG",
    description: "Description 2",
    image: "/image2.jpg",
    price: 39.99,
    isNew: false,
  },
  {
    id: "3",
    name: "Game 3",
    genre: "Adventure",
    description: "Description 3",
    image: "/image3.jpg",
    price: 49.99,
    isNew: true,
  },
];

describe("OrderSummary", () => {
  // Test 1: Renders order summary header
  it("renders order summary header", () => {
    render(<OrderSummary orderItems={[]} orderTotal={0} />);

    const heading = screen.getByRole("heading", { name: /order summary/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Order Summary");
  });

  // Test 2: Displays correct item count
  it("displays correct item count", () => {
    render(<OrderSummary orderItems={mockGames} orderTotal={149.97} />);

    expect(screen.getByText("3 items")).toBeInTheDocument();
  });

  // Test 3: Displays zero items
  it("displays zero items when order is empty", () => {
    render(<OrderSummary orderItems={[]} orderTotal={0} />);

    expect(screen.getByText("0 items")).toBeInTheDocument();
  });

  // Test 4: Renders all order items with names and prices
  it("renders all order items with names and prices", () => {
    render(<OrderSummary orderItems={mockGames} orderTotal={149.97} />);

    expect(screen.getByText("Game 1")).toBeInTheDocument();
    expect(screen.getByText("$ 59.99")).toBeInTheDocument();

    expect(screen.getByText("Game 2")).toBeInTheDocument();
    expect(screen.getByText("$ 39.99")).toBeInTheDocument();

    expect(screen.getByText("Game 3")).toBeInTheDocument();
    expect(screen.getByText("$ 49.99")).toBeInTheDocument();
  });

  // Test 5: Displays order total
  it("displays order total with correct formatting", () => {
    render(<OrderSummary orderItems={mockGames} orderTotal={149.97} />);

    const totalLabel = screen.getByText("Order Total");
    const totalValue = screen.getByText("$149.97");

    expect(totalLabel).toBeInTheDocument();
    expect(totalValue).toBeInTheDocument();
  });

  // Test 6: Formats prices to 2 decimal places
  it("formats prices to 2 decimal places", () => {
    render(<OrderSummary orderItems={mockGames} orderTotal={149.975} />);

    // Check that the total is formatted with 2 decimal places
    const totalElement = screen
      .getByText(/Order Total/i)
      .closest("div")
      ?.querySelectorAll("p");
    const totalValue = Array.from(totalElement || []).find((p) =>
      p.textContent?.includes("$")
    );
    expect(totalValue?.textContent).toMatch(/\$\d+\.\d{2}/);
  });

  // Test 7: Renders checkout button
  it("renders checkout button", () => {
    render(<OrderSummary orderItems={mockGames} orderTotal={149.97} />);

    const checkoutButton = screen.getByRole("button", { name: /checkout/i });
    expect(checkoutButton).toBeInTheDocument();
    expect(checkoutButton).toHaveTextContent("Checkout");
    expect(checkoutButton).toHaveAttribute("data-variant", "primary");
  });

  // Test 8: Applies correct styling classes
  it("applies correct styling classes to order summary", () => {
    const { container } = render(
      <OrderSummary orderItems={mockGames} orderTotal={149.97} />
    );

    const summaryCard = container.querySelector(".bg-card");
    expect(summaryCard).toBeInTheDocument();
    expect(summaryCard).toHaveClass(
      "bg-card",
      "border",
      "border-border",
      "rounded-lg",
      "px-6",
      "py-8"
    );
  });

  // Test 9: Handles single item order
  it("handles single item order", () => {
    render(<OrderSummary orderItems={[mockGames[0]]} orderTotal={59.99} />);

    expect(screen.getByText("1 items")).toBeInTheDocument();
    expect(screen.getByText("Game 1")).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();
  });

  // Test 10: Displays border separator
  it("displays border separator between items and total", () => {
    const { container } = render(
      <OrderSummary orderItems={mockGames} orderTotal={149.97} />
    );

    const separator = container.querySelector(".border-t");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass("border-t", "border-border");
  });
});
