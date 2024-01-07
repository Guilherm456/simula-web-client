"use client";
import { Button } from "@components/ui";
import { logout } from "@services/login";
import { useAppSelector } from "@utils/hooks";
import { cn } from "@utils/utils";
import {
  BookImage,
  CircleUser,
  Home,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const options = [
  {
    value: "/",
    label: "Bases",
    icon: <Home className="h-6 w-6" />,
  },
  {
    value: "/simulacoes",
    label: "Simulações",
    icon: <BookImage className="h-6 w-6" />,
  },
];

const classString = "group-aria-expanded:flex hidden";
export const Drawer = () => {
  const [open, setOpen] = useState(false);

  const user = useAppSelector((state) => state.login.user);

  const pathName = usePathname();

  return (
    <aside
      className={cn(
        "group flex justify-between bg-gray-200 md:min-h-screen",
        "w-min aria-expanded:md:w-64",
        "md:flex-col",
        "w-full md:w-min md:aria-expanded:w-64",
        "transition-all duration-300 ease-out",
        "fixed left-0 top-0 z-10 md:relative",
      )}
      aria-expanded={open}
      aria-label="Menu"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        className="m-4 h-min w-min self-end rounded-full bg-gray-300 p-2 text-gray-12 md:m-6"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <PanelLeftClose className="h-5 w-5" aria-label="Fechar menu" />
        ) : (
          <PanelLeftOpen className="h-5 w-5" aria-label="Abrir menu" />
        )}
      </Button>
      <div className="hidden md:block">
        {options.map((option) => (
          <Link
            href={option.value}
            key={option.value}
            className={cn(
              "justify-center group-aria-expanded:justify-start",
              "flex w-full items-center gap-4 px-4 py-2 text-gray-900 no-underline hover:bg-gray-300",
              "aria-selected:text-primary",
            )}
            aria-selected={pathName === option.value}
            aria-label={option.label}
          >
            {option.icon}
            <span className={cn("w-full text-base", classString)}>
              {option.label}
            </span>
          </Link>
        ))}
      </div>
      <div className="grid gap-2 p-4 md:p-6">
        <div className="flex items-center gap-4 text-gray-900 ">
          <div className="rounded-full bg-gray-300 p-2 text-gray-12">
            <CircleUser className="h-5 w-5" />
          </div>
          <span className={cn("hidden w-full text-base", classString)}>
            {user?.name ?? "-"}
          </span>
        </div>
        <Link href="/login" className="hidden md:block">
          <Button
            className={cn("bg-red-500", classString)}
            onClick={() => logout()}
          >
            <LogOut className="h-5 w-5" />
            <span className="w-full text-base">Sair</span>
          </Button>
        </Link>
      </div>
    </aside>
  );
};
