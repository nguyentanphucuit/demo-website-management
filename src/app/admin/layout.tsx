"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Package,
  ShoppingBag,
  Boxes,
  Users,
  BarChart3,
  Home,
  LogOut,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/admin", label: "Tổng Quan", icon: LayoutDashboard },
    { href: "/admin/products", label: "Sản Phẩm", icon: Package },
    { href: "/admin/orders", label: "Đơn Hàng", icon: ShoppingBag },
    { href: "/admin/inventory", label: "Tồn Kho", icon: Boxes },
    { href: "/admin/customers", label: "Khách Hàng", icon: Users },
    { href: "/admin/reports", label: "Báo Cáo", icon: BarChart3 },
  ];

  const handleLogout = () => {
    // Xóa dữ liệu localStorage nếu có
    localStorage.clear();
    // Chuyển về trang chủ
    router.push("/");
  };

  const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      <div className="p-6 border-b flex-shrink-0">
        <Link href="/admin" onClick={onItemClick} className="text-2xl font-bold text-primary">
          Quản Trị
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname?.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} onClick={onItemClick}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Nút Về Trang Chủ và Đăng Xuất ở dưới cùng - luôn hiển thị */}
      <div className="p-4 border-t bg-white flex-shrink-0 mt-auto space-y-2">
        <Link href="/" onClick={onItemClick} className="block">
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <Home className="h-4 w-4 mr-2" />
            Về Trang Chủ
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => {
            handleLogout();
            onItemClick?.();
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Đăng Xuất
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r h-screen sticky top-0 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Sheet */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b p-4 flex items-center gap-4">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="h-full flex flex-col">
              <SidebarContent onItemClick={() => setMobileMenuOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/admin" className="text-xl font-bold text-primary">
          Quản Trị
        </Link>
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 flex flex-col md:ml-0">
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto mt-16 md:mt-0">{children}</main>
      </div>
    </div>
  );
}

