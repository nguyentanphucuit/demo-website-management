"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrderStore } from "@/lib/store";
import { mockOrders } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { statusLabels } from "@/lib/order-utils";
import { useToast } from "@/components/ui/use-toast";
import type { OrderStatus } from "@/types";

const statusOptions: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.orders);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Khởi tạo với mock orders nếu chưa có đơn hàng nào
  useEffect(() => {
    if (orders.length === 0) {
      mockOrders.forEach((order) => {
        useOrderStore.getState().addOrder(order);
      });
    }
  }, [orders.length]);

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast({
      title: "Cập nhật thành công",
      description: `Trạng thái đơn hàng đã được cập nhật thành ${statusLabels[newStatus]}`,
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Quản Lý Đơn Hàng</h1>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {statusLabels[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table View */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Số sản phẩm</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Chỉnh sửa trạng thái</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Không có đơn hàng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-gray-500">{order.customerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(order.total)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) =>
                            handleStatusChange(order.id, value as OrderStatus)
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                {statusLabels[status]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Xem chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Không có đơn hàng nào</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-500">Mã đơn hàng</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                
                <div>
                  <p className="font-medium text-sm text-gray-500">Khách hàng</p>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.customerEmail}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-sm text-gray-500">Số sản phẩm</p>
                    <p className="font-semibold">{order.items.length}</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-500">Tổng tiền</p>
                    <p className="font-semibold">{formatCurrency(order.total)}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-sm text-gray-500 mb-2">Chỉnh sửa trạng thái</p>
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      handleStatusChange(order.id, value as OrderStatus)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {statusLabels[status]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="font-medium text-sm text-gray-500">Ngày đặt</p>
                  <p className="text-sm">{formatDate(order.createdAt)}</p>
                </div>

                <Button variant="outline" className="w-full" size="sm">
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

