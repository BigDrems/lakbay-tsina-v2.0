import React from "react";

const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-300 opacity-20 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute top-20 -right-20 w-60 h-60 bg-orange-300 opacity-20 rounded-full filter blur-3xl animate-float-delayed"></div>
      <div className="absolute bottom-10 left-20 w-40 h-40 bg-amber-400 opacity-10 rounded-full filter blur-3xl animate-float-slow"></div>
    </div>
  );
};

export default BackgroundElements;
