"use client";

import { Input, InputProps } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput: React.FC<InputProps> = ({
  onChange,
  onBlur,
  value,
  name,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        type={showPassword ? "text" : "password"}
        disabled={disabled}
      />
      <div
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff
            className={`${disabled && "cursor-not-allowed opacity-50"}`}
          />
        ) : (
          <Eye />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
