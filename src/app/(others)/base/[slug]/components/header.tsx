"use client";

import { Button } from "@components/ui";
import { useAppSelector } from "@utils/hooks";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface Props {
  user: string;
  name: string;
  _id: string;
  editable?: boolean;

  onDelete?: () => void;

  urlEdit: string;
}

export const Header: FC<Props> = ({
  user,
  _id,
  name,
  editable = true,
  onDelete,
  urlEdit,
}) => {
  const userActual = useAppSelector((state) => state.login.user);

  return (
    <div className="botder-gray-4 flex w-full items-center justify-between gap-3 py-2">
      <Link href="/">
        <Button className="h-11 w-11 justify-center rounded-full border border-solid border-gray-4 bg-transparent text-black">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>
      <h1 className="text-2xl font-bold text-gray-12">{name}</h1>
      {user === userActual?._id && editable ? (
        <div className="flex gap-2">
          <Button
            aria-label="Deletar"
            className="h-11 w-11 justify-center rounded-full border border-solid border-gray-4 bg-transparent text-black"
            onClick={onDelete}
            id="button-delete"
            aria-label="Deletar"
          >
            <Trash className="h-5 w-5" />
          </Button>

          <Link
            href={urlEdit}
            aria-label="Ir para página de edição"
            id="button-edit"
          >
            <Button
              aria-label="Ir para página de edição"
              className="h-11 w-11 justify-center rounded-full border border-solid border-gray-4 bg-transparent text-black"
            >
              <Edit className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
