import { Text } from "../ui"

export const RewardPointSection : React.FC = () => {
    return (
        <div className='flex gap-2 border rounded-full h-fit p-2 cursor-pointer hover:brightness-200 bg-blue-700'>
            <Text as='h6' styleVariant='body-small' fontWeight='bold'>35</Text>
        </div>
    )
}