import Certificate, { CertificateProps } from '../certificate/certificate'
import Modal, { ModalProps } from '../modal'
import copy from 'clipboard-copy'

export interface CertificateModalProps extends CertificateProps, ModalProps {
  onOk?: VoidFunction
  okText?: string
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  rank,
  allMons,
  onOk,
  okText = 'Close',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOk={onOk}
      okText={okText}
      cancelText="Copy Certificate Link"
      hasCancel
      onCancel={() => {
        copy(`https://pokedrops.io/certificate/${rank.id}`)
        alert('Share link copied to clipboard!')
      }}
    >
      <Certificate rank={rank} allMons={allMons} />
    </Modal>
  )
}

CertificateModal.displayName = 'CertificateModal'

export default CertificateModal
