import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-center min-h-svh flex-col bg-muted">
      <div className="flex flex-col w-full max-w-sm gap-6">
        <p className="text-center">Practice job interview with AI</p>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
