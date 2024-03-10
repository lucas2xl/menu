import { UpdateStoreForm } from "@/components/forms/store/update-store-form";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";

export default async function SettingsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { userId } = await auth();

  const store = await db.store.findUnique({
    where: { userId, slug: params.slug },
    include: { settings: true },
  });

  if (!store) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          Atualize as informações da loja.
        </p>
      </div>

      <Separator />
      <UpdateStoreForm store={store} />
    </div>
  );
}
