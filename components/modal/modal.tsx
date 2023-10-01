import { Dialog, Transition } from '@headlessui/react'
import { Fragment, PropsWithChildren, ReactNode } from 'react'
import Button from '../button'

export interface ModalProps {
  isOpen: boolean
  onClose: VoidFunction
  title?: ReactNode
  okText?: string
  cancelText?: string
  onOk?: VoidFunction
  onCancel?: VoidFunction
  hasCancel?: boolean
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  title,
  okText = 'Okay',
  cancelText = 'Cancel',
  onOk,
  onCancel,
  hasCancel = false,
  children,
}) => (
  // @ts-ignore
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={onClose}>
      {/* @ts-ignore */}
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              {title && (
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
              )}
              <div className="mt-2 text-gray-500 text-lg">{children}</div>

              <div className="mt-4 flex flex-row-reverse gap-2">
                <Button
                  variant="contained"
                  onClick={() => {
                    if (onOk) {
                      onOk()
                    } else {
                      onClose()
                    }
                  }}
                  isBlock
                >
                  {okText}
                </Button>
                {hasCancel && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (onCancel) {
                        onCancel()
                      } else {
                        onClose()
                      }
                    }}
                    isBlock
                  >
                    {cancelText}
                  </Button>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
)

Modal.displayName = 'Modal'

export default Modal
