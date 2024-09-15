// Style Editor Module
const StyleEditor = (() => {
  const CONSTANTS = {
    TAB_KEY_CODE: 9,
    M_KEY_CODE: 77,
    SOFT_TAB: "    ",
    ONLY_WHITESPACE_REGEX: /^\s*$/,
    WHITESPACE_SPLIT_REGEX: /\s+$/g,
  };

  const throttle = (fn, timeout) => {
    let timer;
    return function (...args) {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, args);
          timer = null;
        }, timeout);
      }
    };
  };

  const createElements = () => {
    const style = document.createElement("style");
    const textarea = document.createElement("textarea");
    textarea.style.display = "none";
    textarea.id = "my-style-input";
    textarea.spellcheck = false;
    textarea.placeholder = "/* Enter your styles here. */";
    return { style, textarea };
  };

  const setupEventListeners = (textarea, style, body) => {
    const saveStyles = throttle(() => {
      localStorage.myStyle = style.innerHTML;
    }, 500);

    const updateAndSaveStyles = () => {
      style.innerHTML = textarea.value;
      saveStyles();
    };

    textarea.addEventListener("keyup", updateAndSaveStyles);
    textarea.addEventListener("change", updateAndSaveStyles);
    textarea.addEventListener("keydown", handleTabKey);
    body.addEventListener("click", handleAltClick(textarea));
    window.addEventListener("keydown", handleToggleTextarea(textarea));
  };

  const handleTabKey = (event) => {
    if (event.keyCode === CONSTANTS.TAB_KEY_CODE) {
      event.preventDefault();
      const { value, selectionStart } = event.target;
      const newValue =
        value.substring(0, selectionStart) +
        CONSTANTS.SOFT_TAB +
        value.substring(selectionStart);
      event.target.value = newValue;
      event.target.setSelectionRange(
        selectionStart + CONSTANTS.SOFT_TAB.length,
        selectionStart + CONSTANTS.SOFT_TAB.length
      );
    }
  };

  const handleAltClick = (textarea) => (event) => {
    if (
      textarea.style.display !== "none" &&
      event.target.id !== textarea.id &&
      event.altKey
    ) {
      event.preventDefault();
      const selector = generateSelector(event.target);
      const styles = getExistingStyles(event.target);
      const textToAdd = `\n${selector} {\n${styles}\n}`;
      textarea.value += textToAdd;
      textarea.focus();
      textarea.setSelectionRange(
        textarea.value.length - textToAdd.length,
        textarea.value.length
      );
    }
  };

  const generateSelector = (target) => {
    let selector = target.tagName.toLowerCase();
    if (target.id) selector += `#${target.id}`;
    target.classList.forEach((className) => {
      if (!CONSTANTS.ONLY_WHITESPACE_REGEX.test(className)) {
        selector += `.${className}`;
      }
    });
    return selector;
  };

  const getExistingStyles = (target) => {
    if (!target.getAttribute("style")) return "";
    return target
      .getAttribute("style")
      .split(";")
      .map((style) => style.trim())
      .filter((style) => !CONSTANTS.ONLY_WHITESPACE_REGEX.test(style))
      .map((style) => `    ${style.toLowerCase()};`)
      .join("\n");
  };

  const handleToggleTextarea = (textarea) => (event) => {
    if (event.ctrlKey && event.keyCode === CONSTANTS.M_KEY_CODE) {
      textarea.style.display =
        textarea.style.display === "none" ? "block" : "none";
    }
  };

  const init = () => {
    const { style, textarea } = createElements();
    const head = document.head;
    const body = document.body;

    head.appendChild(style);
    body.appendChild(textarea);

    style.innerHTML = localStorage.myStyle || "";
    textarea.value = style.innerHTML;

    setupEventListeners(textarea, style, body);
  };

  return { init };
})();

// Initialize the Style Editor when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", StyleEditor.init);
