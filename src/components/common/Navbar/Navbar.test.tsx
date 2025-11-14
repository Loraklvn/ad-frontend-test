import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

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

// Mock CartIcon
jest.mock("@/components/Icons/CartIcon", () => {
  return function MockCartIcon(props: React.SVGAttributes<SVGElement>) {
    return (
      <svg
        data-testid="cart-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        {...props}
      >
        <title>Cart</title>
      </svg>
    );
  };
});

describe("Navbar", () => {
  // Test 1: Renders nav element
  it("renders nav element with correct structure", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(nav.tagName).toBe("NAV");
  });

  // Test 2: Renders logo link to home
  it("renders logo link to home page", () => {
    render(<Navbar />);

    const homeLink = screen.getByRole("link", { name: /gamershop/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink).toHaveTextContent("GamerShop");
  });

  // Test 3: Renders cart link
  it("renders cart link to cart page", () => {
    render(<Navbar />);

    const cartLink = screen.getByRole("link", { name: /cart/i });
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  // Test 4: Renders CartIcon in cart link
  it("renders CartIcon inside cart link", () => {
    render(<Navbar />);

    const cartLink = screen.getByRole("link", { name: /cart/i });
    const cartIcon = screen.getByTestId("cart-icon");

    expect(cartLink).toContainElement(cartIcon);
  });

  // Test 5: Applies correct styling classes
  it("applies correct styling classes to nav element", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("bg-[#EEEEEE]", "h-16");
  });

  // Test 6: Links are clickable
  it("home and cart links are clickable", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const homeLink = screen.getByRole("link", { name: /gamershop/i });
    const cartLink = screen.getByRole("link", { name: /cart/i });

    await user.click(homeLink);
    expect(homeLink).toHaveAttribute("href", "/");

    await user.click(cartLink);
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  // Test 7: Has correct layout structure
  it("has correct layout structure with flex container", () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");
    const innerDiv = nav?.querySelector("div");

    expect(innerDiv).toBeInTheDocument();
    expect(innerDiv).toHaveClass(
      "flex",
      "justify-between",
      "items-center",
      "max-w-7xl",
      "mx-auto"
    );
  });
});
