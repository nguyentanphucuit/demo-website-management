import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";
import { mockProducts, mockOrders, mockCustomers } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboard() {
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = mockProducts.length;
  const totalOrders = mockOrders.length;
  const totalCustomers = mockCustomers.length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tổng Quan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Doanh Thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Sản Phẩm</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Đơn Hàng</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Khách Hàng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Đơn Hàng Gần Đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customerName}</p>
                  </div>
                  <p className="font-bold">{formatCurrency(order.total)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sản Phẩm Bán Chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">Tồn kho: {product.stock}</p>
                  </div>
                  <p className="font-bold">{formatCurrency(product.price)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

