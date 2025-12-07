"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockCustomers } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function CustomersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Quản Lý Khách Hàng</h1>

      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Khách Hàng</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Tổng đơn hàng</TableHead>
                <TableHead>Tổng chi tiêu</TableHead>
                <TableHead>Ngày tham gia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell className="max-w-xs truncate">{customer.address}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{customer.totalOrders}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(customer.totalSpent)}
                  </TableCell>
                  <TableCell>{formatDate(customer.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

