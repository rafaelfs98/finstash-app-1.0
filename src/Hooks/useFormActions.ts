/* eslint-disable @typescript-eslint/no-explicit-any */
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export type FormOptions = {
  forceRefetch: number;

  onError: (error?: any) => void;
  onSave: () => void;
};

const onError = (error: any) => {
  const erroMensage = error.info.error as any;
  notifications.show({
    title: "Error!",
    message: erroMensage,
    color: "red",
  });
};

const onSucess = () => {
  notifications.show({
    title: "Sucesso!",
    message: "Ei deu tudo certo pode continuar",
    color: "green",
  });
};

const useFormActions = (): FormOptions => {
  const [forceRefetch, setForceRefetch] = useState(0);

  const onSave = () => {
    onSucess();
    setForceRefetch(new Date().getTime());
  };

  return {
    forceRefetch,
    onError,
    onSave,
  };
};

export default useFormActions;
