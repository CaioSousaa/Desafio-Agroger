import { ComponentProps } from "react";

interface ButtonContentProps extends ComponentProps<"div"> {}

export function ButtonContent(props: ButtonContentProps) {
  return <div className="button-content" {...props} />;
}
