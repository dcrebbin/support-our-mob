/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "@assets/styles/tailwind.css";
import Modal from "@pages/content/Modal";
import { createRoot } from "react-dom/client";

const offset = { x: -80, y: -100 };

function showModal() {
  const modal = document.querySelector("#support") as HTMLDivElement;
  modal.style.display = "block";
}

function updatePosition() {
  const modal = document.querySelector("#support") as HTMLDivElement;
  const activeElementBounds = document.activeElement?.getBoundingClientRect();
  if (!activeElementBounds) {
    return;
  }
  modal.style.transform = `translate(${activeElementBounds.x + offset.x}px, ${activeElementBounds.y + offset.y}px)`;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "show_support") {
    showModal();
    updatePosition();
  }
});

function init() {
  const div = document.createElement("div");
  div.id = "__root";
  document.body.appendChild(div);
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Popup root element");
  const root = createRoot(rootContainer);
  root.render(<Modal />);
}

init();

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
