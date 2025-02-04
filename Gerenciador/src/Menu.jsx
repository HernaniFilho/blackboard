import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import DehazeOutlinedIcon from "@mui/icons-material/DehazeOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import useStore from "./state/store";

/**
 * Componente para exibir um menu lateral (Drawer).
 * O menu contém uma lista de itens que, ao serem clicados, alteram a escolha no estado global.
 *
 * @component
 * @example
 * return <TemporaryDrawer />;
 */
export default function TemporaryDrawer() {
  // Estado local para controlar a visibilidade do Drawer
  const [open, setOpen] = React.useState(false);

  // Função para alterar a escolha no estado global
  const setEscolha = useStore((state) => state.setEscolha);

  /**
   * Função para alternar a visibilidade do Drawer.
   *
   * @param {boolean} newOpen - Valor que define se o Drawer estará aberto ou fechado.
   */
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  /**
   * Função chamada ao clicar em um item de menu, que altera a escolha no estado global
   * e fecha o Drawer.
   *
   * @param {number} index - Índice do item clicado.
   */
  const handleMenuItemClick = (index) => {
    setEscolha(index);
    setOpen(false);
  };

  // Itens do menu com texto e ícones
  const menuItems = [
    { text: "Dashboard", icon: <TimelineOutlinedIcon /> },
    { text: "Produtos", icon: <ShoppingCartOutlinedIcon /> },
    { text: "Fornecedores", icon: <StorefrontOutlinedIcon /> },
    { text: "Compra", icon: <LocalMallOutlinedIcon /> },
    { text: "Venda", icon: <MonetizationOnOutlinedIcon /> },
    { text: "Transferencia", icon: <SwapHorizOutlinedIcon /> },
  ];

  /**
   * Lista de itens para o Drawer, incluindo a opção de fechar o menu e os itens do menu principal.
   *
   * @returns {JSX.Element} A lista de itens dentro do Drawer.
   */
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key={"Fechar"} button onClick={() => toggleDrawer(false)}>
          <ListItemButton>
            <ListItemIcon>
              <ArrowBackIosNewOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Fechar"} />
          </ListItemButton>
        </ListItem>
        {menuItems.map((item, index) => (
          <ListItem
            key={item.text}
            button
            onClick={() => handleMenuItemClick(index)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <DehazeOutlinedIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
