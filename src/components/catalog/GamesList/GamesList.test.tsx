import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GamesList from "./GamesList";
import { Game } from "@/utils/endpoint";

// Mock useShoppingCart hook
const mockAddItem = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockIsItemInCart = jest.fn(() => false);

jest.mock("@/hooks/useShoppingCart", () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      addItem: mockAddItem,
      removeFromCart: mockRemoveFromCart,
      isItemInCart: mockIsItemInCart,
      getTotalItemsPrice: jest.fn(),
      removeAllItems: jest.fn(),
      totalItems: 0,
      cartItems: [],
    })),
  };
});

// Mock GameCard component
jest.mock("../GameCard", () => {
  return function MockGameCard({
    game,
    isItemInCart,
    onToggleCart,
  }: {
    game: Game;
    isItemInCart: boolean;
    onToggleCart: () => void;
  }) {
    return (
      <div data-testid={`game-card-${game.id}`}>
        <h3>{game.name}</h3>
        <button onClick={onToggleCart}>
          {isItemInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
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
];

describe("GamesList", () => {
  beforeEach(() => {
    mockAddItem.mockClear();
    mockRemoveFromCart.mockClear();
    mockIsItemInCart.mockClear();
    mockIsItemInCart.mockReturnValue(false);
  });

  // Test 1: Renders loading state
  it("renders loading message when loading is true", () => {
    render(<GamesList games={[]} loading={true} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  // Test 2: Renders games list when not loading
  it("renders games list when not loading", () => {
    render(<GamesList games={mockGames} loading={false} />);

    expect(screen.getByText("Game 1")).toBeInTheDocument();
    expect(screen.getByText("Game 2")).toBeInTheDocument();
  });

  // Test 3: Renders correct number of game cards
  it("renders correct number of game cards", () => {
    render(<GamesList games={mockGames} loading={false} />);

    expect(screen.getByTestId("game-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("game-card-2")).toBeInTheDocument();
  });

  // Test 4: Calls addItem when game is not in cart
  it("calls addItem when game is not in cart and toggle is clicked", async () => {
    const user = userEvent.setup();
    mockIsItemInCart.mockReturnValue(false);

    render(<GamesList games={[mockGames[0]]} loading={false} />);

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    await user.click(addButton);

    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockAddItem).toHaveBeenCalledWith(mockGames[0]);
  });

  // Test 5: Calls removeFromCart when game is in cart
  it("calls removeFromCart when game is in cart and toggle is clicked", async () => {
    const user = userEvent.setup();
    mockIsItemInCart.mockReturnValue(true);

    render(<GamesList games={[mockGames[0]]} loading={false} />);

    const removeButton = screen.getByRole("button", {
      name: /remove from cart/i,
    });
    await user.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockGames[0].id);
  });

  // Test 6: Passes correct isItemInCart prop to GameCard
  it("passes correct isItemInCart prop to GameCard", () => {
    // Fix: Accept the expected argument.
    mockIsItemInCart.mockImplementation((...args: string[]) => args[0] === "1");

    render(<GamesList games={mockGames} loading={false} />);

    const game1Card = screen.getByTestId("game-card-1");
    const game2Card = screen.getByTestId("game-card-2");

    expect(game1Card).toBeInTheDocument();
    expect(game2Card).toBeInTheDocument();

    // Game 1 should show remove button (in cart)
    expect(
      screen.getByRole("button", { name: /remove from cart/i })
    ).toBeInTheDocument();
  });

  // Test 7: Applies correct grid layout classes
  it("applies correct grid layout classes", () => {
    const { container } = render(
      <GamesList games={mockGames} loading={false} />
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass(
      "grid",
      "grid-cols-1",
      "sm:grid-cols-2",
      "lg:grid-cols-3",
      "gap-6",
      "lg:gap-12"
    );
  });

  // Test 8: Handles empty games array
  it("handles empty games array", () => {
    render(<GamesList games={[]} loading={false} />);

    expect(screen.queryByTestId(/game-card-/)).not.toBeInTheDocument();
  });
});
