"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";
import { mockProducts } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = mockProducts.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast({
        title: "Hết hàng",
        description: "Sản phẩm này hiện đã hết hàng",
        variant: "destructive",
      });
      return;
    }
    if (quantity > product.stock) {
      toast({
        title: "Số lượng không đủ",
        description: `Chỉ còn ${product.stock} sản phẩm trong kho`,
        variant: "destructive",
      });
      return;
    }
    addItem(product, quantity);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} (${quantity} sản phẩm) đã được thêm vào giỏ hàng`,
    });
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          <Card>
            <div className="relative w-full h-64 sm:h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </Card>

          <div className="space-y-4 md:space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
                <Badge variant={product.stock > 0 ? "default" : "destructive"} className="w-fit">
                  {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                </Badge>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                {formatCurrency(product.price)}
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{product.description}</p>
            </div>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Danh mục</p>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">SKU</p>
                  <p className="font-mono">{product.sku}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Tồn kho</p>
                  <p className="text-lg font-semibold">{product.stock} sản phẩm</p>
                </div>
              </CardContent>
            </Card>

            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Số lượng:</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setQuantity(Math.min(Math.max(1, val), product.stock));
                      }}
                      className="w-20 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Thêm vào giỏ hàng
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

