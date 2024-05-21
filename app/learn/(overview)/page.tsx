import { roboto } from "@/app/ui/fonts";
import { Suspense } from "react";
import Card from "@/app/ui/learn/card";
import Image from "next/image";

export default  function Page() {

  const adverse = "Adverse";
  const reverse = "Reverse";
  return (
    <main className="flex h-full px-0">
      <div className="flex justify-center items-center w-4/5 h-full ">
        <Card adverse={adverse} reverse={reverse} />
      </div>
      <div className="w-1/5 h-full ">
      </div>
    </main>
  );
}
