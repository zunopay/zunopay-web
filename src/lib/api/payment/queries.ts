'use server'

import { getServerHttp } from '@/lib/api/http'
import { Receiver } from '@/models/payment'
import { GetReceiverParams, TransferDigitalParams } from '@/models/payment/params'
import { PAYMENT_QUERY_KEYS } from './keys'

const { PAYMENT, GET, RECEIVER, TRANSFER } = PAYMENT_QUERY_KEYS

export const fetchReceiver = async (params: GetReceiverParams): Promise<Receiver> => {
	const http = await getServerHttp();
	const response = await http.get<Receiver>(`${PAYMENT}/${GET}/${RECEIVER}`, { params })
	return response.data
}

export const fetchDigitalTransferTransaction = async (params: TransferDigitalParams) : Promise<string> => {
	const http = await getServerHttp();
	const response = await http.get<string>(`${PAYMENT}/${GET}/${TRANSFER}`, { params })
	return response.data
}