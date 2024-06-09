import { Button, Modal } from 'rsuite';

const Alert = ({ open, onConfirm, onCancle, text}) => {
  return (
    <Modal backdrop="static" role="alertdialog" open={open}>
        <Modal.Body>
          {text}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onConfirm} appearance="primary" color='red'>
            Comfirm
          </Button>
          <Button onClick={onCancle}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default Alert;