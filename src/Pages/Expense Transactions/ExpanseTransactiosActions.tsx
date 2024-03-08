import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Action } from "../../Components/ListView/ListViewActions";
import { deleteExpenseSource } from "../../Services/ExpenseSource";
import { useAtom } from "jotai";
import { selectedItemIdAtom } from "../../atoms/app.atom";

const ExpanseTransactiosActions = () => {
  const [selectedItemId] = useAtom(selectedItemIdAtom);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!confirm("Deseja excluir esta Fonte de Despesa?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteExpenseSource(selectedItemId as string);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
      alert("Ocorreu um erro ao excluir a Fonte de Despesa.");
    }
  };

  const actions: Action[] = [
    {
      label: "Editar",
      icon: <IconPencil size={14} />,
      onClick: () => navigate(`${selectedItemId}/update`),
    },
    {
      label: "Excluir",
      icon: <IconTrash size={14} />,
      onClick: () => handleDelete(),
      disabled: isDeleting,
    },
  ];

  return actions;
};

export default ExpanseTransactiosActions;
