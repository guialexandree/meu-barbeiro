import React from 'react'
import { Icon, IconButton, InputBase, Paper } from '@mui/material'

type InputSearchProps = {
  placeholder: string
}

export const InputSearch: React.FC<InputSearchProps> = (props) => {
  return (
    <Paper
      sx={{
        p: '2px 4px',
        borderRadius: 1,
        borderColor: 'grey.300',
        borderWidth: 1,
        mx: 2,
        mb: 1,
        display: 'flex',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        size="small"
        placeholder={props.placeholder}
        inputProps={{ 'aria-label': props.placeholder }}
      />

      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <Icon>search</Icon>
      </IconButton>
    </Paper>
  )
}
