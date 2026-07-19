"use client";

import { useMemo, useState } from "react";

const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const stateCodes: Record<string, string> = {
  "01": "Jammu & Kashmir", "02": "Himachal Pradesh", "03": "Punjab", "04": "Chandigarh",
  "05": "Uttarakhand", "06": "Haryana", "07": "Delhi", "08": "Rajasthan", "09": "Uttar Pradesh",
  "10": "Bihar", "11": "Sikkim", "12": "Arunachal Pradesh", "13": "Nagaland", "14": "Manipur",
  "15": "Mizoram", "16": "Tripura", "17": "Meghalaya", "18": "Assam", "19": "West Bengal",
  "20": "Jharkhand", "21": "Odisha", "22": "Chhattisgarh", "23": "Madhya Pradesh", "24": "Gujarat",
  "27": "Maharashtra", "29": "Karnataka", "30": "Goa", "32": "Kerala", "33": "Tamil Nadu",
  "36": "Telangana", "37": "Andhra Pradesh",
};

export function GstinValidator() {
  const [value, setValue] = useState("");

  const result = useMemo(() => {
    const gstin = value.trim().toUpperCase();
    if (!gstin) return null;
    const isValidFormat = GSTIN_REGEX.test(gstin);
    const stateCode = gstin.slice(0, 2);
    const state = stateCodes[stateCode];
    return { gstin, isValidFormat, state };
  }, [value]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-neutral-700">
        Enter GSTIN
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. 19ABCDE1234F1Z5"
          maxLength={15}
          className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm uppercase focus:border-brand-500 focus:outline-none"
        />
      </label>

      {result && (
        <div className={`rounded-lg p-4 text-sm ${result.isValidFormat ? "bg-accent-500/10" : "bg-red-50"}`}>
          {result.isValidFormat ? (
            <>
              <p className="font-semibold text-accent-600">Valid GSTIN format</p>
              {result.state && <p className="mt-1 text-neutral-600">State: {result.state}</p>}
            </>
          ) : (
            <p className="font-semibold text-red-600">This doesn&apos;t match the standard 15-character GSTIN format.</p>
          )}
        </div>
      )}

      <p className="text-xs text-neutral-500">
        This checks structural format only (state code, PAN, entity code, checksum position). It
        doesn&apos;t confirm the GSTIN is active or real. Cross-check on the official GST portal for
        that.
      </p>
    </div>
  );
}
