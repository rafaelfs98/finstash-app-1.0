/* eslint-disable @typescript-eslint/no-explicit-any */
import { notifications } from "@mantine/notifications";
import { useState } from "react";

type OnSubmitOptionsRest<T = any> = {
  create: (data: any) => Promise<T>;
  update: (id: number, data: any) => Promise<T>;
};

export type FormOptions = {
  onError: (error?: any) => void;
  onSave: () => void;
  onSubmit: <T = any>(data: any, options: OnSubmitOptionsRest<T>) => Promise<T>;
  submitting: boolean;
};

const onError = (error: any) => {
  const erroMensage = error?.info?.error as any;
  notifications.show({
    color: "red",
    message: erroMensage,
    title: "Error!",
  });
};

const onSucess = () => {
  notifications.show({
    color: "green",
    message: "Ei deu tudo certo pode continuar",
    title: "Sucesso!",
  });
};

const useFormActions = (): FormOptions => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async <T = any>(
    data: any,
    { create, update }: OnSubmitOptionsRest<T>
  ): Promise<T> => {
    setSubmitting(true);

    try {
      const form = { ...data };

      delete form.id;

      const fn = data.id ? () => update(data.id, form) : () => create(form);

      const response = await fn();

      setSubmitting(false);

      return response;
    } catch (error) {
      setSubmitting(false);

      throw error;
    }
  };

  const onSave = () => {
    onSucess();
  };

  return {
    onError,
    onSave,
    onSubmit,
    submitting,
  };
};

export default useFormActions;
