import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const application = await prisma.itrApplication.findUnique({
    where: { id },
    include: { documents: true },
  });

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: application.id,
    itrType: application.itrType,
    name: application.name,
    status: application.status,
    amount: application.amount,
    documents: application.documents.map((d) => ({
      id: d.id,
      category: d.category,
      isMandatory: d.isMandatory,
      fileName: d.fileName,
    })),
  });
}
