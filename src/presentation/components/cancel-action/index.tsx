import React from 'react'
import { Button, Zoom } from '@mui/material'

type CancelActionProps = {
  onCancel: VoidFunction
  fullWidth?: boolean
  enterDelay?: number
}

export const CancelAction: React.FC<CancelActionProps> = (props) => {
  return (
    <Zoom in unmountOnExit mountOnEnter style={{ transitionDelay: `${props.enterDelay || 0}ms` }}>
      <Button
        fullWidth={props.fullWidth}
        id="close-clients-form-action"
        color="inherit"
        variant="outlined"
        sx={{ borderColor: 'grey.700', backgroundColor: 'background.default' }}
        onClick={props.onCancel}

      >
        Cancelar
      </Button>
    </Zoom>
  )
}
