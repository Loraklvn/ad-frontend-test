import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartGameCard from "./CartGameCard";
import { Game } from "@/utils/endpoint";

// Mock next/image
jest.mock("next/image", () => {
  return function MockImage({
    src,
    alt,
    fill,
    className,
    sizes,
    priority,
    ...props
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
    sizes?: string;
    priority?: boolean;
    [key: string]: unknown;
  }) {
    return React.createElement("img", {
      src,
      alt,
      className,
      "data-testid": "cart-game-image",
      "data-fill": fill,
      "data-sizes": sizes,
      "data-priority": priority,
      ...props,
    });
  };
});

// Mock lucide-react X icon
jest.mock("lucide-react", () => {
  return {
    X: function MockX({
      size,
      ...props
    }: {
      size?: number;
      [key: string]: unknown;
    }) {
      return React.createElement(
        "svg",
        {
          "data-testid": "remove-icon",
          width: size || 20,
          height: size || 20,
          ...props,
        },
        React.createElement("title", null, "Remove")
      );
    },
  };
});

const mockGame: Game = {
  id: "1",
  name: "Test Game",
  genre: "Action",
  description: "A test game description",
  image: "/test-image.jpg",
  price: 59.99,
  isNew: true,
};

describe("CartGameCard", () => {
  const mockOnRemoveFromCart = jest.fn();

  beforeEach(() => {
    mockOnRemoveFromCart.mockClear();
  });

  // Test 1: Renders game card with game information
  it("renders game card with game name, genre, description, and price", () => {
    render(
      <CartGameCard game={mockGame} onRemoveFromCart={mockOnRemoveFromCart} />
    );

    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Test Game")).toBeInTheDocument();
    expect(screen.getByText("A test game description")).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();
  });

  // Test 2: Renders game image
  it("renders game image with correct src and alt", () => {
    render(
      <CartGameCard game={mockGame} onRemoveFromCart={mockOnRemoveFromCart} />
    );

    const image = screen.getByTestId("cart-game-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test Game");
  });

  // Test 3: Renders remove button
  it("renders remove button with correct aria-label", () => {
    render(
      <CartGameCard game={mockGame} onRemoveFromCart={mockOnRemoveFromCart} />
    );

    const removeButton = screen.getByRole("button", { name: /remove item/i });
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveAttribute("aria-label", "Remove item");
  });

  // Test 4: Calls onRemoveFromCart when remove button is clicked
  it("calls onRemoveFromCart when remove button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <CartGameCard game={mockGame} onRemoveFromCart={mockOnRemoveFromCart} />
    );

    const removeButton = screen.getByRole("button", { name: /remove item/i });
    await user.click(removeButton);

    expect(mockOnRemoveFromCart).toHaveBeenCalledTimes(1);
  });

  // Test 5: Renders remove icon
  it("renders remove icon inside remove button", () => {
    render(
      <CartGameCard game={mockGame} onRemoveFromCart={mockOnRemoveFromCart} />
    );

    const removeButton = screen.getByRole("button", { name: /remove item/i });
    const removeIcon = screen.getByTestId("remove-icon");

    expect(removeButton).toContainElement(removeIcon);
  });

  // Test 6: Applies correct styling classes
  it("applies correct styling classes to card container", () => {
    const { container } = render(
      <CartGameCard game={mockGame} onRemoveFromCart={mockOnRemoveFromCart} />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass(
      "relative",
      "flex",
      "sm:flex-row",
      "flex-col",
      "sm:gap-6",
      "gap-2",
      "sm:pb-5",
      "sm:px-4",
      "items-start"
    );
  });

  // Test 7: Positions remove button absolutely
  it("positions remove button absolutely in top right", () => {
    render(
      <CartGameCard game={mockGame} onRemoveFromCart={mockOnRemoveFromCart} />
    );

    const removeButton = screen.getByRole("button", { name: /remove item/i });
    expect(removeButton).toHaveClass(
      "absolute",
      "top-1",
      "right-0",
      "cursor-pointer"
    );
  });

  // Test 8: Handles long game names with text ellipsis
  it("handles long game names with text ellipsis", () => {
    const longNameGame: Game = {
      ...mockGame,
      name: "This is a very long game name that should be truncated",
    };

    render(
      <CartGameCard
        game={longNameGame}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    const gameName = screen.getByText(longNameGame.name);
    expect(gameName).toBeInTheDocument();
    expect(gameName).toHaveClass(
      "text-ellipsis",
      "overflow-hidden",
      "whitespace-nowrap"
    );
  });

  // Test 9: Renders "New" label when game is new
  it("renders 'New' label when game is new", () => {
    render(
      <CartGameCard game={mockGame} onRemoveFromCart={mockOnRemoveFromCart} />
    );

    const newLabel = screen.getByText("New");
    expect(newLabel).toBeInTheDocument();
    expect(newLabel.tagName).toBe("SPAN");
  });

  // Test 10: Does not render "New" label when game is not new
  it("does not render 'New' label when game is not new", () => {
    const notNewGame: Game = {
      ...mockGame,
      isNew: false,
    };

    render(
      <CartGameCard game={notNewGame} onRemoveFromCart={mockOnRemoveFromCart} />
    );

    expect(screen.queryByText("New")).not.toBeInTheDocument();
  });
});
