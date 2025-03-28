import { ComponentProps, ReactNode } from "react";

interface ButtonRootProps extends ComponentProps<"button"> {
  children: ReactNode;
}

export function ButtonRoot(props: ButtonRootProps) {
  return (
    <button className="button-root" {...props}>
      {props.children}
    </button>
  );
}
