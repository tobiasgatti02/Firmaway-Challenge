import useSWR, { SWRConfiguration, SWRResponse } from 'swr'

export function useSWRConfig<Data = any, Error = any>(
  key: string | null,
  swrOptions?: SWRConfiguration<Data, Error>
): SWRResponse<Data, Error> {
  return useSWR<Data, Error>(key, swrOptions)
}