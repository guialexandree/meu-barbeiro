import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useNotify = () => {
  const notify = (message: string, options?: ToastOptions) => {
    toast(message, options)
  }

  return { notify }
}

export default useNotify
