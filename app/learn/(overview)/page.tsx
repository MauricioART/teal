import { roboto } from "@/app/ui/fonts";
import { Suspense } from "react";
import Card from "@/app/ui/learn/card";

export default  function Page() {
    //const revenue = await fetchRevenue();
    //const latestInvoices = await fetchLatestInvoices();
    //const response = await fetchCardData();
    //console.log(response);  
  return (
    <main>
      <h1 className={`${roboto.className} mb-4 text-xl md:text-2xl`}>
        Learn
      </h1>
        <Card />
    </main>
  );
}