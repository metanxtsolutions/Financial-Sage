import { DSC_INCLUSIONS, DSC_TIMELINE, dscPrices } from "@/data/pricing";

/** The DSC price list, shown on /pricing and on the DSC service page. */
export function DscPriceTable() {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-neutral-50 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
            <tr>
              <th scope="col" className="px-5 py-3">DSC type</th>
              <th scope="col" className="px-5 py-3">Validity</th>
              <th scope="col" className="px-5 py-3">USB token</th>
              <th scope="col" className="px-5 py-3 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {dscPrices.map((dsc) => (
              <tr key={dsc.id}>
                <td className="px-5 py-3 font-medium text-neutral-900">{dsc.type}</td>
                <td className="px-5 py-3 text-neutral-700">{dsc.validity}</td>
                <td className="px-5 py-3 text-neutral-700">Included</td>
                <td className="px-5 py-3 text-right font-semibold text-neutral-900">
                  ₹{dsc.price.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-bold text-neutral-900">Every price includes</h3>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            {DSC_INCLUSIONS.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-neutral-700">
          <h3 className="font-bold text-neutral-900">Timelines</h3>
          <p className="mt-2">Processing: {DSC_TIMELINE.processing}</p>
          <p>Token delivery: {DSC_TIMELINE.delivery}</p>
          <p className="mt-2 text-neutral-500">Prices exclude 18% GST. There is no separate government fee.</p>
        </div>
      </div>
    </div>
  );
}
