import CertificateModal, {
  CertificateModalProps,
} from '@/components/certificate-modal'
import { noop } from 'lodash-es'

export interface CertificateViewProps
  extends Omit<CertificateModalProps, 'isOpen' | 'onClose'> {
  onNavigateToMain: VoidFunction
}

const CertificateView: React.FC<CertificateViewProps> = ({
  allMons,
  rank,
  onNavigateToMain,
}) => {
  return (
    <div className="bg-primary w-full h-screen">
      <CertificateModal
        isOpen
        okText="Play Pokédrops"
        onOk={onNavigateToMain}
        allMons={allMons}
        rank={rank}
        onClose={noop}
      />
    </div>
  )
}

export default CertificateView
