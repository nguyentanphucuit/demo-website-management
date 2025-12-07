"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProducts, mockOrders, mockCustomers } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, ShoppingBag, Package, Users } from "lucide-react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  BarController,
  DoughnutController,
} from "chart.js";

// Register all required components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  BarController,
  DoughnutController
);

interface ChartCanvasProps {
  type: "line" | "bar" | "doughnut";
  data: any;
  options: any;
}

function ChartCanvas({ type, data, options }: ChartCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart
    chartRef.current = new Chart(canvasRef.current, {
      type: type as "line" | "bar" | "doughnut",
      data,
      options: {
        ...options,
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Handle window resize
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <div ref={containerRef} className="h-[250px] sm:h-[300px] md:h-[350px] w-full">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default function ReportsPage() {
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockOrders.length;
  const totalProducts = mockProducts.length;
  const totalCustomers = mockCustomers.length;

  const revenueByMonth = [
    { month: "Tháng 1", revenue: 1500000 },
    { month: "Tháng 2", revenue: 2300000 },
    { month: "Tháng 3", revenue: 1800000 },
    { month: "Tháng 4", revenue: 2500000 },
    { month: "Tháng 5", revenue: 2100000 },
    { month: "Tháng 6", revenue: 2800000 },
  ];

  const topProducts = mockProducts
    .map((product) => ({
      productId: product.id,
      productName: product.name,
      sales: Math.floor(Math.random() * 100) + 10,
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  // Chart data for revenue by month
  const revenueChartData = {
    labels: revenueByMonth.map((item) => item.month),
    datasets: [
      {
        label: "Doanh Thu",
        data: revenueByMonth.map((item) => item.revenue),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Doanh thu: ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return formatCurrency(value);
          },
        },
      },
    },
  };

  // Chart data for top products
  const topProductsChartData = {
    labels: topProducts.map((product) => product.productName),
    datasets: [
      {
        label: "Số lượng bán",
        data: topProducts.map((product) => product.sales),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const topProductsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  // Doughnut chart for order status
  const orderStatusData = {
    labels: ["Chờ xử lý", "Đã xác nhận", "Đang xử lý", "Đã giao hàng", "Đã nhận hàng"],
    datasets: [
      {
        data: [2, 3, 1, 4, 2],
        backgroundColor: [
          "rgba(156, 163, 175, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(34, 197, 94, 0.8)",
        ],
        borderColor: [
          "rgba(156, 163, 175, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const orderStatusOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 12,
          padding: 8,
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Báo Cáo & Thống Kê</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Doanh Thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Từ {totalOrders} đơn hàng
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Đơn Hàng</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Đơn hàng đã xử lý
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Sản Phẩm</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Sản phẩm trong kho
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Khách Hàng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Khách hàng đã đăng ký
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Doanh Thu Theo Tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartCanvas
              type="line"
              data={revenueChartData}
              options={revenueChartOptions}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Sản Phẩm Bán Chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartCanvas
              type="bar"
              data={topProductsChartData}
              options={topProductsChartOptions}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Trạng Thái Đơn Hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartCanvas
              type="doughnut"
              data={orderStatusData}
              options={orderStatusOptions}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Doanh Thu Theo Tháng (Bar Chart)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartCanvas
              type="bar"
              data={{
                labels: revenueByMonth.map((item) => item.month),
                datasets: [
                  {
                    label: "Doanh Thu",
                    data: revenueByMonth.map((item) => item.revenue),
                    backgroundColor: "rgba(59, 130, 246, 0.8)",
                    borderColor: "rgba(59, 130, 246, 1)",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context: any) {
                        return `Doanh thu: ${formatCurrency(context.parsed.y)}`;
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function (value: any) {
                        return formatCurrency(value);
                      },
                    },
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

