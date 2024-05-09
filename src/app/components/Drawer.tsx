"use client";
import { Roles } from "@models/user.model";
import checkRole from "@utils/checkRole";
import { useAppSelector } from "@utils/hooks";
import { cn } from "@utils/utils";
import {
  BookImage,
  CircleUser,
  Home,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  ScrollText,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Button,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@components/ui";
import useAuth from "@services/logout";

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
  {
    value: "/estruturas",
    label: "Estruturas",
    role: "admin",
    icon: <BookImage className="h-6 w-6" />,
  },
  {
    value: "/usuarios",
    label: "Usuários",
    role: "admin",
    icon: <UsersRound className="h-6 w-6" />,
  },
  {
    value: "/logs",
    label: "Relatórios do sistema",
    icon: <ScrollText className="h-6 w-6" />,
  },
];

const Drawer = () => {
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state.login.user);
  const pathName = usePathname();

  const { logout } = useAuth();
  const renderDrawer = () => (
    <>
      <Button
        className="m-4 h-min w-min self-end rounded-full bg-gray-300 p-2 text-gray-900 md:m-6"
        onClick={() => setOpen(!open)}
        id="menu-button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-controls="drawer-menu"
        aria-expanded={open}
      >
        {open ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
      </Button>

      <div
        id="drawer-menu"
        className={cn(!open && "max-md:hidden")}
        role="menu"
        aria-hidden={!open}
      >
        {options
          .filter(
            (option) =>
              !option.role ||
              (!!user && checkRole(option?.role as Roles, user!.role)),
          )
          ?.map((option) => (
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
              id={`menu-item-${option.value}`}
              onClick={() => setOpen(false)}
            >
              {option.icon}
              <span
                className={cn(
                  "w-full truncate text-base",
                  open ? "block" : "hidden",
                )}
              >
                {option.label}
              </span>
            </Link>
          ))}
      </div>

      <div className="grid gap-2 p-4 md:p-6">
        {open ? (
          <>
            <div className="flex items-center gap-4 text-gray-900 ">
              <div className="rounded-full bg-gray-300 p-2 text-gray-12">
                <CircleUser className="h-5 w-5" />
              </div>
              <span className={cn(open ? "line-clamp-1 " : "hidden")}>
                {user?.name ?? "-"}
              </span>
            </div>
            <Link
              href="/login"
              className={open ? "flex" : "hidden"}
              aria-label="Sair"
            >
              <Button
                className={cn(
                  "items-center bg-red-500 text-white",
                  open ? "flex" : "hidden",
                )}
                onClick={() => logout()}
                id="logout-button"
              >
                <LogOut className="h-5 w-5" />
                Sair
              </Button>
            </Link>
          </>
        ) : (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger asChild>
                <div className="flex cursor-pointer items-center gap-4 text-gray-900">
                  <div className="rounded-full bg-gray-300 p-2 text-gray-12">
                    <CircleUser className="h-5 w-5" />
                  </div>
                  <span className={cn("hidden w-full text-base")}>
                    {user?.name ?? "-"}
                  </span>
                </div>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => logout()} id="logout-menu-item">
                  <LogOut className="mr-2 h-4 w-4" /> Sair
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
      </div>
    </>
  );

  return (
    <>
      <aside
        className={cn(
          "group bg-gray-200",
          open
            ? "fixed inset-0 z-50 justify-between md:relative md:min-h-screen md:w-1/4"
            : "fixed left-0 top-0 z-50 w-full justify-between md:relative md:w-min",
          "flex transition-all duration-300 ease-out md:flex-col",
        )}
        aria-label="Menu lateral"
      >
        {renderDrawer()}
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-[99] h-full w-full bg-black opacity-50 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {open && (
        <div
          className="group fixed inset-0 z-[100] flex h-full w-full flex-col justify-between bg-gray-200 p-4 md:hidden"
          id="drawer-menu"
          aria-expanded={open}
        >
          {renderDrawer()}
        </div>
      )}
    </>
  );
};

export default Drawer;
