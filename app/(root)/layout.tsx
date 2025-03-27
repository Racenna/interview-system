import Link from "next/link";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <nav>
        <Link href="/">
          (LINK) Navigate to home page... (todo - logo or just header etc.)
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
