import { SHOPPING_CART_STORAGE_NAME } from "@/constants/games";
import { useLocalStorage } from "./useLocalStorage";
import { Game } from "@/utils/endpoint";

export type ShoppingCartLocalRes = {
  addItem: (item: Game) => void;
  getTotalItemsPrice: () => number;
  removeFromCart: (id: string) => void;
  removeAllItems: () => void;
  totalItems: number;
  cartItems: Game[];
  isItemInCart: (id: string) => boolean;
};

const useShoppingCart = (): ShoppingCartLocalRes => {
  const [cartItems, setCartItems] = useLocalStorage<Game[]>(
    SHOPPING_CART_STORAGE_NAME,
    []
  );

  const totalItems = cartItems.length;

  const addItem = (item: Game): void => {
    setCartItems((currItems) => {
      const itemExist = currItems.find((elem) => elem.id === item.id);

      if (itemExist) {
        return currItems;
      }

      return [...currItems, item];
    });
  };

  const isItemInCart = (id: string): boolean => {
    return cartItems.some((item) => item.id === id);
  };

  const getTotalItemsPrice = (): number => {
    return cartItems.reduce((prev, { price }) => prev + price, 0);
  };

  const removeFromCart = (id: string): void => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  const removeAllItems = (): void => {
    setCartItems([]);
  };

  return {
    addItem,
    removeFromCart,
    getTotalItemsPrice,
    removeAllItems,
    cartItems,
    totalItems,
    isItemInCart,
  };
};
export default useShoppingCart;
