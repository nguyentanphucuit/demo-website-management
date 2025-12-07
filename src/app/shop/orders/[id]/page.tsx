"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import { statusLabels } from "@/lib/order-utils";
import { ArrowLeft } from "lucide-react";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const orders = useOrderStore((state) => state.orders);
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Đơn hàng không tồn tại</h1>
          <Button onClick={() => router.push("/shop/orders")}>
            Quay lại danh sách đơn hàng
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/shop/orders")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Đơn hàng {order.id}</CardTitle>
                  <StatusBadge status={order.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                      <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">
                          Số lượng: {item.quantity}
                        </p>
                        <p className="text-primary font-bold mt-1">
                          {formatCurrency(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Khách Hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Họ và tên</p>
                  <p className="font-medium">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{order.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium">{order.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="font-medium">{order.customerAddress}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tổng Kết</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Tổng cộng:</span>
                  <span className="text-primary">{formatCurrency(order.total)}</span>
                </div>
                <div className="pt-4 border-t mt-4">
                  <p className="text-sm text-gray-500">Ngày đặt hàng</p>
                  <p className="font-medium">{formatDate(order.createdAt)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

