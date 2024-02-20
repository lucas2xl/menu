"use client";

import { LogOutIcon, Trash2Icon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteUser } from "@/hooks/user/use-delete-user";
import { User } from "@prisma/client";

type Props = {
  user: Omit<User, "password">;
};
export function UserButton({ user }: Props) {
  const { onDeleteAccount, onLogout } = useDeleteUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.imageUrl || ""} />
          <AvatarFallback>
            {user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => onDeleteAccount(user.id)}
        >
          <Trash2Icon className="w-4 h-4 mr-2" />
          Delete Account
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>
          <LogOutIcon className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
