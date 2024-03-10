"use server";

import { cookies } from "next/headers";

export async function setQRCodeCookie(qrcode: string) {
  cookies().set("qrcode", qrcode);
}
