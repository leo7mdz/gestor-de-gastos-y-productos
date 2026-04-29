export default function OrderCard({ order, onToggleStatus, onDelete }) {
  // Generar fecha y hora a partir del ID (que usa Date.now())
  const orderDate = new Date(parseInt(order.id));
  const formattedDate = orderDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  const formattedTime = orderDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  
  // Generar un ID corto de 4 caracteres
  const shortId = order.id.slice(-4);

  const isDelivered = order.status === "Entregado";

  return (
    <div className={`relative bg-white dark:bg-slate-800 rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all group flex flex-col overflow-hidden ${
      isDelivered 
        ? "border-emerald-200/50 dark:border-emerald-900/30" 
        : "border-amber-200/50 dark:border-amber-900/30"
    }`}>
      
      {/* Borde lateral decorativo */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors ${
        isDelivered ? "bg-emerald-500" : "bg-amber-500"
      }`}></div>

      {/* Header de la Tarjeta */}
      <div className="flex justify-between items-start gap-3 mb-4 pl-3">
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            ORD-{shortId}
          </span>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight flex items-center gap-2">
            <div className="bg-slate-100 dark:bg-slate-700/50 p-1.5 rounded-full text-slate-500 dark:text-slate-400 shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="truncate" title={order.client}>{order.client}</span>
          </h3>
        </div>
        <div className="shrink-0 flex flex-col items-end">
          <span className="font-black text-2xl text-indigo-600 dark:text-indigo-400 tracking-tight">
            ${order.price.toFixed(2)}
          </span>
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1 bg-slate-50 dark:bg-slate-900/50 px-2 py-0.5 rounded-full border border-slate-100 dark:border-slate-700">
            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formattedDate}, {formattedTime}
          </span>
        </div>
      </div>
      
      {/* Cuerpo de la Tarjeta */}
      <div className="bg-slate-50/80 dark:bg-slate-900/40 rounded-xl p-3.5 mb-5 ml-3 border border-slate-100 dark:border-slate-700/50 shadow-inner">
        <div className="flex items-start gap-3">
          <div className="bg-indigo-100/80 dark:bg-indigo-500/20 p-2 rounded-lg text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Producto</p>
            <p className="text-slate-700 dark:text-slate-200 font-semibold text-sm line-clamp-2 break-words" title={order.product}>
              {order.product}
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer / Controles */}
      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between pl-3">
        <button
          onClick={() => onToggleStatus(order.id)}
          className={`group flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 border ${
            isDelivered
              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30 shadow-sm"
              : "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/20 border-amber-200 dark:border-amber-500/30 shadow-sm"
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span className={`absolute w-3 h-3 rounded-full opacity-40 group-hover:animate-ping ${isDelivered ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            <span className={`relative w-2 h-2 rounded-full ${isDelivered ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'}`}></span>
          </div>
          {order.status}
        </button>
        
        <button
          onClick={() => onDelete(order.id)}
          className="text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 p-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          title="Eliminar pedido"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
