import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrdersComponent {
  orders = [
    {
      id: "ORD-1001",
      customer: "Ali Khan",
      date: "2025-10-18",
      total: "$245",
      status: "Delivered",
    },
    {
      id: "ORD-1002",
      customer: "Sara Ahmed",
      date: "2025-10-19",
      total: "$320",
      status: "Pending",
    },
    {
      id: "ORD-1003",
      customer: "Bilal Qureshi",
      date: "2025-10-17",
      total: "$120",
      status: "Cancelled",
    },
  ];

  statusColor: { [key: string]: string } = {
    Delivered: "text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-300",
    Pending: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/40 dark:text-yellow-300",
    Cancelled: "text-red-600 bg-red-100 dark:bg-red-900/40 dark:text-red-300",
  };
}