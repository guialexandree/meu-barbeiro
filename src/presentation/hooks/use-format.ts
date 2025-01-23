const useFormat = () => {
  const formatCoins = (value: string | number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(value)).toString()
  }


  return { formatCoins }
}

export default useFormat
