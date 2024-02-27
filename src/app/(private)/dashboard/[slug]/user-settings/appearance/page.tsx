import { UpdateAppearanceForm } from "@/components/forms/user/update-appearance-form";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";

export default async function SettingsAppearancePage() {
  const { userId } = await auth();
  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Aparência</h3>
        <p className="text-sm text-muted-foreground">
          Personalize a aparência do aplicativo. Alterne automaticamente entre
          temas claro e escuro.
        </p>
      </div>
      <Separator />
      <UpdateAppearanceForm theme={user.theme} />
    </div>
  );
}
