// CategoryActions.tsx
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { Action } from "../../../Components/ListView/ListViewActions";
import { selectedItemIdAtom } from "../../../atoms/app.atom";

const CategoryActions = () => {
  const [selectedItemId] = useAtom(selectedItemIdAtom);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Deseja excluir este equipamento?")) {
      return;
    }

    // Lógica para exclusão
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
      onClick: handleDelete,
    },
  ];

  return actions;
};

export default CategoryActions;
