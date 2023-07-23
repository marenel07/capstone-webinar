"use client";

interface ContainerProps {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-screen-2xl mx-auto">{children}</div>;
};

export default Container;
