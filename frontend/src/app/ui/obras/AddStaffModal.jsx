'use client'

import Box from '@mui/material/Box'

import Modal from '@mui/material/Modal'

import AddStaffForm from './AddStaffForm'

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

export default function AddStaffModal({ open, setOpen, handleFormSubmit }) {
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddStaffForm submitHandler={handleFormSubmit} />
        </Box>
      </Modal>
    </div>
  )
}
