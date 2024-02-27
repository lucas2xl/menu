import { UpdateUserForm } from "@/components/forms/user/update-user-form";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { getPublicUrl } from "@/lib/supabase/get-public-url";

export default async function UserSettingsPage() {
  const { userId } = await auth();
  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          Esta é a forma como os outros irão te ver no site.
        </p>
      </div>
      <Separator />
      <UpdateUserForm
        user={{
          ...user,
          imageUrl: user.imageUrl && getPublicUrl("users", user.imageUrl),
        }}
      />
    </div>
  );
}
