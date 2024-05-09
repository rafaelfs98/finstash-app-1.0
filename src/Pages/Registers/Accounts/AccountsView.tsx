import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Action } from "../../../Components/ListView/ListViewActions";
import { deleteAccounts } from "../../../Services/Accounts";
import { selectedItemIdAtom } from "../../../atoms/app.atom";

const AccountsActions = () => {
  const [selectedItemId] = useAtom(selectedItemIdAtom);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!confirm("Deseja excluir esta Fonte de Receita?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteAccounts(selectedItemId as string);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
      alert("Ocorreu um erro ao excluir a Fonte de Receita.");
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

export default AccountsActions;
