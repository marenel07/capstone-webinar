import Link from "next/link";

type BreadcrumbItemProps = {
  href: string;
  children: React.ReactNode;
};

const BreadcrumbsItem = ({ children, href, ...props }: BreadcrumbItemProps) => {
  return (
    <li {...props}>
      <Link href={href} passHref>
        <a>{children}</a>
      </Link>
    </li>
  );
};

export default BreadcrumbsItem;
