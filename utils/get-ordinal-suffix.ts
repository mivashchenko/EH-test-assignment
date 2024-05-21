export const getOrdinalSuffix = (number: number): string => {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const value = number % 100
  return (
    number + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0])
  )
}
