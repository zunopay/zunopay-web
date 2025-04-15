import http from 'api/http'
import { Receiver } from '@/models/payment'
import { GetReceiverParams } from '@/models/payment/params'
import { PAYMENT_QUERY_KEYS } from './keys'

const { PAYMENT, GET, RECEIVER } = PAYMENT_QUERY_KEYS

export const fetchReceiver = async (params: GetReceiverParams): Promise<Receiver> => {
	const response = await http.get<Receiver>(`${PAYMENT}/${GET}/${RECEIVER}`, { params })
	return response.data
}

