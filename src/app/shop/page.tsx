"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCartStore } from "@/lib/store";
import { mockProducts } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Search, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const categories = ["all", ...Array.from(new Set(mockProducts.map((p) => p.category)))];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    if (product.stock === 0) {
      toast({
        title: "Hết hàng",
        description: "Sản phẩm này hiện đã hết hàng",
        variant: "destructive",
      });
      return;
    }
    addItem(product, 1);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} đã được thêm vào giỏ hàng`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Sản Phẩm</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "Tất cả" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <Link href={`/shop/products/${product.id}`}>
                  <div className="relative w-full h-48 bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                </Link>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                      {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(product.price)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Tồn kho: {product.stock}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Thêm vào giỏ
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

