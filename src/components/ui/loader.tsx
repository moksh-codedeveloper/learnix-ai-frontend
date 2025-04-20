import React from "react";

interface LoaderProps {
  size?: string;
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = "w-2 h-2", color = "bg-white" }) => {
  return (
    <div className="flex space-x-1">
      <span className={`${size} ${color} rounded-full animate-bounce [animation-delay:0s]`}></span>
      <span className={`${size} ${color} rounded-full animate-bounce [animation-delay:0.2s]`}></span>
      <span className={`${size} ${color} rounded-full animate-bounce [animation-delay:0.4s]`}></span>
    </div>
  );
};