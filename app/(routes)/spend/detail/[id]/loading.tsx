import { LoaderIcon } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-center min-h-20">
      <LoaderIcon />
    </div>
  );
};

export default loading;
