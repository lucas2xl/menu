"use server";

import { db } from "@/lib/db";
import { ActionResponse } from "@/types/action-response";

export async function deleteQRCodeAction(id: string): Promise<ActionResponse> {
  if (!id) {
    return { message: "QRCode id not provided", status: "error" };
  }

  const qrcodeExists = await db.qrcode.findUnique({ where: { id } });
  if (!qrcodeExists) {
    return { message: "QRCode does not exist", status: "error" };
  }
  await db.qrcode.delete({ where: { id } });

  return { message: "QRCode deleted successfully", status: "success" };
}
