'use client'
import { useFetchRewardPoints } from "@/api/user/queries"
import { Text } from "../ui"

export const RewardPointSection : React.FC = () => {

    const { data: points }  = useFetchRewardPoints();

    return (
        <div className='flex gap-2 border rounded-full h-fit p-2 cursor-pointer hover:brightness-200 bg-blue-700'>
            <Text as='h6' styleVariant='body-small' fontWeight='bold'>{points?.data}</Text>
        </div>
    )
}