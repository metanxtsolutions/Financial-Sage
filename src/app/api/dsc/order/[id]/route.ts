import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { dscPrices } from "@/data/pricing";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const order = await prisma.dscOrder.findUnique({ where: { id } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const dsc = dscPrices.find((d) => d.id === order.dscType);
  return NextResponse.json({
    id: order.id,
    dscType: order.dscType,
    dscLabel: dsc ? `${dsc.type}, ${dsc.validity}` : order.dscType,
    name: order.name,
    status: order.status,
    amount: order.amount,
    payuTxnId: order.payuTxnId,
  });
}
