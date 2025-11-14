import { renderHook, act } from "@testing-library/react";
import useUrlQueryParams from "./useUrlQueryParams";

// Mock next/navigation
const mockPush = jest.fn();
const mockPathname = "/test-path";
let mockSearchParamsString = "param1=value1&param2=value2";

const createMockSearchParams = () => {
  return new URLSearchParams(mockSearchParamsString);
};

jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: mockPush,
    }),
    usePathname: () => mockPathname,
    useSearchParams: () => createMockSearchParams(),
  };
});

describe("useUrlQueryParams", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockSearchParamsString = "param1=value1&param2=value2";
  });

  // Test 1: Gets param value correctly
  it("gets param value correctly", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    expect(result.current.getParamValue("param1")).toBe("value1");
    expect(result.current.getParamValue("param2")).toBe("value2");
  });

  // Test 2: Returns null for non-existent param
  it("returns null for non-existent param", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    expect(result.current.getParamValue("non-existent")).toBe(null);
  });

  // Test 3: Gets all params
  it("gets all params", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    const allParams = result.current.getAllParams();

    expect(allParams.get("param1")).toBe("value1");
    expect(allParams.get("param2")).toBe("value2");
  });

  // Test 4: Sets new params
  it("sets new params", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    act(() => {
      result.current.setParams({ param3: "value3" });
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      "/test-path?param1=value1&param2=value2&param3=value3",
      { scroll: false }
    );
  });

  // Test 5: Updates existing param
  it("updates existing param", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    act(() => {
      result.current.setParams({ param1: "new-value" });
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      "/test-path?param1=new-value&param2=value2",
      { scroll: false }
    );
  });

  // Test 6: Sets multiple params at once
  it("sets multiple params at once", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    act(() => {
      result.current.setParams({
        param3: "value3",
        param4: "value4",
      });
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    const callArgs = mockPush.mock.calls[0][0];
    expect(callArgs).toContain("param3=value3");
    expect(callArgs).toContain("param4=value4");
  });

  // Test 7: Removes param when value is null
  it("removes param when value is null", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    act(() => {
      result.current.setParams({ param1: null });
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/test-path?param2=value2", {
      scroll: false,
    });
  });

  // Test 8: Removes param when value is empty string
  it("removes param when value is empty string", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    act(() => {
      result.current.setParams({ param1: "" });
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/test-path?param2=value2", {
      scroll: false,
    });
  });

  // Test 9: Removes param using removeParam
  it("removes param using removeParam", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    act(() => {
      result.current.removeParam("param1");
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/test-path?param2=value2", {
      scroll: false,
    });
  });

  // Test 10: Converts number values to strings
  it("converts number values to strings", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    act(() => {
      result.current.setParams({ param3: 123 });
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    const callArgs = mockPush.mock.calls[0][0];
    expect(callArgs).toContain("param3=123");
  });

  // Test 11: Handles updating and removing params simultaneously
  it("handles updating and removing params simultaneously", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    act(() => {
      result.current.setParams({
        param1: "updated-value",
        param2: null,
        param3: "new-value",
      });
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    const callArgs = mockPush.mock.calls[0][0];
    expect(callArgs).toContain("param1=updated-value");
    expect(callArgs).toContain("param3=new-value");
    expect(callArgs).not.toContain("param2");
  });

  // Test 12: Preserves existing params when adding new ones
  it("preserves existing params when adding new ones", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    act(() => {
      result.current.setParams({ param3: "value3" });
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    const callArgs = mockPush.mock.calls[0][0];
    expect(callArgs).toContain("param1=value1");
    expect(callArgs).toContain("param2=value2");
    expect(callArgs).toContain("param3=value3");
  });

  // Test 13: Handles empty search params
  it("handles empty search params", () => {
    // Clear search params
    mockSearchParamsString = "";

    const { result } = renderHook(() => useUrlQueryParams());

    expect(result.current.getParamValue("param1")).toBe(null);

    act(() => {
      result.current.setParams({ param1: "value1" });
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/test-path?param1=value1", {
      scroll: false,
    });
  });

  // Test 14: getAllParams returns a new URLSearchParams instance
  it("getAllParams returns a new URLSearchParams instance", () => {
    const { result } = renderHook(() => useUrlQueryParams());

    const params1 = result.current.getAllParams();
    const params2 = result.current.getAllParams();

    expect(params1).not.toBe(params2);
    expect(params1.toString()).toBe(params2.toString());
  });
});
