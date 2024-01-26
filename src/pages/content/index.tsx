import { createRoot } from "react-dom/client";
import "./style.css";
import React from "react";
const div = document.createElement("div");
div.id = "__root";
document.body.appendChild(div);

const ref = React.createRef<HTMLDivElement>();
const inputRef = React.createRef<HTMLInputElement>();
const offset = { x: -20, y: -80 };

const rootContainer = document.querySelector("#__root");
if (!rootContainer) throw new Error("Can't find Options root element");
const root = createRoot(rootContainer);

const Modal = () => {
  return (
    <div ref={ref} id="support" style={{ display: "none", fontSize: "10px", color: "black", background: "white", padding: "10px", position: "absolute", top: 0, zIndex: 99999 }}>
      <h1>Show support</h1>
      <div style={{ display: "flex" }}>
        <input style={{ background: "white" }} ref={inputRef} value={"🖤💛❤️"}></input>
        <button
          onClick={() => {
            navigator.clipboard.writeText(inputRef.current!.value);
            ref.current!.style.display = "none";
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
};
root.render(<Modal />);

function updatePosition() {
  const activeElementBounds = document.activeElement?.getBoundingClientRect();
  if (!activeElementBounds) {
    return;
  }
  ref.current!.style.transform = `translate(${activeElementBounds.x + offset.x}px, ${activeElementBounds.y + offset.y}px)`;
}

function showModal() {
  ref.current!.style.display = "block";
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "show_support") {
    showModal();
    updatePosition();
  }
});

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}

/*
TODO:
Handle the text being inserted anywhere where the cursor is
*/
