"use client";

import { Input, InputProps } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput: React.FC<InputProps> = ({
  onChange,
  onBlur,
  value,
  name,
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
      />
      <div
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </div>
    </div>
  );
};

export default PasswordInput;
