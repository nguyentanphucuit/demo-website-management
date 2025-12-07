import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Package, Users, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Hệ Thống Quản Lý Bán Hàng
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Quản lý sản phẩm, đơn hàng, tồn kho và khách hàng một cách hiệu quả
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <ShoppingBag className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Khách Hàng</CardTitle>
              <CardDescription>
                Xem sản phẩm, thêm vào giỏ hàng và đặt hàng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/shop">
                <Button className="w-full">Vào Cửa Hàng</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Quản Trị</CardTitle>
              <CardDescription>
                Quản lý sản phẩm, đơn hàng, tồn kho và báo cáo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button className="w-full" variant="secondary">
                  Vào Trang Quản Trị
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <Package className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Quản Lý Sản Phẩm</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <ShoppingBag className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Quản Lý Đơn Hàng</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Package className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Quản Lý Tồn Kho</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Quản Lý Khách Hàng</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

