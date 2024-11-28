export const API_PATH = {
  POST_LOGIN: "/api/v1/auth/field-worker/login",
  POST_REPORT_IMAGE: "/api/v1/files/upload",
  POST_REPORTS: "/api/v1/reports",
  GET_HISTORY_LIST: "/api/v1/reports/pagination",
  GET_HISTORY_BY_ID: (id: number) => `/api/v1/reports/${id}`,
} as const;