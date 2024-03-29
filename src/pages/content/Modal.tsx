/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";

export default function Modal(): JSX.Element {
  const inputRef = React.createRef<HTMLInputElement>();
  return (
    <div id="support" className="container">
      <div className="support-header" id="support-header">
        <h1 style={{ fontSize: "medium", fontFamily: "serif" }}>Show Your support!</h1>
        <div className="show-support">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40px" height="20px" viewBox="0 0 10 6">
            <path d="M0,0h10v6H0z" />
            <path d="M0,3h10v3H0z" fill="#c00" />
            <circle cx="5" cy="3" r="1.5" fill="#ff0" />
          </svg>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <input className="input" ref={inputRef} value={"🖤💛❤️"}></input>
        <button
          className="copy-button"
          onClick={() => {
            navigator.clipboard.writeText(inputRef.current!.value);
            const modal = document.querySelector("#support") as HTMLDivElement;
            modal.classList.remove("block");
            modal.classList.add("hidden");
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
