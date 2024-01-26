/*
TODO:
Handle the text being inserted anywhere where the cursor is
*/

import React from "react";
import { createRoot } from "react-dom/client";

const ref = React.createRef<HTMLDivElement>();
const Popup = () => {
  return (
    <div ref={ref} id="support" style={{ display: "none", fontSize: "20px", color: "red", position: "absolute", top: 0, zIndex: 99999 }}>
      Show support
    </div>
  );
};

const body = document.body;
const root = createRoot(body.appendChild(document.createElement("div")));

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);

const offset = { x: -20, y: -80 };
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "show_support") {
    showModal();
    updatePosition();
  }
});

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
