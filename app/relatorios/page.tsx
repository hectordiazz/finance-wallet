import { supabase } from "@/lib/supabase";
import Charts from "../components/charts";

export default async function Relatorios() {
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return (
      <main className="min-h-screen bg-indigo-50 p-8">
        <div className="rounded-xl bg-red-100 p-6 text-red-700">
          <h1 className="text-xl font-bold">
            Erro ao carregar os relatórios
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

  const chartData = [
    {
      name: "Receitas",
      valor: totalIncome,
    },
    {
      name: "Despesas",
      valor: totalExpense,
    },
  ];

  const pieData = [
    {
      name: "Receitas",
      value: totalIncome,
    },
    {
      name: "Despesas",
      value: totalExpense,
    },
  ];

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <main className="min-h-screen bg-indigo-50">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="w-64 bg-indigo-950 p-6 text-white">
          <h1 className="text-2xl font-bold">
            FinanDesk
          </h1>

          <nav className="mt-10 space-y-2">
            <a
              href="/"
              className="block rounded-lg px-4 py-3 text-indigo-300 transition hover:bg-indigo-900"
            >
              Dashboard
            </a>

            <a
              href="/relatorios"
              className="block rounded-lg bg-indigo-800 px-4 py-3"
            >
              Relatórios
            </a>
          </nav>
        </aside>

        {/* Conteúdo principal */}
        <section className="flex-1 p-8">

          {/* Cabeçalho */}
          <div>
            <h2 className="text-3xl font-bold text-indigo-950">
              Relatórios
            </h2>

            <p className="mt-1 text-indigo-700">
              Analise suas movimentações financeiras
            </p>
          </div>

          {/* Cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

            {/* Saldo */}
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-indigo-100">
              <p className="text-sm font-medium text-slate-500">
                Saldo atual
              </p>

              <p className="mt-3 text-3xl font-bold text-indigo-700">
                {formatCurrency(balance)}
              </p>
            </div>

            {/* Receitas */}
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-indigo-100">
              <p className="text-sm font-medium text-slate-500">
                Total de receitas
              </p>

              <p className="mt-3 text-3xl font-bold text-emerald-600">
                {formatCurrency(totalIncome)}
              </p>
            </div>

            {/* Despesas */}
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-indigo-100">
              <p className="text-sm font-medium text-slate-500">
                Total de despesas
              </p>

              <p className="mt-3 text-3xl font-bold text-red-600">
                {formatCurrency(totalExpense)}
              </p>
            </div>

          </div>

          {/* Gráficos */}
          <Charts
            chartData={chartData}
            pieData={pieData}
          />

          {/* Resumo */}
          <div className="mt-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-indigo-100">
            <h3 className="text-xl font-bold text-indigo-950">
              Resumo
            </h3>

            <p className="mt-2 text-slate-600">
              Você possui{" "}
              <strong>{transactions?.length ?? 0}</strong>{" "}
              movimentações registradas no sistema.
            </p>
          </div>

        </section>
      </div>
    </main>
  );
}