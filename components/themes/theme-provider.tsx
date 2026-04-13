"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Props = React.PropsWithChildren<
  React.ComponentProps<typeof NextThemesProvider>
>;

export const ThemeProvider: React.FC<Props> = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
