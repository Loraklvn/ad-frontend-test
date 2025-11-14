import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CatalogHeader from "./CatalogHeader";
import { GENRE_OPTIONS } from "@/constants/games";

describe("CatalogHeader", () => {
  const mockSetSelectedGenre = jest.fn();

  beforeEach(() => {
    mockSetSelectedGenre.mockClear();
  });

  // Test 1: Renders header with title
  it("renders header with 'Top Sellers' title", () => {
    render(
      <CatalogHeader
        selectedGenre=""
        setSelectedGenre={mockSetSelectedGenre}
      />
    );

    const heading = screen.getByRole("heading", { name: /top sellers/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Top Sellers");
  });

  // Test 2: Renders genre label
  it("renders genre label", () => {
    render(
      <CatalogHeader
        selectedGenre=""
        setSelectedGenre={mockSetSelectedGenre}
      />
    );

    const genreLabel = screen.getByRole("heading", { name: /genre/i });
    expect(genreLabel).toBeInTheDocument();
    expect(genreLabel).toHaveTextContent("Genre");
  });

  // Test 3: Renders genre select dropdown
  it("renders genre select dropdown", () => {
    render(
      <CatalogHeader
        selectedGenre=""
        setSelectedGenre={mockSetSelectedGenre}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select.tagName).toBe("SELECT");
  });

  // Test 4: Renders "All" option
  it("renders 'All' option in select dropdown", () => {
    render(
      <CatalogHeader
        selectedGenre=""
        setSelectedGenre={mockSetSelectedGenre}
      />
    );

    const allOption = screen.getByRole("option", { name: /all/i });
    expect(allOption).toBeInTheDocument();
    expect(allOption).toHaveValue("");
  });

  // Test 5: Renders all genre options
  it("renders all genre options from GENRE_OPTIONS", () => {
    render(
      <CatalogHeader
        selectedGenre=""
        setSelectedGenre={mockSetSelectedGenre}
      />
    );

    GENRE_OPTIONS.forEach((genre) => {
      const option = screen.getByRole("option", { name: genre });
      expect(option).toBeInTheDocument();
      expect(option).toHaveValue(genre);
    });
  });

  // Test 6: Displays selected genre
  it("displays the selected genre in the dropdown", () => {
    render(
      <CatalogHeader
        selectedGenre="Action"
        setSelectedGenre={mockSetSelectedGenre}
      />
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("Action");
  });

  // Test 7: Calls setSelectedGenre when genre changes
  it("calls setSelectedGenre when genre is changed", async () => {
    const user = userEvent.setup();
    render(
      <CatalogHeader
        selectedGenre=""
        setSelectedGenre={mockSetSelectedGenre}
      />
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "Action");

    expect(mockSetSelectedGenre).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedGenre).toHaveBeenCalledWith("Action");
  });

  // Test 8: Applies correct styling classes
  it("applies correct styling classes to header elements", () => {
    const { container } = render(
      <CatalogHeader
        selectedGenre=""
        setSelectedGenre={mockSetSelectedGenre}
      />
    );

    const headerDiv = container.firstChild as HTMLElement;
    expect(headerDiv).toHaveClass(
      "mt-6",
      "border-b",
      "border-[#EFEDF3]",
      "pb-12"
    );

    const heading = screen.getByRole("heading", { name: /top sellers/i });
    expect(heading).toHaveClass("text-2xl", "sm:text-4xl", "font-bold");
  });
});

