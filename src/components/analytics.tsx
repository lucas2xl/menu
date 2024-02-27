"use client";

import {
  Analytics as VercelAnalytics,
  type AnalyticsProps,
} from "@vercel/analytics/react";

export function Analytics({ ...props }: AnalyticsProps) {
  return <VercelAnalytics {...props} />;
}
