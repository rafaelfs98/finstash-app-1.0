import React from "react";
import { Root, createRoot } from "react-dom/client";

import { App } from "./App";
import "./styles/index.scss";

class finstash extends HTMLElement {
  private root: Root | undefined;

  connectedCallback() {
    if (!this.root) {
      this.root = createRoot(this);

      this.root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  }
}

const ELEMENT_ID = "fin-stash";

if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, finstash);
}
