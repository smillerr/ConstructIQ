'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
}

export default function DeleteConstructionModal({
  open,
  setOpen,
  constructionId,
  routingCallback,
}) {
  const handleClose = () => setOpen(false)
  const handleContinuar = async () => {
    handleClose()
  }
  console.log(constructionId, routingCallback)
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Estás seguro de esta acción?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancelar
            </Button>
            <Button
              onClick={handleContinuar}
              variant="outlined"
              color="success"
            >
              Continuar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
