import { Response } from "express";

const jsonResponse = (
  res: Response,
  success: boolean,
  code: number,
  message: string | Record<string, any>,
  data: string | Record<string, any> | boolean
) => {
  return res.status(code).json({ success: success, code, message, data });
};

export default {
  jsonResponse,
};
