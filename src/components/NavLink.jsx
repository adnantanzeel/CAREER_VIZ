"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavLink = forwardRef(
  ({ className, activeClassName, pendingClassName, to, children, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === to;

    return (
      <Link href={to} ref={ref} className={cn(className, isActive && activeClassName)} {...props}>
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
