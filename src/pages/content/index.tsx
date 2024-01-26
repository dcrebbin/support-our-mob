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

function dragModal(element: HTMLElement) {
  const activeElementBounds = document.activeElement!.getBoundingClientRect();

  let pos1 = activeElementBounds.left + offset.x,
    pos2 = activeElementBounds.top + offset.y,
    pos3 = activeElementBounds.left + offset.x + 80,
    pos4 = activeElementBounds.top + offset.y;

  element.onmousedown = dragMouseDown;

  function dragMouseDown(e: MouseEvent) {
    console.log("dragMouseDown");
    e = e || window.event;
    e.preventDefault();
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    e = e || (window.event as MouseEvent);
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    console.log(pos1, pos2, pos3, pos4);
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function init() {
  const div = document.createElement("div");
  div.id = "__root";
  document.body.appendChild(div);
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Popup root element");
  const root = createRoot(rootContainer);
  root.render(<Modal />);

  //Super sus setTimeout to wait for modal to render
  setTimeout(() => {
    const modal = document.querySelector("#support") as HTMLDivElement;
    dragModal(modal);
  }, 100);
}

init();

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
