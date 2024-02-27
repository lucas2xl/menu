import { UpdateStoreSettingsForm } from "@/components/forms/store/update-store-settings-form";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";

export default async function AdvancedSettingsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { userId } = await auth();

  const store = await db.store.findUnique({
    where: { userId, slug: params.slug },
    include: { settings: true },
  });

  if (!store?.settings) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configurações Avançadas</h3>
        <p className="text-sm text-muted-foreground">
          Atualize as configurações avançadas da loja.
        </p>
      </div>
      <Separator />
      <UpdateStoreSettingsForm settings={store.settings} />
    </div>
  );
}
