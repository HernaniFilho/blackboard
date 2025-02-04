import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectQTD({ value, onChangeQuantity, maxQuantidade}) {
  const [qtd, setQtd] = React.useState(value || "");

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
