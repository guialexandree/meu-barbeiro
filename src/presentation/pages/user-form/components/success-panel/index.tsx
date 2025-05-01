import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Button, ButtonGroup, Icon, Slide, Stack } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { State } from '@/presentation/pages/user-form/components/atoms'
import successImg from '@/presentation/assets/success.svg'

export const SuccessPanel: React.FC = () => {
  const navigate = useNavigate()
  const setFormSuccess = useSetRecoilState(State.successFormState)
  const name = useRecoilValue(State.nameState)
  const contactNumber = useRecoilValue(State.contactNumberState)

  const handleSendAppLink = () => {
    const linkApp = 'https://www.google.com'
    const message = `Salvee ${name.text?.toUpperCase()}, seu cadastro foi criado, esse é o link pra entrar na fila pela APP ${linkApp}`
    window.open(`https://api.whatsapp.com/send?phone=${contactNumber}&text=${message}`, '_blank')
  }

  const handleGoBackToList = () => {
    setFormSuccess(false)
    navigate('/clientes')
  }

  const handleGoBackToForm = () => {
    setFormSuccess(false)
    navigate('/clientes/criar-novo')
  }

  return (
    <Stack alignItems='flex-start'>
      <Slide direction="down" in timeout={300}>
        <Alert variant="filled" severity="success" sx={{ marginBottom: 2, color: '#fff', fontSize: 16 }}>
          Tudo certo, o cliente foi cadastrado com sucesso!
        </Alert>
      </Slide>

      <Slide direction='right' in timeout={400}>
        <ButtonGroup color="inherit" size="large" fullWidth orientation="vertical" aria-label="Vertical button group">
          <Button sx={{ color: 'grey.300' }} onClick={handleSendAppLink} endIcon={<WhatsAppIcon />} >
            Enviar link do app
          </Button>

          <Button sx={{ color: 'grey.300' }} onClick={handleGoBackToForm} endIcon={<Icon>add</Icon>}>Cadastrar Novo Cliente</Button>
        </ButtonGroup>
      </Slide>

      <Slide direction="left" in mountOnEnter unmountOnExit timeout={300}>
        <Button sx={{ mt: 2, color: 'grey.300' }} variant="text" color="inherit" size="small" onClick={handleGoBackToList} startIcon={<Icon>arrow_back</Icon>}>
          Voltar para lista
        </Button>
      </Slide>

      <Slide direction="up" in mountOnEnter unmountOnExit timeout={300}>
        <Box
          component="img"
          src={successImg}
          height={300}
          sx={{ position: 'fixed', bottom: -0, left: '20%', maxHeight: '30vh', zInde: 1 }}
        />
      </Slide>
    </Stack>
  )
}
