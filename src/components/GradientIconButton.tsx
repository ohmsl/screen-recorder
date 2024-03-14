import { IconButton, IconButtonProps } from "@mui/material";

type GradientIconButtonProps = IconButtonProps & {
  gradientOverride?: string;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
};

const GradientIconButton = (props: GradientIconButtonProps) => {
  return (
    <IconButton
      {...props}
      sx={{
        background: (theme) =>
          props.color && theme.palette[props.color]?.gradient,
        color: "rgba(0, 0, 0, 0.87)",
        ...props.sx,
      }}
    >
      {props.children}
    </IconButton>
  );
};

export default GradientIconButton;
