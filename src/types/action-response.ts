export type ActionResponse<T = any> = {
  message: string;
  status: "success" | "error";
  body?: T;
};
