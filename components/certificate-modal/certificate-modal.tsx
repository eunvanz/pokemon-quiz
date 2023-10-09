import Certificate, { CertificateProps } from '../certificate/certificate'
import Modal, { ModalProps } from '../modal'
import copy from 'clipboard-copy'
import useI18n from '@/lib/hooks/use-i18n'

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
  const i18n = useI18n()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOk={onOk}
      okText={okText || i18n.t('certificate.close')}
      cancelText={i18n.t('certificate.copyLink')}
      hasCancel
      onCancel={() => {
        copy(`https://pokedrops.io/certificate/${rank.id}`)
        alert(i18n.t('certificate.copied'))
      }}
    >
      <Certificate rank={rank} allMons={allMons} />
    </Modal>
  )
}

CertificateModal.displayName = 'CertificateModal'

export default CertificateModal
