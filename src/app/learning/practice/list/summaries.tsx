import React from "react";
import { getAllSummaries } from "@/lib/database/queries";
import Videos from "@/components/videos";

async function HistoryList() {
  const historyData = await getAllSummaries();
  return <Videos historyData={historyData} />;
}

export default HistoryList;
