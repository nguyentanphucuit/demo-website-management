"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockProducts } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof mockProducts[0] | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
    sku: "",
  });
  const { toast } = useToast();

  const handleOpenDialog = (product?: typeof mockProducts[0]) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: product.image,
        category: product.category,
        stock: product.stock.toString(),
        sku: product.sku,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
        sku: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
      toast({
        title: "Cập nhật thành công",
        description: "Sản phẩm đã được cập nhật",
      });
    } else {
      const newProduct = {
        id: `PROD-${Date.now()}`,
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts([...products, newProduct]);
      toast({
        title: "Thêm thành công",
        description: "Sản phẩm mới đã được thêm",
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    toast({
      title: "Xóa thành công",
      description: "Sản phẩm đã được xóa",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Quản Lý Sản Phẩm</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm Sản Phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
              </DialogTitle>
              <DialogDescription>
                {editingProduct
                  ? "Cập nhật thông tin sản phẩm"
                  : "Điền thông tin sản phẩm mới"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên sản phẩm *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả *</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Giá *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Tồn kho *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Danh mục *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">URL hình ảnh *</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSave}>Lưu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop Table View */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Tồn kho</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {product.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(product.price)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                        {product.stock}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex gap-4">
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{product.category}</Badge>
                    <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                      {product.stock}
                    </Badge>
                  </div>
                  <p className="font-semibold text-primary mb-2">
                    {formatCurrency(product.price)}
                  </p>
                  <p className="text-xs font-mono text-gray-500">{product.sku}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleOpenDialog(product)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Sửa
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

