/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from "react-dom/client";
import Modal from "./Modal";
import "./style.css";
const offset = { x: 0, y: 0 };
const cursorPosition = { x: 0, y: 0 };

function showModal() {
  const modal = document.querySelector("#support") as HTMLDivElement;
  modal.classList.remove("hidden");
  modal.classList.add("block");
}

async function updatePosition() {
  const modal = document.querySelector("#support") as HTMLDivElement;
  if (cursorPosition.y < 100) {
    modal.style.transform = `translate(${cursorPosition.x + offset.x}px, ${cursorPosition.y - offset.y}px)`;
  } else {
    modal.style.transform = `translate(${cursorPosition.x + offset.x}px, ${cursorPosition.y + offset.y}px)`;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "show_support") {
    showModal();
    updatePosition();
  }
});

function dragModal(element: HTMLElement) {
  const header = document.querySelector("#support-header") as HTMLDivElement;
  header.onmousedown = dragMouseDown;

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
    element.style.top = `${e.pageY}px`;
    element.style.left = `${e.pageX}px`;
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
  document.onmousemove = (e: MouseEvent) => {
    cursorPosition.x = e.pageX;
    cursorPosition.y = e.pageY;
  };
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
