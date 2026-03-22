import * as Constants from "./constants.js";

function rule(prefix, value, prop, cssVal) {
  return `.${prefix}-${value} { ${prop}: ${cssVal}; }\n`;
}

function parseNonNegative(str) {
  if (str === "" || str == null) return null;
  const n = Number(str);
  return !isNaN(n) && n >= 0 ? n : null;
}

function computeLength(value, allowAuto = false) {
  if (allowAuto && value === "auto") return "auto";
  if (value in Constants.SIZE_KEYWORDS) return Constants.SIZE_KEYWORDS[value];
  const n = parseNonNegative(value);
  if (n !== null) return `calc(var(--spacing) * ${n})`;
  if (typeof CSS !== "undefined" && CSS.supports("width", value)) return value;
  return "";
}

function directionalClass(prefix, value, allowAuto = false) {
  const directions = Constants.DIRECTIONAL_MAP[prefix];
  if (!directions) return "";
  const cssValue = computeLength(value, allowAuto);
  if (!cssValue) return "";
  const declarations = directions.map((d) => `${d}: ${cssValue};`).join(" ");
  return `.${prefix}-${value} { ${declarations} }\n`;
}

function marginClass(prefix, value) {
  return directionalClass(prefix, value, true);
}
function paddingClass(prefix, value) {
  return directionalClass(prefix, value);
}
function offsetClass(prefix, value) {
  return directionalClass(prefix, value, true);
}
function sizeClass(prefix, value) {
  return directionalClass(prefix, value);
}

function colorClass(prefix, value) {
  const cssProp = Constants.COLOR_PROP_MAP[prefix];
  if (!cssProp) return "";

  let cssValue;

  if (value === "current") {
    cssValue = "currentColor";
  } else if (value === "transparent" || value === "inherit") {
    cssValue = value;
  } else if (value === "black" || value === "white") {
    cssValue = `var(--color-${value})`;
  } else {
    const dash = value.indexOf("-");
    const colorName = dash === -1 ? value : value.slice(0, dash);
    const shade = dash === -1 ? 500 : Number(value.slice(dash + 1));

    if (
      Constants.PREFLIGHT_COLORS.has(colorName) &&
      Constants.TAILWIND_SHADES.has(shade)
    ) {
      cssValue = `var(--color-${colorName}-${shade})`;
    } else {
      return "";
    }
  }

  return `.${prefix}-${value} { ${cssProp}: ${cssValue}; }\n`;
}

function displayClass(prefix) {
  if (prefix === "hidden") return `.hidden { display: none; }\n`;
  return `.${prefix} { display: ${prefix}; }\n`;
}

function positionClass(prefix) {
  return `.${prefix} { position: ${prefix}; }\n`;
}

function borderRadiusClass(prefix, value) {
  if (value === "none") return `.${prefix}-none { border-radius: 0; }\n`;
  if (value === "full") return `.${prefix}-full { border-radius: 9999px; }\n`;
  if (!Constants.TAILWIND_SIZES.has(value)) return "";
  return `.${prefix}-${value} { border-radius: var(--radius-${value}); }\n`;
}

function borderWidthClass(prefix, value) {
  const n = parseNonNegative(value);
  if (n !== null) return `.${prefix}-${value} { border-width: ${n}px; }\n`;

  const dash = value.indexOf("-");
  if (dash !== -1) {
    const dir = Constants.BORDER_DIRECTIONS[value.slice(0, dash)];
    const w = parseNonNegative(value.slice(dash + 1));
    if (dir && w !== null) {
      return `.${prefix}-${value} { ${dir}-width: ${w}px; }\n`;
    }
  }

  return "";
}

function borderHandler(prefix, value) {
  if (Constants.BORDER_STYLES.has(value)) {
    return `.${prefix}-${value} { border-style: ${value}; }\n`;
  }
  return colorClass(prefix, value) || borderWidthClass(prefix, value) || "";
}

function fontHandler(prefix, value) {
  if (["mono", "sans", "serif"].includes(value)) {
    return `.${prefix}-${value} { font-family: var(--font-${value}); }\n`;
  }
  if (value in Constants.FONT_WEIGHT_MAP) {
    return `.${prefix}-${value} { font-weight: ${Constants.FONT_WEIGHT_MAP[value]}; }\n`;
  }
  return "";
}

