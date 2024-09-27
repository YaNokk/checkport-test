import { Link as ReactRouterLink } from "react-router-dom";
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof ReactRouterLink>;

export function Link(props: LinkProps) {
  return <ReactRouterLink {...props} />;
}
