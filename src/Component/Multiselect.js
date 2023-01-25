// // ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]

const SelectMultiple = () => {
  // ** State
  const [personName, setPersonName] = useState([])

  const handleChange = (event) => {
    setPersonName(event.target.value)
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', '& > *': { mt: 4, maxWidth: 500 } }}>

      <div>
        <Typography sx={{ mb: 2, fontWeight: 500 }}>Chip</Typography>
        <FormControl fullWidth>
          <InputLabel id='demo-multiple-chip-label'>Chip</InputLabel>
          <Select
            multiple
            label='Chip'
            value={personName}
            MenuProps={MenuProps}
            id='demo-multiple-chip'
            onChange={handleChange}
            labelId='demo-multiple-chip-label'
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {(selected).map(value => (
                  <Chip key={value} label={value} sx={{ m: 0.75 }} />
                ))}
              </Box>
            )}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

    </Box>
  )
}

export default SelectMultiple
