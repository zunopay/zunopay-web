import { cn } from "@/lib/utils";
import Image from "next/image";
import FEATURE_EXAMPLE from '../../public/Images/feature-example.png';

export const AppWalkthrough : React.FC<{ className?: string }> = ({className}) => {
    return (
        <div className={cn("relative", className)}>
            <div className="relative mx-auto">
                <Image src={FEATURE_EXAMPLE} width={700} height={700} alt="DEMO"/>
            </div> 
        </div>

    )
}