import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient, protos } from "@google-analytics/data";

import { GA_CLIENT_EMAIL, GA_PRIVATE_KEY, GA_PROPERTY_ID } from "@/libs/env";
import { AnalyticsInfo, MyResponse } from "@/types";

const analytics = new BetaAnalyticsDataClient({
  credentials: {
    client_email: GA_CLIENT_EMAIL,
    private_key: GA_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

const GA_START_DATE = "2015-08-14";
const END_DATE = "today";

const REPORT_METRICS = ["totalUsers", "screenPageViews"] as const;

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-01`;
}

function parseMetrics(row?: protos.google.analytics.data.v1beta.IRow) {
  const [visitors, pageViews] = row?.metricValues ?? [];

  return {
    visitors: Number(visitors?.value ?? 0),
    pageViews: Number(pageViews?.value ?? 0),
  };
}

export async function GET() {
  try {
    const [response] = await analytics.runReport({
      property: `properties/${GA_PROPERTY_ID}`,

      dateRanges: [
        {
          startDate: GA_START_DATE,
          endDate: END_DATE,
        },
        {
          startDate: formatDate(new Date()),
          endDate: END_DATE,
        },
      ],

      metrics: REPORT_METRICS.map((name) => ({ name })),
    });

    const [totalRow, monthlyRow] = response.rows ?? [];

    const resp: MyResponse<AnalyticsInfo> = {
      data: {
        total: parseMetrics(totalRow),
        monthly: parseMetrics(monthlyRow),
      },
      error: undefined,
    };

    return NextResponse.json(resp);
  } catch (error) {
    console.error("[Analytics]", error);

    const resp: MyResponse<AnalyticsInfo> = {
      data: null,
      error: "獲取分析資料時發生錯誤",
    };

    return NextResponse.json(resp, {
      status: 500,
    });
  }
}
