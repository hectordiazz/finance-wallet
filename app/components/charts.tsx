"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type ChartData = {
  name: string;
  valor: number;
};

type PieData = {
  name: string;
  value: number;
};

type ChartsProps = {
  chartData: ChartData[];
  pieData: PieData[];
};

export default function Charts({
  chartData,
  pieData,
}: ChartsProps) {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

      {/* Gráfico de barras */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-indigo-100">
        <h3 className="text-xl font-bold text-indigo-950">
          Receitas x Despesas
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Comparação entre o total recebido e gasto
        </p>

        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  formatCurrency(Number(value))
                }
              />

              <Bar
                dataKey="valor"
                fill="#4f46e5"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de pizza */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-indigo-100">
        <h3 className="text-xl font-bold text-indigo-950">
          Distribuição financeira
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Participação de receitas e despesas
        </p>

        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                <Cell fill="#10b981" />
                <Cell fill="#ef4444" />
              </Pie>

              <Tooltip
                formatter={(value) =>
                  formatCurrency(Number(value))
                }
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}