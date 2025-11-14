import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartHeader from "./CartHeader";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    className,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  };
});

// Mock lucide-react ArrowLeftIcon
jest.mock("lucide-react", () => {
  return {
    ArrowLeftIcon: function MockArrowLeftIcon({
      className,
      ...props
    }: {
      className?: string;
      [key: string]: unknown;
    }) {
      return (
        <svg
          data-testid="arrow-left-icon"
          className={className}
          width="16"
          height="16"
          {...props}
        >
          <title>Arrow Left</title>
        </svg>
      );
    },
  };
});

describe("CartHeader", () => {
  // Test 1: Renders cart header with title
  it("renders cart header with 'Your Cart' title", () => {
    render(<CartHeader totalItems={0} />);

    const heading = screen.getByRole("heading", { name: /your cart/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Your Cart");
  });

  // Test 2: Displays correct item count
  it("displays correct item count", () => {
    render(<CartHeader totalItems={5} />);

    expect(screen.getByText("5 items")).toBeInTheDocument();
  });

  // Test 3: Displays singular form for single item
  it("displays item count for single item", () => {
    render(<CartHeader totalItems={1} />);

    expect(screen.getByText("1 items")).toBeInTheDocument();
  });

  // Test 4: Displays zero items
  it("displays zero items correctly", () => {
    render(<CartHeader totalItems={0} />);

    expect(screen.getByText("0 items")).toBeInTheDocument();
  });

  // Test 5: Renders back to catalog link
  it("renders back to catalog link", () => {
    render(<CartHeader totalItems={0} />);

    const backLink = screen.getByRole("link", { name: /back to catalog/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
  });

  // Test 6: Renders arrow left icon in back link
  it("renders arrow left icon in back link", () => {
    render(<CartHeader totalItems={0} />);

    const backLink = screen.getByRole("link", { name: /back to catalog/i });
    const arrowIcon = screen.getByTestId("arrow-left-icon");

    expect(backLink).toContainElement(arrowIcon);
  });

  // Test 7: Back link is clickable
  it("back link is clickable", async () => {
    const user = userEvent.setup();
    render(<CartHeader totalItems={0} />);

    const backLink = screen.getByRole("link", { name: /back to catalog/i });
    await user.click(backLink);

    expect(backLink).toHaveAttribute("href", "/");
  });

  // Test 8: Applies correct styling classes
  it("applies correct styling classes to header elements", () => {
    render(<CartHeader totalItems={5} />);

    const heading = screen.getByRole("heading", { name: /your cart/i });
    expect(heading).toHaveClass("sm:text-4xl", "text-2xl", "font-bold");

    const itemCount = screen.getByText("5 items");
    expect(itemCount).toHaveClass("sm:text-2xl", "text-xl");
  });
});
