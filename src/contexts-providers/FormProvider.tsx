import { ReactNode } from "react";
// mui
import { SxProps } from "@mui/material";
// form
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  sx?: SxProps;
};

export default function FormProvider({
  children,
  methods,
  onSubmit,
  sx,
}: Props) {
  return (
    <Form {...methods}>
      <form
        onSubmit={onSubmit}
        // style={ ...sx}
      >
        {children}
      </form>
    </Form>
  );
}
