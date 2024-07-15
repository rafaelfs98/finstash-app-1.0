/* eslint-disable @typescript-eslint/no-explicit-any */
import { notifications } from "@mantine/notifications";

export type FormOptions = {
  onError: (error?: any) => void;
  onSave: () => void;
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
  const onSave = () => {
    onSucess();
  };

  return {
    onError,
    onSave,
  };
};

export default useFormActions;
