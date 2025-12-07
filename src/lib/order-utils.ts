import type { OrderStatus } from "@/types";

export const statusLabels: Record<OrderStatus, string> = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  processing: "Đang xử lý",
  shipped: "Đã giao hàng",
  delivered: "Đã nhận hàng",
  cancelled: "Đã hủy",
};

export const getStatusColor = (status: OrderStatus): string => {
  const colors: Record<OrderStatus, string> = {
    pending: "!bg-yellow-100 !text-yellow-800 !border-yellow-300 hover:!bg-yellow-200",
    confirmed: "!bg-blue-100 !text-blue-800 !border-blue-300 hover:!bg-blue-200",
    processing: "!bg-purple-100 !text-purple-800 !border-purple-300 hover:!bg-purple-200",
    shipped: "!bg-indigo-100 !text-indigo-800 !border-indigo-300 hover:!bg-indigo-200",
    delivered: "!bg-green-100 !text-green-800 !border-green-300 hover:!bg-green-200",
    cancelled: "!bg-red-100 !text-red-800 !border-red-300 hover:!bg-red-200",
  };
  return colors[status];
};

export const getStatusVariant = (status: OrderStatus): "default" | "secondary" | "destructive" | "outline" => {
  const variants: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
    pending: "outline",
    confirmed: "default",
    processing: "default",
    shipped: "default",
    delivered: "default",
    cancelled: "destructive",
  };
  return variants[status];
};

