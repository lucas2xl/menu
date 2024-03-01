import { Separator } from "@/components/ui/separator";
import { redirects } from "@/utils/constants";
import { SidebarNav } from "./sidebar-nav";

export default function UserSettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const sidebarNavItems = [
    {
      title: "Perfil",
      href: `${redirects.dashboard}/${params.slug}/user-settings`,
    },
    {
      title: "Plano",
      href: `${redirects.dashboard}/${params.slug}/user-settings/plan`,
    },
  ];

  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">
          Gerencie suas configurações de conta e defina preferências de e-mail.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
