import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { Action } from "../../../Components/ListView/ListViewActions";
import { selectedItemIdAtom } from "../../../atoms/app.atom";
import { useState } from "react";
import { deleteCategories } from "../../../Services/Categories";

const CategoryActions = () => {
  const [selectedItemId] = useAtom(selectedItemIdAtom);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!confirm("Deseja excluir este equipemanto?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteCategories(selectedItemId as string);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
      alert("Ocorreu um erro ao excluir o servico.");
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

export default CategoryActions;