function textHandler(prefix, value) {
  if (Constants.TAILWIND_SIZES.has(value)) {
    return `.${prefix}-${value} { font-size: var(--text-${value}); }\n`;
  }
  if (["left", "right", "center", "justify", "start", "end"].includes(value)) {
    return `.${prefix}-${value} { text-align: ${value}; }\n`;
  }
  if (["wrap", "nowrap", "balance", "pretty"].includes(value)) {
    return `.${prefix}-${value} { text-wrap: ${value}; }\n`;
  }
  return colorClass(prefix, value) || "";
}

function handleGrowShrink(prefix, value, keyword, prop) {
  if (!value.startsWith(keyword)) return null;

  const rest = value.slice(keyword.length);

  if (rest === "") return rule(prefix, value, prop, 1);

  if (rest.startsWith("-")) {
    const n = parseNonNegative(rest.slice(1));
    if (n !== null) return rule(prefix, value, prop, n);
    return "";
  }

  return null;
}

function flexHandler(prefix, value) {
  if (!value) return `.${prefix} { display: ${prefix}; }\n`;

  const numericFlex = parseNonNegative(value);
  if (numericFlex !== null) return rule(prefix, value, "flex", numericFlex);

  if (value in Constants.FLEX_KEYWORDS)
    return rule(prefix, value, "flex", Constants.FLEX_KEYWORDS[value]);

  if (Constants.FLEX_WRAP_VALUES.has(value))
    return rule(prefix, value, "flex-wrap", value);

  return "";
}

function gridHandler(prefix, value) {
  if (!value) return `.${prefix} { display: ${prefix}; }\n`;

  if (value.startsWith("cols-") || value.startsWith("rows-")) {
    return handleColsRows(prefix, value);
  }

  const lineResult = handleGridLineProps(prefix, value);
  if (lineResult !== null) return lineResult;

  if (value.startsWith("auto-cols-") || value.startsWith("auto-rows-")) {
    return handleAutoTrack(prefix, value);
  }

  if (value.startsWith("flow-")) {
    return handleGridFlow(prefix, value);
  }

  return "";
}

function gridRepeat(n) {
  return `repeat(${n}, minmax(0, 1fr))`;
}

function handleColsRows(prefix, value) {
  const isCols = value.startsWith("cols-");
  const num = value.slice(5);
  const prop = isCols ? "grid-template-columns" : "grid-template-rows";

  if (num === "none") return rule(prefix, value, prop, "none");

  const n = Number(num);
  if (Number.isInteger(n) && n >= 1 && n <= 12) {
    return rule(prefix, value, prop, gridRepeat(n));
  }

  return "";
}

function handleGridLineProps(prefix, value) {
  for (const [key, prop] of Object.entries(Constants.GRID_LINE_PROPS)) {
    if (!value.startsWith(key + "-")) continue;

    const val = value.slice(key.length + 1);

    if (val === "full") return rule(prefix, value, prop, "1 / -1");

    const n = parseNonNegative(val);
    if (n !== null && n >= 1) {
      const cssVal = key.includes("span") ? `span ${n} / span ${n}` : String(n);
      return rule(prefix, value, prop, cssVal);
    }

    return "";
  }

  return null;
}

function handleAutoTrack(prefix, value) {
  const isCols = value.startsWith("auto-cols-");
  const val = value.slice(10);
  const prop = isCols ? "grid-auto-columns" : "grid-auto-rows";

  if (!Constants.VALID_AUTO_TRACK_SIZES.has(val)) return "";

  const cssVal = Constants.AUTO_TRACK_SIZE_MAP[val] ?? val;
  return rule(prefix, value, prop, cssVal);
}

function handleGridFlow(prefix, value) {
  const flowKey = value.slice(5);
  const cssVal = Constants.GRID_FLOW_MAP[flowKey];
  return cssVal ? rule(prefix, value, "grid-auto-flow", cssVal) : "";
}

function alignmentHandler(cssProp, map) {
  return function (prefix, value) {
    const cssVal = map[value];
    return cssVal ? rule(prefix, value, cssProp, cssVal) : "";
  };
}

