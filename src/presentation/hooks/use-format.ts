const useFormat = () => {
  const formatCoins = (value: string | number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(value)).toString()
  }

  const formatPhoneNumber = (value: string): string => {
      const cleaned = value.replace(/\D/g, '')
      const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`
      }
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
    }

  return { formatCoins, formatPhoneNumber }
}

export default useFormat
