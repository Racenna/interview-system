import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect("/");

  return (
    <div className="flex-center min-h-svh flex-col">
      <div className="flex flex-col w-full max-w-sm gap-6">
        <h1 className="text-center">Practice job interview with AI</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
