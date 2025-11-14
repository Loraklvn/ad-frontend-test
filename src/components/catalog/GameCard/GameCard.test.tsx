import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameCard from "./GameCard";
import { Game } from "@/utils/endpoint";

// Mock next/image
jest.mock("next/image", () => {
  return function MockImage({
    src,
    alt,
    fill,
    sizes,
    priority,
    className,
    ...props
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    className?: string;
    [key: string]: unknown;
  }) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        data-testid="game-image"
        data-fill={fill}
        data-sizes={sizes}
        data-priority={priority}
        {...props}
      />
    );
  };
});

// Mock Button component
jest.mock("@/components/ui/Button", () => {
  return function MockButton({
    children,
    onClick,
    variant,
    className,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant: string;
    className?: string;
    [key: string]: unknown;
  }) {
    return (
      <button
        onClick={onClick}
        data-variant={variant}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
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

describe("GameCard", () => {
  const mockOnToggleCart = jest.fn();

  beforeEach(() => {
    mockOnToggleCart.mockClear();
  });

  // Test 1: Renders game card with game information
  it("renders game card with game name, genre, and price", () => {
    render(
      <GameCard
        game={mockGame}
        isItemInCart={false}
        onToggleCart={mockOnToggleCart}
      />
    );

    expect(screen.getByText("ACTION")).toBeInTheDocument();
    expect(screen.getByText("Test Game")).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();
  });

  // Test 2: Renders game image
  it("renders game image with correct src and alt", () => {
    render(
      <GameCard
        game={mockGame}
        isItemInCart={false}
        onToggleCart={mockOnToggleCart}
      />
    );

    const image = screen.getByTestId("game-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test Game");
  });

  // Test 3: Renders "ADD TO CART" button when item is not in cart
  it("renders 'ADD TO CART' button when item is not in cart", () => {
    render(
      <GameCard
        game={mockGame}
        isItemInCart={false}
        onToggleCart={mockOnToggleCart}
      />
    );

    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("ADD TO CART");
    expect(button).toHaveAttribute("data-variant", "secondary");
  });

  // Test 4: Renders "REMOVE FROM CART" button when item is in cart
  it("renders 'REMOVE FROM CART' button when item is in cart", () => {
    render(
      <GameCard
        game={mockGame}
        isItemInCart={true}
        onToggleCart={mockOnToggleCart}
      />
    );

    const button = screen.getByRole("button", { name: /remove from cart/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("REMOVE FROM CART");
    expect(button).toHaveAttribute("data-variant", "primary");
  });

  // Test 5: Calls onToggleCart when button is clicked
  it("calls onToggleCart when button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <GameCard
        game={mockGame}
        isItemInCart={false}
        onToggleCart={mockOnToggleCart}
      />
    );

    const button = screen.getByRole("button", { name: /add to cart/i });
    await user.click(button);

    expect(mockOnToggleCart).toHaveBeenCalledTimes(1);
  });

  // Test 6: Applies correct styling classes
  it("applies correct styling classes to card container", () => {
    const { container } = render(
      <GameCard
        game={mockGame}
        isItemInCart={false}
        onToggleCart={mockOnToggleCart}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass(
      "bg-white",
      "rounded-2xl",
      "border-[0.5px]",
      "border-border",
      "p-6",
      "flex",
      "flex-col",
      "gap-5"
    );
  });

  // Test 7: Handles long game names with text ellipsis
  it("handles long game names with text ellipsis", () => {
    const longNameGame: Game = {
      ...mockGame,
      name: "This is a very long game name that should be truncated",
    };

    render(
      <GameCard
        game={longNameGame}
        isItemInCart={false}
        onToggleCart={mockOnToggleCart}
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
});
