import React from "react";
import { createPortal } from "react-dom";

export default function Portal({ children, selector }) {
  const portal = document.getElementById(selector);
  return createPortal(children, portal);
}
