import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

interface NavLinkCompatProps {
  to: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  children?: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, children, ...props }, ref) => {
    const router = useRouter();
    const isActive = router.asPath === to;

    return (
      <Link href={to} legacyBehavior>
        <a ref={ref} className={cn(className, isActive && activeClassName)} {...props}>
          {children}
        </a>
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };

