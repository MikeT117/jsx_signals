import { logger } from "./logger";
import { createEffect } from "./signal-runtime";

function handleChildren(element, children) {
    logger("handleChildren", 2, element, children);
    children.forEach((child) => {
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
        } else if (typeof child === "number") {
            element.appendChild(document.createTextNode(child.toString()));
        } else if (typeof child === "function") {
            const textNode = new Text();
            createEffect(() => {
                textNode.data = child();
            });
            element.appendChild(textNode);
        } else if (Array.isArray(child)) {
            handleChildren(element, child);
        } else {
            element.appendChild(child);
        }
    });
}

function handleProps(element, props = {}) {
    logger("handleProps", 2, element, props);
    Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith("on")) {
            element.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
            element[key] = value;
        }
    });
}

export function createElement(tag, props = {}, ...children) {
    logger("createElement", 2, tag, props, children);
    if (typeof tag === "function") {
        return tag({ ...props, children });
    }
    const element = document.createElement(tag);
    if (props) handleProps(element, props);
    if (children) handleChildren(element, children);
    return element;
}

export function createFragment({ children }) {
    logger("createFragment", 2, children);
    return children;
}
