"use client";

import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children?: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && session) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center gap-4">
          <Spinner className="h-8 w-8" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg border p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
