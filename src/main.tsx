import { Root, createRoot } from "react-dom/client";

import React from "react";
import {App} from "./App";

class SuiteOS extends HTMLElement {
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

const ELEMENT_ID = "finstash";

if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, SuiteOS);
}
