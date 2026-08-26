import React, { createContext, useContext, useState } from 'react';
import type { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  promoCode: string;
  discountPercent: number;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  totalCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  finalTotal: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VALID_PROMOS: Record<string, number> = {
  NEXTLEVEL20: 20,
  HYPERFUEL: 15,
  FITNESS10: 10,
  FREESHIP: 10,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    return [
      {
        id: 'init-1',
        flavorId: 'chocolate-fudge',
        flavorName: 'Chocolate Fudge',
        bundleId: 'box-12',
        bundleName: 'Starter 12-Pack',
        barsCount: 12,
        price: 38.99,
        quantity: 1,
        isSubscription: false,
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const freeShippingThreshold = 50.0;

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) =>
          i.flavorId === newItem.flavorId &&
          i.bundleId === newItem.bundleId &&
          i.isSubscription === newItem.isSubscription
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }

      const created: CartItem = {
        ...newItem,
        id: `${newItem.flavorId}-${newItem.bundleId}-${Date.now()}`,
      };
      return [...prevItems, created];
    });

    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (VALID_PROMOS[trimmed]) {
      setPromoCode(trimmed);
      setDiscountPercent(VALID_PROMOS[trimmed]);
      setPromoError(null);
      return true;
    } else {
      setPromoError('Invalid code. Try "NEXTLEVEL20" or "HYPERFUEL"');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setPromoError(null);
  };

  const totalCount = items.reduce((acc, item) => acc + item.quantity * item.barsCount, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const eligibleSubtotal = subtotal - discountAmount;
  const shippingFee = eligibleSubtotal >= freeShippingThreshold || eligibleSubtotal === 0 || promoCode === 'FREESHIP' ? 0 : 5.99;
  const finalTotal = Math.max(0, eligibleSubtotal + shippingFee);
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - eligibleSubtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        promoCode,
        discountPercent,
        promoError,
        applyPromoCode,
        removePromoCode,
        totalCount,
        subtotal,
        discountAmount,
        shippingFee,
        finalTotal,
        freeShippingThreshold,
        amountUntilFreeShipping,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
