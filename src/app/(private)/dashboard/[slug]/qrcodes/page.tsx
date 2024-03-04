import { db } from "@/lib/db";
import { DownloadQRCodeButton } from "./_components/download-qrcode-button";
import { GenerateQRCodeButton } from "./_components/generate-qrcode-button";
import { QRCodeCard } from "./_components/qrcode-card";

export default async function QRCodesPage({
  params,
}: {
  params: { slug: string };
}) {
  const qrcodes = await db.qrcode.findMany({
    where: { store: { slug: params.slug } },
    orderBy: { value: "asc" },
  });

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">QRCodes</h2>
        <div className="flex items-center space-x-2">
          <DownloadQRCodeButton />
          <GenerateQRCodeButton storeSlug={params.slug} />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {qrcodes.map((qrcode) => (
          <QRCodeCard key={qrcode.id} qrcode={qrcode} storeSlug={params.slug} />
        ))}
      </div>
    </div>
  );
}
