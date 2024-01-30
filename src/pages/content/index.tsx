/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "@assets/styles/tailwind.css";
import Modal from "@pages/content/Modal";
import { createRoot } from "react-dom/client";

const offset = { x: -80, y: -100 };
const cursorPosition = { x: 0, y: 0 };

function showModal() {
  const modal = document.querySelector("#support") as HTMLDivElement;
  modal.classList.remove("hidden");
  modal.classList.add("block");
}

function updatePosition() {
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
  const activeElementBounds = document.activeElement!.getBoundingClientRect();

  let pos1 = activeElementBounds.left + offset.x,
    pos2 = activeElementBounds.top + offset.y,
    pos3 = activeElementBounds.left + offset.x + 80,
    pos4 = activeElementBounds.top + offset.y;

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
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
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
    document.onmousemove = (e) => {
      cursorPosition.x = e.pageX;
      cursorPosition.y = e.pageY;
    };
    dragModal(modal);
  }, 100);
}

init();

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
