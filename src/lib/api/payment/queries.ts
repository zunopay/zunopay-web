'use server'

import { Receiver } from '@/models/payment'
import { GetReceiverParams, TransferDigitalParams } from '@/models/payment/params'
import { PAYMENT_QUERY_KEYS } from './keys'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { ReturnResponse } from '@/lib/types'
import { getAccessToken } from '../http'

const { PAYMENT, GET, RECEIVER, TRANSFER } = PAYMENT_QUERY_KEYS

export const fetchReceiver = async (params: GetReceiverParams): Promise<ReturnResponse<Receiver>> => {
	const accessToken = await getAccessToken();

	const response = await fetchWrapper<Receiver>({method: 'GET', path: `${PAYMENT}/${GET}/${RECEIVER}`, params, accessToken})
	return response
}

export const fetchDigitalTransferTransaction = async (params: TransferDigitalParams) : Promise<ReturnResponse<string>> => {
	const accessToken = await getAccessToken();

	const response = await fetchWrapper<string>({method: 'GET', path: `${PAYMENT}/${GET}/${TRANSFER}`, params, accessToken, isTextResponse:true})
	return response
}