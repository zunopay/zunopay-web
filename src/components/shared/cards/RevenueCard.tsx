import { Text } from "../../ui"
import { Card } from "../../ui/card"

interface Props {
    title: string;
}

export const RevenueCard : React.FC<Props> = ({ title }) => {
    return (
        <Card className='w-80 p-6 bg-active-gradient'>
            <Text as='p' styleVariant='body-small' className='text-grey-100'>{title}</Text>
            <Text as='h2' styleVariant='body-normal'>49,112.48</Text>
        </Card>
    )
}