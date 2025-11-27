import { createContext, ReactNode, useContext, useState } from 'react';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  created_at: string;
  total: number;
  items: OrderItem[];
}

interface OrderContextType {
  items: OrderItem[];
  orderHistory: Order[];
  customerName: string;
  restaurantId: number | null;
  restaurantName: string;
  sessionId: string;
  tableNumber: string;
  transferredAmount: number;
  isSessionActive: boolean;
  addItem: (item: OrderItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotal: () => number;
  clearOrder: () => void;
  clearItems: () => void;
  setRestaurant: (id: number, name: string) => void;
  setTableNumber: (table: string) => void;
  addTransferredAmount: (amount: number) => void;
  submitOrder: () => Promise<void>;
  getSessionDurationMinutes: () => number;
  setSessionActive: (active: boolean) => void;
  addToHistory: (order: Order) => void;
  resetSession: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [customerName] = useState('Fernando');
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [restaurantName, setRestaurantName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [transferredAmount, setTransferredAmount] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [sessionStartTime] = useState(() => Date.now());
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

  const addTransferredAmount = (amount: number) => {
    setTransferredAmount(prev => prev + amount);
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
    
    // Mock: simular envio de pedido (em produção, fazer requisição real)
    console.log('Pedido submetido (mock):', orderData);
    
    // Clear items after submitting but keep session
    clearItems();
  };

  const getSessionDurationMinutes = () => {
    const now = Date.now();
    const durationMs = now - sessionStartTime;
    return Math.floor(durationMs / (1000 * 60));
  };

  const setSessionActive = (active: boolean) => {
    setIsSessionActive(active);
  };

  const addToHistory = (order: Order) => {
    setOrderHistory(prev => [...prev, order]);
  };

  const resetSession = () => {
    // Limpa tudo para uma nova sessão
    setItems([]);
    setTransferredAmount(0);
    setRestaurantId(null);
    setRestaurantName('');
    setTableNumber('');
    setIsSessionActive(true);
    // orderHistory é mantido (histórico completo da vida do usuário)
  };

  return (
    <OrderContext.Provider value={{
      items,
      orderHistory,
      customerName,
      restaurantId,
      restaurantName,
      sessionId,
      tableNumber,
      transferredAmount,
      isSessionActive,
      addItem,
      removeItem,
      updateQuantity,
      getTotal,
      clearOrder,
      clearItems,
      setRestaurant,
      setTableNumber,
      addTransferredAmount,
      submitOrder,
      getSessionDurationMinutes,
      setSessionActive,
      addToHistory,
      resetSession,
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
