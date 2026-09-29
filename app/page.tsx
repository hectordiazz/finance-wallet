import { supabase } from "@/lib/supabase";
import TransactionForm from "./components/transaction-form";

export default async function Home() {
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-indigo-50 p-4 md:p-8">
        <div className="rounded-xl bg-red-100 p-6 text-red-700">
          <h1 className="text-xl font-bold">
            Erro ao carregar transações
          </h1>

          <p className="mt-2">
            {error.message}
          </p>
        </div>
      </main>
    );
  }

  const totalIncome =
    transactions
      ?.filter((transaction) => transaction.type === "income")
      .reduce(
        (total, transaction) => total + Number(transaction.amount),
        0
      ) ?? 0;

  const totalExpense =
    transactions
      ?.filter((transaction) => transaction.type === "expense")
      .reduce(
        (total, transaction) => total + Number(transaction.amount),
        0
      ) ?? 0;

  const balance = totalIncome - totalExpense;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <main className="min-h-screen bg-indigo-50">
      <div className="flex min-h-screen flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="w-full bg-indigo-950 p-4 text-white md:w-56 md:p-6 lg:w-64">

          <div className="flex items-center justify-between md:block">
            <h1 className="text-xl font-bold md:text-2xl">
              FinanDesk
            </h1>
          </div>

          <nav className="mt-4 flex gap-2 md:mt-10 md:block md:space-y-2">

            <a
              href="/"
              className="flex-1 rounded-lg bg-indigo-800 px-3 py-2.5 text-center text-sm font-medium md:block md:px-4 md:py-3 md:text-left"
            >
              Dashboard
            </a>

            <a
              href="/relatorios"
              className="flex-1 rounded-lg px-3 py-2.5 text-center text-sm font-medium text-indigo-300 transition hover:bg-indigo-900 md:block md:px-4 md:py-3 md:text-left"
            >
              Relatórios
            </a>

          </nav>
        </aside>

        {/* Conteúdo principal */}
        <section className="flex-1 p-4 md:p-6 lg:p-8">

          {/* Cabeçalho */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-950 md:text-3xl">
              Dashboard
            </h2>

            <p className="mt-1 text-sm text-indigo-700 md:text-base">
              Visão geral das suas finanças
            </p>
          </div>

          {/* Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3">

            {/* Saldo */}
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-indigo-100 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Saldo atual
                  </p>

                  <p className="mt-2 text-2xl font-bold text-indigo-700 md:mt-3 md:text-3xl">
                    {formatCurrency(balance)}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xl md:h-12 md:w-12 md:text-2xl">
                  💰
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-500 md:mt-4">
                Resultado das suas movimentações
              </p>
            </div>

            {/* Receitas */}
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-indigo-100 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total de receitas
                  </p>

                  <p className="mt-2 text-2xl font-bold text-emerald-600 md:mt-3 md:text-3xl">
                    {formatCurrency(totalIncome)}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-xl md:h-12 md:w-12 md:text-2xl">
                  ↗
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-500 md:mt-4">
                Total de dinheiro recebido
              </p>
            </div>

            {/* Despesas */}
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-indigo-100 md:p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total de despesas
                  </p>

                  <p className="mt-2 text-2xl font-bold text-red-600 md:mt-3 md:text-3xl">
                    {formatCurrency(totalExpense)}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-xl md:h-12 md:w-12 md:text-2xl">
                  ↘
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-500 md:mt-4">
                Total de dinheiro gasto
              </p>
            </div>

          </div>

          {/* Nova transação */}
          <div className="mt-6 md:mt-8">
            <TransactionForm />
          </div>

          {/* Histórico */}
          <div className="mt-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-indigo-100 md:mt-8 md:p-6">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h3 className="text-xl font-bold text-indigo-950">
                  Transações recentes
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Histórico das suas movimentações financeiras
                </p>
              </div>

              <div className="w-fit rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700">
                {transactions?.length ?? 0} movimentações
              </div>

            </div>

            {transactions && transactions.length > 0 ? (
              <div className="mt-5 space-y-3 md:mt-6">

                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/50 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div className="flex items-center gap-3 md:gap-4">

                      {/* Ícone */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold md:h-11 md:w-11 md:text-xl ${
                          transaction.type === "income"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "↗" : "↘"}
                      </div>

                      {/* Informações */}
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {transaction.description}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                          <span>
                            {new Date(
                              transaction.created_at
                            ).toLocaleDateString("pt-BR")}
                          </span>

                          <span>•</span>

                          <span
                            className={
                              transaction.type === "income"
                                ? "text-emerald-600"
                                : "text-red-600"
                            }
                          >
                            {transaction.type === "income"
                              ? "Receita"
                              : "Despesa"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Valor */}
                    <p
                      className={`text-base font-bold sm:text-right ${
                        transaction.type === "income"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}{" "}
                      {formatCurrency(Number(transaction.amount))}
                    </p>

                  </div>
                ))}

              </div>
            ) : (
              <p className="mt-5 text-slate-500">
                Nenhuma transação cadastrada ainda.
              </p>
            )}

          </div>

        </section>
      </div>
    </main>
  );
}