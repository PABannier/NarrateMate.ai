import React, { Suspense } from "react";

import Loading from "./loading";

import HistoryList from "./summaries";
import PageHeader from "@/components/page-header";

// export const revalidate = 2;
export default async function HistoryPage() {
  return (
    <div className="h-full px-4 py-6 lg:px-8 space-y-7">
      <PageHeader title="History" description="Your history of summaries" />
      <Suspense fallback={<Loading />}>
        <HistoryList />
      </Suspense>
    </div>
  );
}
