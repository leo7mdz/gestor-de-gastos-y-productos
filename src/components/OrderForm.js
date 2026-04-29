import { useState } from "react";

export default function OrderForm({ onAddOrder }) {
  const [formData, setFormData] = useState({ client: "", product: "", price: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client || !formData.product || !formData.price) return;
    
    onAddOrder(formData);
    setFormData({ client: "", product: "", price: "" });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 sm:p-8 sticky top-8 transition-colors duration-200">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
        <div className="bg-indigo-50 dark:bg-indigo-500/20 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        Nuevo Pedido
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="client" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nombre del Cliente</label>
          <input
            type="text"
            id="client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all text-slate-700 dark:text-slate-200 font-medium placeholder-slate-400 dark:placeholder-slate-500"
            placeholder="Ej. María Gómez"
            required
          />
        </div>
        <div>
          <label htmlFor="product" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Producto</label>
          <input
            type="text"
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all text-slate-700 dark:text-slate-200 font-medium placeholder-slate-400 dark:placeholder-slate-500"
            placeholder="Ej. Torta de Chocolate"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Precio ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all text-slate-700 dark:text-slate-200 font-medium placeholder-slate-400 dark:placeholder-slate-500"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] shadow-sm flex justify-center items-center gap-2 mt-2"
        >
          Registrar
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>
    </div>
  );
}
