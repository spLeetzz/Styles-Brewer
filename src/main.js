import preflightElement from "./preflight.js";
import { classHandlers } from "./utils.js";

document.head.appendChild(preflightElement);

const classSet = new Set();
const walker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT);

while (walker.nextNode()) {
  if (walker.currentNode.classList.length) {
    walker.currentNode.classList.forEach((cls) => classSet.add(cls));
  }
}

let cssRules = "";

for (const cls of classSet) {
  const parts = cls.split("-");

  let prefix, value, handler;

  const twoPartPrefix = parts.slice(0, 2).join("-"); // (try to find gap-x before gap)
  if (classHandlers[twoPartPrefix]) {
    prefix = twoPartPrefix;
    value = parts.slice(2).join("-");
    handler = classHandlers[prefix];
  } else {
    prefix = parts[0];
    value = parts.slice(1).join("-");
    handler = classHandlers[prefix];
  }

  if (typeof handler === "function") {
    const rule = handler(prefix, value);
    if (rule) cssRules += rule;
  }
}

const styleElement = document.createElement("style");
styleElement.textContent = cssRules;
document.head.appendChild(styleElement);
