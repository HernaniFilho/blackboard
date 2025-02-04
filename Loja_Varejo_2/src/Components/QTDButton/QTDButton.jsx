import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/**
 * Componente `SelectQTD` que renderiza um campo de seleção para a quantidade de um produto.
 * Este componente permite ao usuário selecionar a quantidade com um limite máximo baseado na quantidade disponível.
 * 
 * @param {Object} props - As propriedades do componente.
 * @param {number} props.value - O valor da quantidade selecionada.
 * @param {function} props.onChangeQuantity - Função de callback chamada quando a quantidade é alterada.
 * @param {number} props.maxQuantidade - A quantidade máxima disponível para selecionar.
 * 
 * @returns {JSX.Element} - O JSX do campo de seleção de quantidade.
 */
export default function SelectQTD({ value, onChangeQuantity, maxQuantidade}) {
  const [qtd, setQtd] = React.useState(value || "");

  /**
   * Função chamada quando a quantidade é alterada.
   * 
   * @param {Object} event - O evento disparado pela mudança no campo de seleção.
   */
  const handleChange = (event) => {
    const selectedQtd = event.target.value;
    setQtd(selectedQtd);
    if (onChangeQuantity) {
      onChangeQuantity(selectedQtd);
    }
  };

  const limiteMaximo = Math.min(10, maxQuantidade);
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
