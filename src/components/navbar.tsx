"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Settings, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const itemCount = useCartStore((state) => state.getItemCount());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isShopPage = pathname?.startsWith("/shop");

  const shopNavItems = isShopPage ? (
    <>
      <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>
        <Button variant="ghost" className="w-full justify-start">Sản Phẩm</Button>
      </Link>
      <Link href="/shop/cart" onClick={() => setMobileMenuOpen(false)}>
        <Button variant="outline" className="w-full justify-start relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Giỏ Hàng
          {itemCount > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
              {itemCount}
            </span>
          )}
        </Button>
      </Link>
      <Link href="/shop/orders" onClick={() => setMobileMenuOpen(false)}>
        <Button variant="ghost" className="w-full justify-start">Đơn Hàng Của Tôi</Button>
      </Link>
      <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
        <Button variant="outline" className="w-full justify-start">
          <Settings className="h-4 w-4 mr-2" />
          Go to Admin
        </Button>
      </Link>
    </>
  ) : null;

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {isShopPage && shopNavItems}
                    {pathname?.startsWith("/admin") && (
                      <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">Về Trang Chủ</Button>
                      </Link>
                    )}
                    {!isShopPage && !pathname?.startsWith("/admin") && (
                      <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Go to Admin
                        </Button>
                      </Link>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <Link href={isShopPage ? "/shop" : "/"} className="text-xl sm:text-2xl font-bold text-primary">
              {isShopPage ? "Cửa Hàng" : "Quản Lý Bán Hàng"}
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {isShopPage && (
              <>
                <Link href="/shop">
                  <Button variant="ghost" size="sm" className="hidden lg:inline-flex">Sản Phẩm</Button>
                </Link>
                <Link href="/shop/cart">
                  <Button variant="outline" size="sm" className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Giỏ Hàng</span>
                    {itemCount > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link href="/shop/orders">
                  <Button variant="ghost" size="sm" className="hidden lg:inline-flex">Đơn Hàng Của Tôi</Button>
                </Link>
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Go to Admin</span>
                  </Button>
                </Link>
              </>
            )}
            {pathname?.startsWith("/admin") && (
              <Link href="/">
                <Button variant="ghost" size="sm">Về Trang Chủ</Button>
              </Link>
            )}
            {!isShopPage && !pathname?.startsWith("/admin") && (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Go to Admin</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

