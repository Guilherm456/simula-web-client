"use client";

import { Button } from "@components/ui";
import { useAppSelector } from "@utils/hooks";
import { simulationStatus } from "@utils/simulation";
import { cn } from "@utils/utils";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface Props {
  user?: string;
  name: string;

  editable?: boolean;

  onDelete?: () => void;

  urlEdit?: string;

  status?: string;

  customButton?: {
    icon: JSX.Element;
    onClick: () => void;
    ariaLabel?: string;
    id?: string;
  }[];
}

export const Header: FC<Props> = ({
  user,
  name,
  editable = true,
  onDelete,

  urlEdit,

  status,

  customButton,
}) => {
  const userActual = useAppSelector((state) => state.login.user);

  const router = useRouter();

  return (
    <div className="botder-gray-4 flex w-full items-center justify-between gap-3 py-2">
      <Button
        className="h-11 w-11 justify-center rounded-full border border-solid border-gray-4 bg-transparent text-black"
        onClick={() => router.back()}
        id="header-back-button"
        aria-label="Voltar para a página anterior"
      >
        <ArrowLeft size={20} />
      </Button>

      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-12">{name}</h1>

        {status && (
          <span
            className={cn(
              "rounded-full px-2 py-1 text-sm font-bold",
              simulationStatus[status as keyof typeof simulationStatus].bgClass,
              simulationStatus[status as keyof typeof simulationStatus].color,
            )}
            id="status-header-label"
          >
            {simulationStatus[status as keyof typeof simulationStatus].label}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {user === userActual?._id && editable && (
          <>
            {onDelete && (
              <Button
                className="h-11 w-11 justify-center rounded-full border border-solid border-gray-4 bg-transparent text-black"
                onClick={onDelete}
                id="button-delete"
                aria-label="Deletar"
              >
                <Trash size={20} />
              </Button>
            )}
            {urlEdit && (
              <Link
                href={urlEdit}
                aria-label="Ir para página de edição"
                id="button-edit"
              >
                <Button
                  aria-label="Ir para página de edição"
                  className="h-11 w-11 justify-center rounded-full border border-solid border-gray-4 bg-transparent text-xl text-black"
                >
                  <Edit />
                </Button>
              </Link>
            )}
          </>
        )}

        {customButton?.map((button, index) => (
          <Button
            key={index}
            className="h-11 w-11 justify-center rounded-full border border-solid border-gray-4 bg-transparent text-black"
            onClick={button.onClick}
            aria-label={button.ariaLabel}
            id={button.id}
          >
            {button.icon}
          </Button>
        ))}
      </div>
    </div>
  );
};
