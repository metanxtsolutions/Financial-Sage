import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ITR_ALLOWED_MIME_TYPES, ITR_MAX_FILE_BYTES } from "@/lib/validation";
import { getItrDocumentCategories } from "@/data/itr-documents";
import type { ItrType } from "@/components/itr/ItrWizard";

// Records document metadata only. The file bytes are validated (size, type)
// but not persisted anywhere durable - that needs a cloud storage provider
// (Vercel Blob, S3, Cloudinary) to be chosen. See prisma/schema.prisma.
export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const applicationId = formData.get("applicationId");
  const category = formData.get("category");
  const file = formData.get("file");

  if (typeof applicationId !== "string" || !applicationId) {
    return NextResponse.json({ error: "Missing applicationId" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (file.size > ITR_MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File exceeds the 20MB limit" }, { status: 400 });
  }
  if (!ITR_ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only PDF, JPG, and PNG files are accepted" }, { status: 400 });
  }

  const application = await prisma.itrApplication.findUnique({ where: { id: applicationId } });
  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  // The valid/mandatory category set depends on this application's ITR type
  // (see src/data/itr-documents.ts), so it can only be resolved after the
  // application lookup above - not from a single global list.
  const documentCategories = getItrDocumentCategories(application.itrType as ItrType);
  if (typeof category !== "string" || !documentCategories.some((c) => c.label === category)) {
    return NextResponse.json({ error: "Invalid document category" }, { status: 400 });
  }

  const isMandatory = documentCategories.find((c) => c.label === category)?.isMandatory ?? false;

  const document = await prisma.itrDocument.create({
    data: {
      applicationId,
      category,
      isMandatory,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    },
  });

  return NextResponse.json({
    id: document.id,
    category: document.category,
    fileName: document.fileName,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null);
  const documentId = body?.documentId;
  if (typeof documentId !== "string" || !documentId) {
    return NextResponse.json({ error: "Missing documentId" }, { status: 400 });
  }

  await prisma.itrDocument.delete({ where: { id: documentId } }).catch(() => null);
  return NextResponse.json({ success: true });
}
