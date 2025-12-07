"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockProducts } from "@/lib/data";
import { AlertTriangle } from "lucide-react";

export default function InventoryPage() {
  const lowStockThreshold = 10;
  const inventory = mockProducts.map((product) => ({
    productId: product.id,
    productName: product.name,
    currentStock: product.stock,
    reservedStock: 0,
    availableStock: product.stock,
    lowStockThreshold,
    lastUpdated: product.updatedAt,
  }));

  const lowStockItems = inventory.filter(
    (item) => item.currentStock <= lowStockThreshold
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Quản Lý Tồn Kho</h1>

      {lowStockItems.length > 0 && (
        <Card className="mb-6 border-yellow-500 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Cảnh Báo Tồn Kho Thấp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700">
              Có {lowStockItems.length} sản phẩm sắp hết hàng
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Tồn Kho Sản Phẩm</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã sản phẩm</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Tồn kho hiện tại</TableHead>
                <TableHead>Đã đặt trước</TableHead>
                <TableHead>Tồn kho khả dụng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Cập nhật lần cuối</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell className="font-mono">{item.productId}</TableCell>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell>{item.currentStock}</TableCell>
                  <TableCell>{item.reservedStock}</TableCell>
                  <TableCell>{item.availableStock}</TableCell>
                  <TableCell>
                    {item.currentStock === 0 ? (
                      <Badge variant="destructive">Hết hàng</Badge>
                    ) : item.currentStock <= item.lowStockThreshold ? (
                      <Badge variant="secondary">Sắp hết</Badge>
                    ) : (
                      <Badge variant="default">Đủ hàng</Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(item.lastUpdated).toLocaleDateString("vi-VN")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

