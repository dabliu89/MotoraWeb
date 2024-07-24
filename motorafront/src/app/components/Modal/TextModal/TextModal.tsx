/* eslint-disable jsx-a11y/alt-text */

import { ReactNode } from "react";

/* eslint-disable @next/next/no-img-element */
interface props {
  close: () => void;
  title?: string;
  body: ReactNode;
  fullScreen?: boolean;
}

export default function TextModal({ close, body, title, fullScreen }: props) {
  return (
    <div className="bg-gray-500 bg-opacity-30 fixed z-40 md:inset-0 w-screnn h-screen">
      <div className="relative w-full m-auto h-full flex justify-center items-center max-h-screen">
        <div
          className={` relative bg-white rounded-lg shadow min-h-5/6 max-h-full w-10/12 ${fullScreen && "w-full rounded-none h-full max-h-screen"
            } `}
        >
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent active:opacity-75 duration-100 hover:text-gray-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="popup-modal"
            onClick={() => {
              close();
            }}
          >
            <svg
              aria-hidden="true"
              className="w-5   h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div
            className={`p-6 text-center overflow-y-auto ${fullScreen && "h-screen"
              }`}
          >
            {title && (
              <div className="mb-5 text-lg font-bold text-8ray-500">
                {title}
              </div>
            )}
            <div className=" text-sm font-normal text-gray-500">{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
