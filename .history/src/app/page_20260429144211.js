console.log("ESTOY EN PAGE");
"use client";

import { useOrders } from "@/hooks/useOrders";
import { useDarkMode } from "@/hooks/useDarkMode";
import Header from "@/components/Header";
import OrderForm from "@/components/OrderForm";
import OrderList from "@/components/OrderList";

export default function Dashboard() {
  const {
    orders,
    isMounted: ordersMounted,
    addOrder,
    toggleStatus,
    deleteOrder,
    clearOrders
  } = useOrders();

  const { isDark, toggleDarkMode, isMounted: themeMounted } = useDarkMode();

  if (!ordersMounted || !themeMounted) return null;

  const totalSales = orders.reduce((total, order) => total + order.price, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        <Header 
          totalSales={totalSales} 
          isDark={isDark} 
          onToggleTheme={toggleDarkMode} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <section className="lg:col-span-4">
            <OrderForm onAddOrder={addOrder} />
          </section>

          <section className="lg:col-span-8">
            <OrderList
              orders={orders}
              onClearOrders={clearOrders}
              onToggleStatus={toggleStatus}
              onDeleteOrder={deleteOrder}
            />
          </section>
          
        </div>
      </div>
    </div>
  );
}
