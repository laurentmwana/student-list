"use client";

import { NavMenu } from "@/components/nav-menu";
import { useSession } from "@/lib/auth-client";
import React from "react";

type Props = { children?: React.ReactNode };

const Layout: React.FC<Props> = ({ children }) => {
  const session = useSession();
  return (
    <div className="relative">
      <NavMenu user={session.data?.user} />
      <main className="pt-[var(--header-height)] ">{children}</main>
    </div>
  );
};

export default Layout;
