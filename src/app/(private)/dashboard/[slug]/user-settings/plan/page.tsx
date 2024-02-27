import { UpdatePlanForm } from "@/components/forms/user/update-plan-form";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";

export default async function SettingsPlanPage() {
  const { userId } = await auth();
  const userPlan = await db.userPlan.findUnique({ where: { userId } });

  if (!userPlan) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Plano</h3>
        <p className="text-sm text-muted-foreground">
          Atualize o plano da sua conta.
        </p>
      </div>
      <Separator />
      <UpdatePlanForm plan={userPlan} />
    </div>
  );
}
