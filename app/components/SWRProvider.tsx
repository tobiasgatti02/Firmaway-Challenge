'use client'

import { SWRConfig } from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 3600000, // 1 hour
      }}
    >
      {children}
    </SWRConfig>
  )
}