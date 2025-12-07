"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore, useOrderStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrderStore((state) => state.addOrder);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = getTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast({
        title: "Giỏ hàng trống",
        description: "Vui lòng thêm sản phẩm vào giỏ hàng",
        variant: "destructive",
      });
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,
      customerId: `CUST-${Date.now()}`,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      items: items,
      total: total,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addOrder(order);
    clearCart();
    
    toast({
      title: "Đặt hàng thành công",
      description: `Đơn hàng ${order.id} đã được tạo thành công`,
    });

    router.push(`/shop/orders/${order.id}`);
  };

  if (items.length === 0) {
    router.push("/shop/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Thanh Toán</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Khách Hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Họ và tên *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Địa chỉ *</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Đặt Hàng
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Đơn Hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>{formatCurrency(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">{formatCurrency(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

