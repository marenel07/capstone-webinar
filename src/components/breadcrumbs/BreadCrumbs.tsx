// components/breadcrumbs/Breadcrumbs.ts
import { ReactNode } from "react";
// defining the Props
export type CrumbItem = {
  label: ReactNode;
  href: string;
};
export type BreadcrumbsProps = {
  items: CrumbItem[];
};

import Link from "next/link";

const BreadCrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <div className="flex gap-2 items-start mx-6">
      {items.map((crumb, i) => {
        const isLastItem = i === items.length - 1;
        if (!isLastItem) {
          return (
            <div key={i}>
              <Link
                href={crumb.href}
                className="text-neutral-500 hover:text-neutral-400 hover:underline cursor-pointer"
              >
                {crumb.label}
              </Link>
              {/* separator */}
              <span> &gt; </span>
            </div>
          );
        } else {
          return crumb.label;
        }
      })}
    </div>
  );
};
export default BreadCrumbs;
