import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (hotelId: number) => void;
  removeFromWishlist: (hotelId: number) => void;
  isInWishlist: (hotelId: number) => boolean;
  toggleWishlist: (hotelId: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_KEY = 'luxstay-wishlist';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  }, [wishlist]);

  const addToWishlist = (hotelId: number) => {
    setWishlist((prev) => {
      if (prev.includes(hotelId)) return prev;
      return [...prev, hotelId];
    });
  };

  const removeFromWishlist = (hotelId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== hotelId));
  };

  const isInWishlist = (hotelId: number) => {
    return wishlist.includes(hotelId);
  };

  const toggleWishlist = (hotelId: number) => {
    if (isInWishlist(hotelId)) {
      removeFromWishlist(hotelId);
    } else {
      addToWishlist(hotelId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
