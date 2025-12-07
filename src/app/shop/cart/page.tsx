"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <Card>
            <CardContent className="py-16 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
              <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
              <Button onClick={() => router.push("/shop")}>
                Tiếp tục mua sắm
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Giỏ Hàng</h1>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-24 h-48 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base sm:text-lg mb-2">{item.product.name}</h3>
                      <p className="text-primary font-bold mb-4">
                        {formatCurrency(item.product.price)}
                      </p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 1;
                              updateQuantity(item.product.id, val);
                            }}
                            className="w-20 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Tổng: {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Tổng Kết</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="font-semibold">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-4">
                  <span>Tổng cộng:</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => router.push("/shop/checkout")}
                >
                  Thanh Toán
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Xóa giỏ hàng
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

