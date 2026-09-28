"use client";

import { useState } from "react";
import { createTransaction } from "../actions/transactions";

export default function TransactionForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        {isOpen ? "Fechar" : "Nova transação"}
      </button>

      {isOpen && (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-indigo-100">
          <h3 className="text-xl font-bold text-indigo-950">
            Nova transação
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Registre uma nova movimentação financeira.
          </p>

          <form
            action={createTransaction}
            className="mt-6 space-y-5"
          >
            {/* Descrição */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Descrição
              </label>

              <input
                type="text"
                name="description"
                placeholder="Ex.: Salário, supermercado..."
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Valor */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Valor
              </label>

              <input
                type="number"
                name="amount"
                step="0.01"
                min="0.01"
                placeholder="0,00"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Tipo de movimentação
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    required
                    className="peer sr-only"
                  />

                  <div className="rounded-lg border border-slate-300 bg-white p-3 text-center font-medium transition peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700">
                    Receita
                  </div>
                </label>

                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    className="peer sr-only"
                  />

                  <div className="rounded-lg border border-slate-300 bg-white p-3 text-center font-medium transition peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700">
                    Despesa
                  </div>
                </label>
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              Cadastrar transação
            </button>
          </form>
        </div>
      )}
    </div>
  );
}