const alignItemsHandler = alignmentHandler(
  "align-items",
  Constants.ALIGN_VALUES,
);
const alignSelfHandler = alignmentHandler("align-self", Constants.ALIGN_VALUES);
const alignContentHandler = alignmentHandler(
  "align-content",
  Constants.CONTENT_VALUES,
);
const justifyContentHandler = alignmentHandler(
  "justify-content",
  Constants.JUSTIFY_CONTENT_VALUES,
);
const justifyItemsHandler = alignmentHandler(
  "justify-items",
  Constants.JUSTIFY_ITEMS_VALUES,
);
const justifySelfHandler = alignmentHandler(
  "justify-self",
  Constants.JUSTIFY_ITEMS_VALUES,
);
const placeItemsHandler = alignmentHandler(
  "place-items",
  Constants.PLACE_VALUES,
);
const placeSelfHandler = alignmentHandler("place-self", Constants.PLACE_VALUES);
const placeContentHandler = alignmentHandler(
  "place-content",
  Constants.CONTENT_VALUES,
);

function colSpanHandler(prefix, value) {
  const n = parseNonNegative(value);
  if (value === "full") return rule(prefix, value, "grid-column", "1 / -1");
  if (n !== null && n >= 1)
    return rule(prefix, value, "grid-column", `span ${n} / span ${n}`);
  return "";
}

function rowSpanHandler(prefix, value) {
  const n = parseNonNegative(value);
  if (value === "full") return rule(prefix, value, "grid-row", "1 / -1");
  if (n !== null && n >= 1)
    return rule(prefix, value, "grid-row", `span ${n} / span ${n}`);
  return "";
}

function growHandler(prefix, value) {
  if (value === "") return `.grow { flex-grow: 1; }`;
  const n = parseNonNegative(value);
  if (n !== null) return rule(prefix, value, "flex-grow", n);
  return "";
}

function shrinkHandler(prefix, value) {
  if (value === "") return rule("shrink", "", "flex-shrink", 1);
  const n = parseNonNegative(value);
  if (n !== null) return rule(prefix, value, "flex-shrink", n);
  return "";
}

function basisHandler(prefix, value) {
  const cssVal = computeLength(value);
  return cssVal ? rule(prefix, value, "flex-basis", cssVal) : "";
}

function flexDirHandler(prefix, value) {
  const cssVal = Constants.FLEX_DIR_MAP[prefix];
  return cssVal ? `.${prefix} { flex-direction: ${cssVal}; }\n` : "";
}

export const classHandlers = {
  m: marginClass,
  mx: marginClass,
  my: marginClass,
  mt: marginClass,
  mb: marginClass,
  ml: marginClass,
  mr: marginClass,
  p: paddingClass,
  px: paddingClass,
  py: paddingClass,
  pt: paddingClass,
  pb: paddingClass,
  pl: paddingClass,
  pr: paddingClass,
  bg: colorClass,
  inline: displayClass,
  block: displayClass,
  hidden: displayClass,
  "inline-block": displayClass,
  table: displayClass,
  "table-row": displayClass,
  "table-cell": displayClass,
  static: positionClass,
  relative: positionClass,
  absolute: positionClass,
  fixed: positionClass,
  sticky: positionClass,
  top: offsetClass,
  right: offsetClass,
  bottom: offsetClass,
  left: offsetClass,
  inset: offsetClass,
  "inset-x": offsetClass,
  "inset-y": offsetClass,
  w: sizeClass,
  h: sizeClass,
  "min-w": sizeClass,
  "min-h": sizeClass,
  "max-w": sizeClass,
  "max-h": sizeClass,
  gap: sizeClass,
  "gap-x": sizeClass,
  "gap-y": sizeClass,
  rounded: borderRadiusClass,
  border: borderHandler,
  font: fontHandler,
  text: textHandler,
  flex: flexHandler,
  "inline-flex": flexHandler,
  grid: gridHandler,
  "inline-grid": gridHandler,
  items: alignItemsHandler,
  self: alignSelfHandler,
  content: alignContentHandler,
  justify: justifyContentHandler,
  "justify-items": justifyItemsHandler,
  "justify-self": justifySelfHandler,
  "place-items": placeItemsHandler,
  "place-self": placeSelfHandler,
  "place-content": placeContentHandler,
  "col-span": colSpanHandler,
  "row-span": rowSpanHandler,
  grow: growHandler,
  shrink: shrinkHandler,
  basis: basisHandler,
  col: flexDirHandler,
  row: flexDirHandler,
  "col-reverse": flexDirHandler,
  "row-reverse": flexDirHandler,
};
