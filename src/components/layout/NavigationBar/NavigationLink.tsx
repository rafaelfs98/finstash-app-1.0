import { Divider, NavLink, Stack } from "@mantine/core";
import {
  IconCategory,
  IconCategory2,
  IconHome,
  IconTransactionDollar,
  IconWallet,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type NavigationLinkWithLabelProps = {
  toggle: () => void;
};

const NavigationLinkWithLabel: React.FC<NavigationLinkWithLabelProps> = ({
  toggle,
}) => {
  const navigate = useNavigate();
  const [activeLinkMain, setActiveLinkMain] = useState<string>(
    sessionStorage.getItem("activeLinkMain") || "Inicio"
  );

  const handleLinkMainClick = (title: string) => {
    setActiveLinkMain(title);
  };

  useEffect(() => {
    sessionStorage.setItem("activeLinkMain", activeLinkMain);
  }, [activeLinkMain]);

  return (
    <Stack justify="center" gap={0}>
      <NavLink
        mt="xl"
        title="Inicio"
        label="Inicio"
        variant="filled"
        leftSection={<IconHome />}
        onClick={() => {
          navigate("/");
          toggle();
          handleLinkMainClick("Inicio");
        }}
        active={activeLinkMain === "Inicio"}
      />
      <NavLink
        mt="sm"
        variant="filled"
        title="transações"
        label="Transações"
        leftSection={<IconTransactionDollar />}
        onClick={() => {
          handleLinkMainClick("transações");
          toggle();
          navigate("transacoes");
        }}
        active={activeLinkMain === "transações"}
      />

      <Divider mt="sm" />

      <NavLink
        mt="sm"
        variant="filled"
        title="Contas"
        label="Contas"
        leftSection={<IconWallet />}
        onClick={() => {
          handleLinkMainClick("Contas");
          toggle();
          navigate("cadastros/contas");
        }}
        active={activeLinkMain === "Contas"}
      />
      <NavLink
        mt="sm"
        variant="filled"
        title="Categorias"
        label="Categorias"
        leftSection={<IconCategory />}
        onClick={() => {
          handleLinkMainClick("Categorias");
          toggle();
          navigate("cadastros/categorias");
        }}
        active={activeLinkMain === "Categorias"}
      />

      <NavLink
        mt="sm"
        variant="filled"
        title="SubCategorias"
        label="Sub Categorias"
        leftSection={<IconCategory2 />}
        onClick={() => {
          handleLinkMainClick("SubCategorias");
          toggle();
          navigate("cadastros/subcategorias");
        }}
        active={activeLinkMain === "SubCategorias"}
      />
    </Stack>
  );
};

export default NavigationLinkWithLabel;
