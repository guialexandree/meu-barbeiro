const useWithMinimunDelay = () => {
  const withMinimumDelay = async (handler: () => Promise<void>, minDelay: number) => {
    const startTime = Date.now()

    const result = await handler()
    const elapsedTime = Date.now() - startTime
    const remainingTime = Math.max(minDelay - elapsedTime, 0)

    await new Promise((resolve) => setTimeout(resolve, remainingTime))
    return result
  }

  return { withMinimumDelay }
}

export default useWithMinimunDelay
