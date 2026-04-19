import type { ComponentProps, FC } from "react";
import { Button } from "./button";
import Link from "next/link";

type Props = ComponentProps<typeof Button> & { href?: string };

export const ButtonLink: FC<Props> = ({ href = "#", children, ...props }) => {
  return (
    <Button {...props} asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
};
