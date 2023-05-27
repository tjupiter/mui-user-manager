// ===================================
//           ARROW OPTIONS
// ===================================

export type Arrow =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "left-top"
  | "left-center"
  | "left-bottom"
  | "right-top"
  | "right-center"
  | "right-bottom";

// ===================================
//            BUTTON COLORS
// ===================================

// color options: https://mui.com/material-ui/api/button/ <|||> https://mui.com/material-ui/customization/palette/

export type ButtonColors =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

// ===================================
//        SETTINGS API RESPONSE
// ===================================

export interface Settings {
  bloodTypes: string[];
  departments: string[];
  eyeColors: string[];
  hairColors: string[];
}

// ===================================
//        TEXT FIELD VARIATNS
// ===================================

export type TextFieldVariants = "filled" | "outlined" | "standard" | undefined;
