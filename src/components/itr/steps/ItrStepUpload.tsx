"use client";

import { useRef, useState } from "react";
import { getItrDocumentCategories, getItrMandatoryDocumentLabels } from "@/data/itr-documents";
import type { ItrType } from "@/components/itr/ItrWizard";

interface UploadedDoc {
  id: string;
  fileName: string;
}

function DocumentSlot({
  category,
  isMandatory,
  applicationId,
  uploaded,
  onUploaded,
  onRemoved,
}: {
  category: string;
  isMandatory: boolean;
  applicationId: string;
  uploaded: UploadedDoc | undefined;
  onUploaded: (doc: UploadedDoc) => void;
  onRemoved: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function upload(file: File) {
    setStatus("uploading");
    setError(null);

    const formData = new FormData();
    formData.append("applicationId", applicationId);
    formData.append("category", category);
    formData.append("file", file);

    try {
      const res = await fetch("/api/itr/upload-document", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onUploaded({ id: data.id, fileName: data.fileName });
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  }

  async function handleRemove() {
    if (!uploaded) return;
    await fetch("/api/itr/upload-document", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId: uploaded.id }),
    }).catch(() => null);
    onRemoved();
  }

  if (uploaded) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-itr-green-500 bg-itr-green-50 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-itr-green-500 text-xs text-white">
            ✓
          </span>
          <div className="min-w-0">
            <div className="text-sm font-medium text-neutral-900">{category}</div>
            <div className="truncate text-xs text-neutral-500">{uploaded.fileName}</div>
          </div>
        </div>
        <div className="flex shrink-0 gap-3 text-xs font-semibold">
          <button type="button" onClick={() => inputRef.current?.click()} className="text-itr-navy-500 hover:underline">
            Replace
          </button>
          <button type="button" onClick={handleRemove} className="text-red-600 hover:underline">
            Remove
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
        />
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files?.[0]) upload(e.dataTransfer.files[0]);
      }}
      className={`rounded-xl border-2 border-dashed px-4 py-3 transition-colors ${
        dragOver ? "border-itr-green-500 bg-itr-green-50" : "border-neutral-200"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium text-neutral-900">
            {category}
            {isMandatory && <span className="ml-1 text-red-500">*</span>}
          </div>
          <div className="text-xs text-neutral-400">PDF, JPG, or PNG · up to 20MB</div>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={status === "uploading"}
          className="shrink-0 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:border-itr-green-500 hover:text-itr-green-600 disabled:opacity-50"
        >
          {status === "uploading" ? "Uploading…" : "Browse"}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
      />
    </div>
  );
}

export function ItrStepUpload({
  applicationId,
  itrType,
  onDone,
}: {
  applicationId: string;
  itrType: ItrType;
  onDone: () => void;
}) {
  const [uploaded, setUploaded] = useState<Record<string, UploadedDoc>>({});

  const itrDocumentCategories = getItrDocumentCategories(itrType);
  const mandatoryDone = getItrMandatoryDocumentLabels(itrType).every((label) => uploaded[label]);

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-itr-navy-500">Upload Required Documents</h1>
      <p className="mt-1 text-sm text-neutral-500">Drag &amp; drop, or browse. Mandatory documents are marked *.</p>

      <div className="mt-5 space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Mandatory</h2>
        {itrDocumentCategories
          .filter((c) => c.isMandatory)
          .map((c) => (
            <DocumentSlot
              key={c.label}
              category={c.label}
              isMandatory
              applicationId={applicationId}
              uploaded={uploaded[c.label]}
              onUploaded={(doc) => setUploaded((current) => ({ ...current, [c.label]: doc }))}
              onRemoved={() =>
                setUploaded((current) => {
                  const next = { ...current };
                  delete next[c.label];
                  return next;
                })
              }
            />
          ))}
      </div>

      <div className="mt-5 space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Optional</h2>
        {itrDocumentCategories
          .filter((c) => !c.isMandatory)
          .map((c) => (
            <DocumentSlot
              key={c.label}
              category={c.label}
              isMandatory={false}
              applicationId={applicationId}
              uploaded={uploaded[c.label]}
              onUploaded={(doc) => setUploaded((current) => ({ ...current, [c.label]: doc }))}
              onRemoved={() =>
                setUploaded((current) => {
                  const next = { ...current };
                  delete next[c.label];
                  return next;
                })
              }
            />
          ))}
      </div>

      <button
        type="button"
        onClick={onDone}
        disabled={!mandatoryDone}
        className="mt-6 w-full rounded-xl bg-itr-green-500 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-itr-green-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {mandatoryDone ? "Submit Documents" : "Upload all mandatory documents to continue"}
      </button>
    </div>
  );
}
