export const PREFLIGHT_COLORS = new Set([
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "mauve",
  "olive",
  "mist",
  "taupe",
]);

export const TAILWIND_SHADES = new Set([
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
]);

export const COLOR_PROP_MAP = {
  text: "color",
  bg: "background-color",
  border: "border-color",
};

export const TAILWIND_SIZES = new Set([
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
]);

export const SIZE_KEYWORDS = {
  full: "100%",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
};

export const DIRECTIONAL_MAP = {
  m: ["margin"],
  mt: ["margin-top"],
  mr: ["margin-right"],
  mb: ["margin-bottom"],
  ml: ["margin-left"],
  mx: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  p: ["padding"],
  pt: ["padding-top"],
  pr: ["padding-right"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  top: ["top"],
  right: ["right"],
  bottom: ["bottom"],
  left: ["left"],
  inset: ["top", "right", "bottom", "left"],
  "inset-x": ["left", "right"],
  "inset-y": ["top", "bottom"],
  gap: ["row-gap", "column-gap"],
  "gap-x": ["column-gap"],
  "gap-y": ["row-gap"],
  w: ["width"],
  h: ["height"],
  "min-w": ["min-width"],
  "min-h": ["min-height"],
  "max-w": ["max-width"],
  "max-h": ["max-height"],
};

export const FONT_WEIGHT_MAP = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

export const BORDER_STYLES = new Set([
  "solid",
  "dashed",
  "dotted",
  "double",
  "hidden",
  "none",
]);

export const BORDER_DIRECTIONS = {
  t: "border-top",
  r: "border-right",
  b: "border-bottom",
  l: "border-left",
  x: "border-inline",
  y: "border-block",
};

export const FLEX_KEYWORDS = {
  auto: "1 1 auto",
  initial: "0 1 auto",
  none: "none",
};

export const FLEX_DIR_MAP = {
  row: "row",
  "row-reverse": "row-reverse",
  col: "column",
  "col-reverse": "column-reverse",
};

export const FLEX_WRAP_VALUES = new Set(["wrap", "wrap-reverse", "nowrap"]);

export const GRID_FLOW_MAP = {
  row: "row",
  column: "column",
  dense: "dense",
  "row-dense": "row dense",
  "col-dense": "column dense",
};

export const GRID_LINE_PROPS = {
  "col-span": "grid-column",
  "row-span": "grid-row",
  "col-start": "grid-column-start",
  "col-end": "grid-column-end",
  "row-start": "grid-row-start",
  "row-end": "grid-row-end",
};

export const VALID_AUTO_TRACK_SIZES = new Set([
  "auto",
  "min-content",
  "max-content",
  "fr",
]);

export const AUTO_TRACK_SIZE_MAP = {
  fr: "minmax(0, 1fr)",
};

export const ALIGN_VALUES = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  baseline: "baseline",
  stretch: "stretch",
};

export const JUSTIFY_CONTENT_VALUES = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
  stretch: "stretch",
};

export const JUSTIFY_ITEMS_VALUES = {
  start: "start",
  end: "end",
  center: "center",
  stretch: "stretch",
};

export const CONTENT_VALUES = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
  stretch: "stretch",
  baseline: "baseline",
};

export const PLACE_VALUES = {
  start: "start",
  end: "end",
  center: "center",
  stretch: "stretch",
  baseline: "baseline",
};
