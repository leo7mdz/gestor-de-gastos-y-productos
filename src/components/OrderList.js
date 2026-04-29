import { useState } from "react";
import OrderCard from "./OrderCard";

export default function OrderList({ orders, onClearOrders, onToggleStatus, onDeleteOrder }) {
  const [filter, setFilter] = useState("Todos");

  const filteredOrders = orders.filter((order) => {
    if (filter === "Todos") return true;
    return order.status === filter;
  });

  const pendingCount = orders.filter((o) => o.status === "Pendiente").length;
  const deliveredCount = orders.filter((o) => o.status === "Entregado").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-slate-800 p-4 sm:px-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-200 gap-4">
        
        {/* Título y Badge */}
        <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-3 whitespace-nowrap">
          <span className="bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 py-1 px-3 rounded-full text-sm">
            {orders.length}
          </span>
          Pedidos
        </h2>
        
        {/* Sistema de Filtros (Tabs) */}
        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setFilter("Todos")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
              filter === "Todos" 
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800"
            }`}
          >
            Todos
          </button>
          
          <button
            onClick={() => setFilter("Pendiente")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              filter === "Pendiente" 
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800"
            }`}
          >
            Pendientes
            <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 py-0.5 px-2 rounded-md text-xs">
              {pendingCount}
            </span>
          </button>
          
          <button
            onClick={() => setFilter("Entregado")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              filter === "Entregado" 
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800"
            }`}
          >
            Entregados
            <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 py-0.5 px-2 rounded-md text-xs">
              {deliveredCount}
            </span>
          </button>
        </div>

        {/* Botón de Limpiar */}
        {orders.length > 0 && (
          <button
            onClick={onClearOrders}
            className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-2 rounded-xl transition-colors font-semibold flex items-center justify-center gap-2 shrink-0 self-end sm:self-auto"
            title="Limpiar toda la lista"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="hidden lg:inline">Limpiar</span>
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-16 text-center shadow-sm flex flex-col items-center justify-center transition-colors duration-200">
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <svg className="w-10 h-10 text-slate-300 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No tienes pedidos pendientes</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm">Los pedidos que registres aparecerán aquí para que puedas gestionarlos.</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-12 text-center shadow-sm flex flex-col items-center justify-center transition-colors duration-200">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
            No hay pedidos {filter.toLowerCase()}s
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Intenta cambiar el filtro o agregar nuevos pedidos.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onToggleStatus={onToggleStatus}
              onDelete={onDeleteOrder}
            />
          ))}
        </div>
      )}
    </div>
  );
}
