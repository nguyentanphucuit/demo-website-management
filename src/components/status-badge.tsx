import type { OrderStatus } from "@/types";
import { statusLabels } from "@/lib/order-utils";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200",
  processing: "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200",
  shipped: "bg-cyan-100 text-cyan-800 border-cyan-300 hover:bg-cyan-200",
  delivered: "bg-green-100 text-green-800 border-green-300 hover:bg-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-300 hover:bg-red-200",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${statusColors[status]} ${className || ""}`}
    >
      {statusLabels[status]}
    </span>
  );
}

