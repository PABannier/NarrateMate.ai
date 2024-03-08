import PageHeader from "@/components/page-header";
import React from "react";

function WordsPage() {
  return (
    <div className="h-full px-4 py-6 lg:px-8 space-y-7">
      <PageHeader title="Review" description="Review your saved words" />
    </div>
  );
}

export default WordsPage;
