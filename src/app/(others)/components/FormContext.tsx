"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FC, ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  children: ReactNode;
  schema?: any;
}

export const FormContext: FC<Props> = ({ children, schema }) => {
  const form = useForm({
    resolver: yupResolver(schema),
  });
  return <FormProvider {...form}>{children}</FormProvider>;
};
