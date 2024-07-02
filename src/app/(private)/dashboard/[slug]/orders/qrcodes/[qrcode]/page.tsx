import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function QRCodePage({
  params,
}: {
  params: { slug: string; qrcode: string };
}) {
  console.log({ params });
  if (!params.qrcode) return notFound();

  const qrcode = await db.qrcode.findFirst({
    where: {
      store: {
        slug: params.slug,
      },
      value: Number(params.qrcode),
    },
  });

  console.log({ qrcode });
  if (!qrcode) return null;

  return <div>QRCode {params.qrcode}</div>;
}
