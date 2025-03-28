import { ComponentProps } from "react";

interface MenuRootProps extends ComponentProps<"div"> {}

export function MenuRoot(props: MenuRootProps) {
  return <div className="menu-root" {...props} />;
}
