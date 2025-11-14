import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItems from "./CartItems";
import { Game } from "@/utils/endpoint";

// Mock CartGameCard component
jest.mock("../CartGameCard", () => {
  return function MockCartGameCard({
    game,
    onRemoveFromCart,
  }: {
    game: Game;
    onRemoveFromCart: () => void;
  }) {
    return (
      <div data-testid={`cart-game-card-${game.id}`}>
        <h3>{game.name}</h3>
        <button onClick={onRemoveFromCart}>Remove</button>
      </div>
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

describe("CartItems", () => {
  const mockOnRemoveFromCart = jest.fn();

  beforeEach(() => {
    mockOnRemoveFromCart.mockClear();
  });

  // Test 1: Renders empty state
  it("renders empty state when cart is empty", () => {
    render(
      <CartItems cartItems={[]} onRemoveFromCart={mockOnRemoveFromCart} />
    );

    expect(screen.queryByTestId(/cart-game-card-/)).not.toBeInTheDocument();
  });

  // Test 2: Renders single cart item
  it("renders single cart item", () => {
    render(
      <CartItems
        cartItems={[mockGames[0]]}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    expect(screen.getByTestId("cart-game-card-1")).toBeInTheDocument();
    expect(screen.getByText("Game 1")).toBeInTheDocument();
  });

  // Test 3: Renders multiple cart items
  it("renders multiple cart items", () => {
    render(
      <CartItems
        cartItems={mockGames}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    expect(screen.getByTestId("cart-game-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("cart-game-card-2")).toBeInTheDocument();
    expect(screen.getByTestId("cart-game-card-3")).toBeInTheDocument();
  });

  // Test 4: Calls onRemoveFromCart with correct item id
  it("calls onRemoveFromCart with correct item id when remove is clicked", async () => {
    const user = userEvent.setup();
    render(
      <CartItems
        cartItems={[mockGames[0]]}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    const removeButton = screen.getByRole("button", { name: /remove/i });
    await user.click(removeButton);

    expect(mockOnRemoveFromCart).toHaveBeenCalledTimes(1);
    expect(mockOnRemoveFromCart).toHaveBeenCalledWith("1");
  });

  // Test 5: Applies border to all items except last
  it("applies border to all items except the last one", () => {
    const { container } = render(
      <CartItems
        cartItems={mockGames}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    const items = container.querySelectorAll(
      '[data-testid^="cart-game-card-"]'
    );
    const itemWrappers = Array.from(items).map((item) => item.parentElement);

    // First two items should have border-b
    expect(itemWrappers[0]).toHaveClass("border-b");
    expect(itemWrappers[1]).toHaveClass("border-b");
    // Last item should not have border-b
    expect(itemWrappers[2]).not.toHaveClass("border-b");
  });

  // Test 6: Applies correct styling classes
  it("applies correct styling classes to container", () => {
    const { container } = render(
      <CartItems
        cartItems={mockGames}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass("space-y-4");
  });

  // Test 7: Each item has correct key prop (via test-id)
  it("renders items with unique keys", () => {
    render(
      <CartItems
        cartItems={mockGames}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    expect(screen.getByTestId("cart-game-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("cart-game-card-2")).toBeInTheDocument();
    expect(screen.getByTestId("cart-game-card-3")).toBeInTheDocument();
  });

  // Test 8: Handles removing item from middle of list
  it("handles removing item from middle of list correctly", async () => {
    const user = userEvent.setup();
    render(
      <CartItems
        cartItems={mockGames}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    // Find the second item's remove button
    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    await user.click(removeButtons[1]);

    expect(mockOnRemoveFromCart).toHaveBeenCalledTimes(1);
    expect(mockOnRemoveFromCart).toHaveBeenCalledWith("2");
  });
});
