/* eslint-disable @typescript-eslint/no-explicit-any */
import { notifications } from "@mantine/notifications";

export type FormOptions = {
  onError: (error?: any) => void;
  onSave: () => void;
};

const onError = (error: any) => {
  const erroMensage = error?.info?.error as any;
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
  const onSave = () => {
    onSucess();
  };

  return {
    onError,
    onSave,
  };
};

export default useFormActions;
