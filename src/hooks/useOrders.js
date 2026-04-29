import { useState, useEffect } from "react";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedOrders = localStorage.getItem("admin_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Error al leer de LocalStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("admin_orders", JSON.stringify(orders));
    }
  }, [orders, isMounted]);

  const addOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      client: orderData.client.trim(),
      product: orderData.product.trim(),
      price: parseFloat(orderData.price) || 0,
      status: "Pendiente"
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const toggleStatus = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: order.status === "Pendiente" ? "Entregado" : "Pendiente" }
          : order
      )
    );
  };

  const deleteOrder = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
  };

  const clearOrders = () => {
    if (confirm("¿Estás seguro de que deseas eliminar TODOS los pedidos? Esta acción no se puede deshacer.")) {
      setOrders([]);
    }
  };

  return {
    orders,
    isMounted,
    addOrder,
    toggleStatus,
    deleteOrder,
    clearOrders
  };
}
