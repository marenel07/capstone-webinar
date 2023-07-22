"use client";
import { ReactNode, SVGProps } from "react";
import { Button } from "../../../components/ui/button";

interface AuthSocialButtonProps {
  //Type of icon
  icon: SVGProps<SVGSVGElement>;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon,
  onClick,
}) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="outline"
      className="
        inline-flex
        w-full 
        justify-center 
        rounded-md 
        bg-white 
        px-4 
        py-2 
        text-gray-500 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-gray-300 
        hover:bg-gray-50 
        focus:outline-offset-0"
    >
      {icon as ReactNode}
    </Button>
  );
};

export default AuthSocialButton;
