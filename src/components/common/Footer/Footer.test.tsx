import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "./Footer";

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

// Mock next/image
jest.mock("next/image", () => {
  return function MockImage({
    src,
    alt,
    width,
    height,
    ...props
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    [key: string]: unknown;
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} {...props} />;
  };
});

describe("Footer", () => {
  // Test 1: Renders footer element
  it("renders footer element with correct structure", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(footer.tagName).toBe("FOOTER");
  });

  // Test 2: Renders link with correct href
  it("renders link to home page", () => {
    render(<Footer />);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  // Test 3: Renders image with correct attributes
  it("renders logo image with correct src, alt, width, and height", () => {
    render(<Footer />);

    const image = screen.getByRole("img", { name: /logo/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/logo.svg");
    expect(image).toHaveAttribute("alt", "logo");
    expect(image).toHaveAttribute("width", "170");
    expect(image).toHaveAttribute("height", "44");
  });

  // Test 4: Applies correct styling classes to footer
  it("applies correct styling classes to footer element", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass(
      "bg-[#404040]",
      "h-[172.5px]",
      "flex",
      "items-center",
      "justify-center"
    );
  });

  // Test 5: Applies correct styling classes to link
  it("applies correct styling classes to link element", () => {
    render(<Footer />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-2xl", "font-bold", "text-[#585660]");
  });

  // Test 6: Link is clickable and navigates
  it("link is clickable and has correct navigation", async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();

    // Verify link is clickable (not disabled)
    expect(link).not.toHaveAttribute("aria-disabled", "true");

    // Simulate click
    await user.click(link);

    // Verify link has correct href for navigation
    expect(link).toHaveAttribute("href", "/");
  });

  // Test 7: Image is nested inside link
  it("renders image nested inside link", () => {
    render(<Footer />);

    const link = screen.getByRole("link");
    const image = screen.getByRole("img", { name: /logo/i });

    expect(link).toContainElement(image);
    expect(image.closest("a")).toBe(link);
  });
});
