"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Package } from "lucide-react";

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <Card>
            <CardContent className="py-16 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Chưa có đơn hàng</h2>
              <p className="text-gray-500 mb-6">Bạn chưa có đơn hàng nào</p>
              <Link href="/shop">
                <Button>Tiếp tục mua sắm</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Đơn Hàng Của Tôi</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Đơn hàng {order.id}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>{formatCurrency(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="font-semibold">Tổng cộng:</span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(order.total)}
                  </span>
                </div>
                <div className="mt-4">
                  <Link href={`/shop/orders/${order.id}`}>
                    <Button variant="outline" className="w-full">
                      Xem chi tiết
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

