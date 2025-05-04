import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useNotify = () => {
  const notify = (message: string, options?: ToastOptions) => {
    const id = message.split(' ').join('-').toLowerCase()
    toast(message, { ...options, toastId: id })
  }

  return { notify }
}

export default useNotify
