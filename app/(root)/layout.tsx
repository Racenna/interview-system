import { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

import CustomAvatar from "@/components/CustomAvatar";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="px-4 py-8 sm:px-16">
      <nav className="flex justify-between items-center h-10 mb-8">
        <h3>
          <Link href="/">Practice job interview with AI</Link>
        </h3>
        <CustomAvatar name="test user" />
      </nav>
      {children}
    </div>
  );
};

export default Layout;
