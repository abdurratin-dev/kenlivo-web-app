"use client";

import { OrderDataType } from "@/types/AllDataType";
import { Button } from "../ui/button";
import { useEffect } from "react";

export default function OrderListCard({
  orderData,
}: {
  orderData: OrderDataType[];
}) {
  const [...order] = orderData;

  return (
    <section>
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="border-b border-[#f1e8e5] text-xs uppercase tracking-wider text-[#a08a84]">
            <th className="pb-4 font-medium">Order</th>
            <th className="pb-4 font-medium">Date</th>
            <th className="pb-4 font-medium">Amount</th>
            <th className="pb-4 font-medium">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => {
            const hendleCancelButton = async () => {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_KENLIVO_DATA_API}product-orders/${order._id}`,{
                    method: 'DELETE',
                }
              );
              const result = await res.json();
              console.log(result);
            };
            return (
              <tr
                key={order._id}
                className="border-b border-[#f6efed] last:border-0"
              >
                <td className="py-5 font-semibold">{order._id.slice(-8)}</td>
                <td className="py-5 text-[#8e7973]">{order.name}</td>
                <td className="py-5 font-medium">{order.price}</td>
                <td className="py-5"></td>
                <td>
                  <Button variant="destructive" onClick={hendleCancelButton}>
                    Cancel Order
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
