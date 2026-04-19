import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { excerpt, getInitials } from "@/lib/string";
import { BookOpen, LogOut, UserIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { User } from "better-auth";
import { UserModel } from "@/app/generated/prisma/models/User";

type Props = { user: UserModel };

export const UserButton = ({ user }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback className="border text-sm font-semibold text-primary">
                  {getInitials(user.name)}
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center gap-3 p-3">
            <Avatar>
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                  {getInitials(user.name)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col gap-0.5 leading-none">
              <p className="text-sm font-semibold">{excerpt(user.name, 10)}</p>
              <p className="truncate text-xs text-muted-foreground">
                {excerpt(user.email, 10)}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              Mon profil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              <BookOpen className="mr-2 h-4 w-4" />
              Tableau de bord
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
