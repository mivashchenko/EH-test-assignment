const DEFAULT_MARKET = 'tulsa'

export const getPropertyList = async (market: string = DEFAULT_MARKET) => {
  const queryParams = new URLSearchParams({ market })
  const res = await fetch(
    `https://website-api.dev.cloud.executivehomes.com/properties?${queryParams}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch properties')
  }

  return res.json()
}
