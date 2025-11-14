import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  // Test 1: Returns initial value when localStorage is empty
  it("returns initial value when localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    expect(result.current[0]).toBe("initial-value");
  });

  // Test 2: Returns value from localStorage when it exists
  it("returns value from localStorage when it exists", () => {
    localStorageMock.setItem("test-key", JSON.stringify("stored-value"));

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    expect(result.current[0]).toBe("stored-value");
  });

  // Test 3: Updates localStorage when value changes
  it("updates localStorage when value changes", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    act(() => {
      result.current[1]("new-value");
    });

    expect(result.current[0]).toBe("new-value");
    expect(localStorageMock.getItem("test-key")).toBe(
      JSON.stringify("new-value")
    );
  });

  // Test 4: Handles complex objects
  it("handles complex objects", () => {
    const initialValue = { name: "John", age: 30 };
    const { result } = renderHook(() =>
      useLocalStorage("test-key", initialValue)
    );

    expect(result.current[0]).toEqual(initialValue);

    const newValue = { name: "Jane", age: 25 };
    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toEqual(newValue);
    expect(localStorageMock.getItem("test-key")).toBe(JSON.stringify(newValue));
  });

  // Test 5: Handles arrays
  it("handles arrays", () => {
    const initialValue = [1, 2, 3];
    const { result } = renderHook(() =>
      useLocalStorage("test-key", initialValue)
    );

    expect(result.current[0]).toEqual(initialValue);

    const newValue = [4, 5, 6];
    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toEqual(newValue);
    expect(localStorageMock.getItem("test-key")).toBe(JSON.stringify(newValue));
  });

  // Test 6: Handles invalid JSON in localStorage
  it("returns initial value when localStorage has invalid JSON", () => {
    localStorageMock.setItem("test-key", "invalid-json");

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    expect(result.current[0]).toBe("initial-value");
  });

  // Test 7: Updates value using functional setState
  it("updates value using functional setState", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(localStorageMock.getItem("test-key")).toBe(JSON.stringify(1));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
    expect(localStorageMock.getItem("test-key")).toBe(JSON.stringify(2));
  });

  // Test 8: Uses different keys independently
  it("uses different keys independently", () => {
    const { result: result1 } = renderHook(() =>
      useLocalStorage("key1", "value1")
    );
    const { result: result2 } = renderHook(() =>
      useLocalStorage("key2", "value2")
    );

    expect(result1.current[0]).toBe("value1");
    expect(result2.current[0]).toBe("value2");

    act(() => {
      result1.current[1]("new-value1");
    });

    expect(result1.current[0]).toBe("new-value1");
    expect(result2.current[0]).toBe("value2");
    expect(localStorageMock.getItem("key1")).toBe(JSON.stringify("new-value1"));
    expect(localStorageMock.getItem("key2")).toBe(JSON.stringify("value2"));
  });

  // Test 9: Persists value across re-renders
  it("persists value across re-renders", () => {
    const { result, rerender } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    act(() => {
      result.current[1]("updated-value");
    });

    rerender();

    expect(result.current[0]).toBe("updated-value");
    expect(localStorageMock.getItem("test-key")).toBe(
      JSON.stringify("updated-value")
    );
  });

  // Test 10: Handles null values
  it("handles null values", () => {
    const { result } = renderHook(() =>
      useLocalStorage<string | null>("test-key", null)
    );

    expect(result.current[0]).toBe(null);

    act(() => {
      result.current[1]("not-null");
    });

    expect(result.current[0]).toBe("not-null");

    act(() => {
      result.current[1](null);
    });

    expect(result.current[0]).toBe(null);
    expect(localStorageMock.getItem("test-key")).toBe(JSON.stringify(null));
  });

  // Test 11: Handles localStorage.getItem throwing an error
  it("handles localStorage.getItem throwing an error", () => {
    const originalGetItem = localStorageMock.getItem;
    localStorageMock.getItem = jest.fn(() => {
      throw new Error("Storage error");
    });

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    expect(result.current[0]).toBe("initial-value");

    // Restore original method
    localStorageMock.getItem = originalGetItem;
  });

  // Test 12: Handles JSON.parse throwing an error
  it("handles JSON.parse throwing an error", () => {
    // Set invalid JSON in localStorage
    localStorageMock.setItem("test-key", "invalid-json{");

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    // Should return initial value when JSON.parse fails
    expect(result.current[0]).toBe("initial-value");
  });
});
