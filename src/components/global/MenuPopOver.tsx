// mui
import { styled } from "@mui/material/styles";
import { Popover, PopoverProps } from "@mui/material";
// type
import { Arrow } from "../../types";

type ArrowStyleProps = {
  arrow: Arrow;
};

// ====================================
//            CUSTOM COMPONENT
// ====================================

const ArrowStyle = styled("div")<ArrowStyleProps>(({ arrow, theme }) => {
  const DEF_SIZE = 12;
  const POSITION = -(DEF_SIZE / 2);
  const borderStyle = `1x solid ${theme.palette.grey[500]}`;

  const topStyle = {
    borderRadius: "0 0 3px 0",
    top: POSITION,
    borderBottom: borderStyle,
    borderRight: borderStyle,
  };
  const bottomStyle = {
    borderRadius: "3px 0 0 0 ",
    bottom: POSITION,
    borderTop: borderStyle,
    borderLeft: borderStyle,
  };
  const leftStyle = {
    borderRadius: "0 3px 0 0",
    left: POSITION,
    borderTop: borderStyle,
    borderRight: borderStyle,
  };
  const rightStyle = {
    borderRadius: "0 0 0 3px",
    right: POSITION,
    borderBottom: borderStyle,
    borderLeft: borderStyle,
  };

  return {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      zIndex: 1,
      width: DEF_SIZE,
      height: DEF_SIZE,
      content: "''",
      display: "block",
      position: "absolute",
      transform: "rotate(-135)deg",
      background: theme.palette.background.paper,
    },
    // TOP
    ...(arrow === "top-left" && { ...topStyle, left: 20 }),
    ...(arrow === "top-center" && {
      ...topStyle,
      left: 0,
      right: 0,
      margin: "auto",
    }),
    ...(arrow === "top-right" && { ...topStyle, right: 20 }),
    // BOTTOM
    ...(arrow === "bottom-left" && { ...bottomStyle, left: 20 }),
    ...(arrow === "bottom-center" && {
      ...bottomStyle,
      left: 0,
      right: 0,
      margin: "auto",
    }),
    ...(arrow === "bottom-right" && { ...bottomStyle, right: 20 }),
    // LEFT
    ...(arrow === "left-top" && { ...leftStyle, top: 20 }),
    ...(arrow === "left-center" && {
      ...leftStyle,
      top: 0,
      bottom: 0,
      margin: "auto",
    }),
    ...(arrow === "left-bottom" && { ...leftStyle, bottom: 20 }),
    // RIGHT
    ...(arrow === "right-top" && { ...rightStyle, top: 20 }),
    ...(arrow === "right-center" && {
      ...rightStyle,
      top: 0,
      bottom: 0,
      margin: "auto",
    }),
    ...(arrow === "right-bottom" && { ...rightStyle, bottom: 20 }),
  };
});

// ================================================

interface Props extends PopoverProps {
  arrow?: Arrow;
  disableArrow?: boolean;
  // children: ReactNode
}

export default function MenuPopOver({
  children,
  arrow = "top-right",
  disableArrow,
  sx,
  ...other
}: Props) {
  return (
    <Popover
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          overflow: "inherit",
          ...sx,
        },
      }}
      {...other}
    >
      {!disableArrow && <ArrowStyle arrow={arrow} />}
      {children}
    </Popover>
  );
}
