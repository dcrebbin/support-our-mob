import React from "react";

export default function Modal(): JSX.Element {
  const inputRef = React.createRef<HTMLInputElement>();
  return (
    <div id="support" className="hidden bg-black text-white font-sans p-2 absolute top-0 z-[99999] drop-shadow-xl w-[175px] rounded-md">
      <div className="flex items-center justify-center gap-1">
        <h1 className="font-serif">Show Your support!</h1>
        <div className="w-6 h-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40px" height="20px" viewBox="0 0 10 6">
            <path d="M0,0h10v6H0z" />
            <path d="M0,3h10v3H0z" fill="#c00" />
            <circle cx="5" cy="3" r="1.5" fill="#ff0" />
          </svg>
        </div>
      </div>
      <div className="flex justify-around">
        <input className="bg-black border-none w-[65px]" ref={inputRef} value={"🖤💛❤️"}></input>
        <button
          className="bg-white text-black text-md p-1 font-bold rounded-md"
          onClick={() => {
            navigator.clipboard.writeText(inputRef.current!.value);
            const modal = document.querySelector("#support") as HTMLDivElement;
            modal.style.display = "none";
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
