import { useState } from "react";
import { Signature } from "../pages";
import DateDiff from "./datediff";
import manifest from "../lib/manifest"

export default function MySignature({ signature }: { signature: Signature }) {
  const [copy, setCopy] = useState<boolean>(false);
  const [viewTooltip, setViewTooltip] = useState<boolean>(false)

  return (
    <div
      className="my-4 p-4 bg-[#ECECEC] rounded-xl inline-flex flex-col font-SpaceGrotesk mx-2 space-y-6"
      key={signature.address}
    >
      <div className="flex space-x-3 items-center">
        <p className="text-[#BF0424] text-sm truncate grow w-3/5">
          {signature.address}
        </p>
        <p className="font-semibold text-xs text-right">
          <DateDiff date={signature.date} />
        </p>
        <div
          className="hover:bg-slate-100 hover:rounded-xl relative"
          onMouseLeave={() => {
            setViewTooltip(false)
            setCopy(false)
        }}
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify({
                address: signature.address,
                msg: manifest,
                sig: signature.signature,
                version: 2
            }, null, 2));
            setCopy(true)
        }}
          onMouseOver={() => setViewTooltip(true)}
        >
          {viewTooltip && (
            <div className="absolute -top-6 text-white bg-slate-600 px-2 py-1 rounded text-xs">
              {!copy ? "Copy" : "Copied!"}{" "}
            </div>
          )}
          <svg
            width="28"
            height="28"
            className="hover:cursor-pointer"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.333 11.333h-1v7h1v-3h5v-1h-5v-3ZM13.333 11.333v-1h-3v-5h-1v5h-3v1h7ZM6.333 18.333v1h7v-1h-7ZM5.333 18.333h1v-7h-1v7ZM10.333 4.333v1h9v-1h-9ZM20.333 5.333h-1v9h1v-9Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <p className="truncate text-sm">{signature.signature}</p>
    </div>
  );
}
