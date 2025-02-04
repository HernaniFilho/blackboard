import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/**
 * Componente para selecionar a quantidade de um produto.
 * Exibe um menu de seleção onde o usuário pode escolher a quantidade de um produto para o registro de venda.
 *
 * @param {Object} props - Propriedades passadas para o componente.
 * @param {number} props.value - Valor atual da quantidade selecionada.
 * @param {Function} props.onChangeQuantity - Função chamada ao selecionar uma quantidade, passando o valor selecionado.
 * @param {number} props.maxQuantidade - Quantidade máxima disponível para seleção.
 * 
 * @componente
 * 
 * @exemplo
 * <SelectQTD
 *   value={quantidadeSelecionada}
 *   onChangeQuantity={handleQuantidadeChange}
 *   maxQuantidade={10}
 * />
 */
export default function SelectQTD({ value, onChangeQuantity, maxQuantidade }) {
  const [qtd, setQtd] = React.useState(value || "");

  /**
   * Função chamada quando a quantidade é alterada.
   * Atualiza o estado local e chama a função onChangeQuantity para propagar a alteração.
   * 
   * @param {object} event - Evento do tipo onChange.
   */
  const handleChange = (event) => {
    const selectedQtd = event.target.value;
    setQtd(selectedQtd);
    if (onChangeQuantity) {
      onChangeQuantity(selectedQtd);
    }
  };

  // Limita a quantidade máxima para no máximo 10
  const limiteMaximo = Math.min(10, maxQuantidade);
  
  // Cria os itens do menu com base no limite de quantidade disponível no estoque
  const menuItems = Array.from({ length: limiteMaximo }, (_, index) => (
    <MenuItem key={index + 1} value={index + 1}>
      {index + 1}
    </MenuItem>
  ));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      },
    },
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Qtd</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value || ""}
          onChange={handleChange}
          autoWidth
          label="Qtd"
          MenuProps={MenuProps}
        >
          <MenuItem value="">
            <em>0</em>
          </MenuItem>
          {menuItems}
        </Select>
      </FormControl>
    </div>
  );
}
