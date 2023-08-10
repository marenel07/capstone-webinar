import { useSidebarCollapse } from '@/hooks/useSidebarCollapse';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface SidebarItemProps {
  active: string;
  href: string;
  icon: LucideIcon;
  label: string;
  activeLabel?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  active,
  label,
  activeLabel,
  icon: Icon,
}) => {
  const isCollapsed = useSidebarCollapse((state) => state.isSidebarCollapsed);

  return (
    <Link
      href={href}
      className={
        active === activeLabel
          ? `text-white text-sm rounded-sm bg-slate-800 px-3 py-2 flex gap-3 ${
              isCollapsed
                ? 'items-center justify-center'
                : 'items-center justify-start'
            }`
          : `text-neutral-400 text-sm rounded-sm px-3 py-2 hover:bg-slate-800 hover:text-neutral-200 flex gap-3 items-center ${
              isCollapsed
                ? 'items-center justify-center'
                : 'items-center justify-start'
            }`
      }
    >
      <Icon size={20} />
      <span className={isCollapsed ? 'hidden' : 'block'}>{label}</span>
    </Link>
  );
};

export default SidebarItem;
