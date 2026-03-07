import React, { useEffect, useState } from "react";
import { adminService } from "../services/api";

export const AnalyticsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await adminService.getStats();
      setStats(data);
    } catch (err) {
      setError("Failed to load analytics");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="animate-pulse flex space-x-4 h-64 bg-gray-100 dark:bg-gray-800 rounded-xl mb-8"></div>
    );
  if (error)
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8">{error}</div>
    );
  if (!stats) return null;

  const { summary, salesByCategory, topSweets, salesTrend } = stats;

  // Simple Line Chart logic for Sales Trend
  const maxRevenue = Math.max(...salesTrend.map((d) => d.revenue), 1);
  const chartHeight = 150;
  const chartWidth = 500;

  const points = salesTrend
    .map((d, i) => {
      const x = (i / (salesTrend.length - 1)) * chartWidth;
      const y = chartHeight - (d.revenue / maxRevenue) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Summary Cards */}
      <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Revenue",
            value: `₹${summary.totalRevenue}`,
            icon: "💰",
            color: "text-green-600",
          },
          {
            label: "Total Orders",
            value: summary.totalOrders,
            icon: "📦",
            color: "text-blue-600",
          },
          {
            label: "Total Sweets",
            value: summary.totalSweets,
            icon: "🍬",
            color: "text-purple-600",
          },
          {
            label: "Total Users",
            value: summary.totalUsers,
            icon: "👥",
            color: "text-orange-600",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.label}
            </p>
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Sales Trend Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-100">
          7-Day Sales Trend
        </h3>
        <div className="relative h-[200px] w-full pt-4">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-full overflow-visible"
          >
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((v, i) => (
              <line
                key={i}
                x1="0"
                y1={chartHeight * v}
                x2={chartWidth}
                y2={chartHeight * v}
                stroke="currentColor"
                strokeOpacity="0.1"
              />
            ))}

            {/* Area under the line */}
            <path
              d={`M 0,${chartHeight} ${points} L ${chartWidth},${chartHeight} Z`}
              fill="rgba(59, 130, 246, 0.1)"
            />

            {/* The Line */}
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={points}
              className="drop-shadow-sm"
            />

            {/* Data points */}
            {salesTrend.map((d, i) => (
              <circle
                key={i}
                cx={(i / (salesTrend.length - 1)) * chartWidth}
                cy={chartHeight - (d.revenue / maxRevenue) * chartHeight}
                r="4"
                fill="#3b82f6"
              />
            ))}
          </svg>

          <div className="flex justify-between mt-4">
            {salesTrend.map((d, i) => (
              <span key={i} className="text-[10px] text-gray-400 font-medium">
                {d.date.split("-").slice(1).reverse().join("/")}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sales by Category */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-100">
          Sales by Category
        </h3>
        <div className="space-y-4">
          {salesByCategory.map((cat, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1 text-gray-600 dark:text-gray-400">
                <span>{cat.name}</span>
                <span className="font-bold">₹{cat.value}</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all duration-1000"
                  style={{
                    width: `${(cat.value / summary.totalRevenue) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
          {salesByCategory.length === 0 && (
            <p className="text-gray-400 text-sm italic">No sales data yet</p>
          )}
        </div>
      </div>
    </div>
  );
};
