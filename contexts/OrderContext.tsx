import { createContext, useContext, useState, ReactNode } from 'react';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface OrderContextType {
  items: OrderItem[];
  customerName: string;
  restaurantId: number | null;
  restaurantName: string;
  sessionId: string;
  tableNumber: string;
  addItem: (item: OrderItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotal: () => number;
  clearOrder: () => void;
  clearItems: () => void;
  setRestaurant: (id: number, name: string) => void;
  setTableNumber: (table: string) => void;
  submitOrder: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [customerName] = useState('Fernando');
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [restaurantName, setRestaurantName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const addItem = (item: OrderItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setItems(prev => prev.map(i => 
        i.id === id ? { ...i, quantity } : i
      ));
    }
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const clearOrder = () => {
    setItems([]);
    setRestaurantId(null);
    setRestaurantName('');
    setTableNumber('');
  };

  const clearItems = () => {
    setItems([]);
  };

  const setRestaurant = (id: number, name: string) => {
    setRestaurantId(id);
    setRestaurantName(name);
  };

  const submitOrder = async () => {
    if (!restaurantId || items.length === 0) return;
    
    const orderData = {
      restaurantId,
      customerName,
      sessionId,
      total: getTotal(),
      items: items.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };
    
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    
    // Clear items after submitting but keep session
    clearItems();
  };

  return (
    <OrderContext.Provider value={{
      items,
      customerName,
      restaurantId,
      restaurantName,
      sessionId,
      tableNumber,
      addItem,
      removeItem,
      updateQuantity,
      getTotal,
      clearOrder,
      clearItems,
      setRestaurant,
      setTableNumber,
      submitOrder,
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
}
