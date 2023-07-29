// components/breadcrumbs/Breadcrumbs.ts
import { ReactNode } from "react";
// defining the Props
export type CrumbItem = {
  label: ReactNode;
  path: string;
};
export type BreadcrumbsProps = {
  items: CrumbItem[];
};

import Link from "next/link";

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <div className="flex gap-2 items-start">
      {items.map((crumb, i) => {
        const isLastItem = i === items.length - 1;
        if (!isLastItem) {
          return (
            <>
              <Link
                href={crumb.path}
                key={i}
                className="text-indigo-500 hover:text-indigo-400 hover:underline"
              >
                {crumb.label}
              </Link>
              {/* separator */}
              <span> / </span>
            </>
          );
        } else {
          return crumb.label;
        }
      })}
    </div>
  );
};
export default Breadcrumbs;
