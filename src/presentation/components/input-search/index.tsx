import React from 'react'
import { Divider, Icon, IconButton, InputBase, Paper } from '@mui/material'
import { RecoilState, useRecoilState } from 'recoil'

type InputSearchProps = {
  id: string
  placeholder: string
  valueState: RecoilState<string>
}

export const InputSearch: React.FC<InputSearchProps> = (props) => {
  const [text, setText] = useRecoilState(props.valueState)

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
        value={text}
        placeholder={props.placeholder}
        onChange={(e) => setText(e.target.value)}
        inputProps={{ 'aria-label': props.placeholder, id: props.id }}
        id={props.id}
      />

      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <Icon>search</Icon>
      </IconButton>

      <Divider orientation="vertical" flexItem />

      <IconButton>
        <Icon>filter_list</Icon>
      </IconButton>
    </Paper>
  )
}
