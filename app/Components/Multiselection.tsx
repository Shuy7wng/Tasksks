import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Categoria } from '../contextAPI';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, selected: readonly string[], theme: Theme) {
  return {
    fontWeight: selected.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}
interface MultipleSelectChipProps {
  selectedCategories: Categoria[];
  onSelectionChange: (value: string[]) => void;
}

export default function MultipleSelectChip({
  selectedCategories,
  onSelectionChange,
}: MultipleSelectChipProps) {
  const theme = useTheme();
  const [selectedNames, setSelectedNames] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedNames>) => {
    const {
      target: { value },
    } = event;
    const updated = typeof value === 'string' ? value.split(',') : value;
    setSelectedNames(updated);
    onSelectionChange(updated);
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="categoria-chip-label">Categorie</InputLabel>
      <Select
        labelId="categoria-chip-label"
        id="categoria-chip"
        multiple
        value={selectedNames}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Categorie" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {selectedCategories.map((cat) => (
          <MenuItem
            key={cat.id}
            value={cat.nome}
            style={getStyles(cat.nome, selectedNames, theme)}
          >
            {cat.nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}