import { AppWalkthrough } from "./AppWalkthrough"
import { ScanToPaySection } from "./QrScanner"

export const Features : React.FC<unknown> = () => {
    return (
        <div className="flex flex-col gap-3 max-w-[550px] items-center">
            <div className="flex flex-col items-center">
              <h1 className="text-blue-zunopay text-[30px] font-bold">
                Simple, Fast & Secure
              </h1>
              <AppWalkthrough className="md:hidden"/>
            </div>
            <div className="flex flex-col gap-5 mx-4">
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">A borderless micro payments app.</h2>
                    <p className="text-grey-200 text-sm">
                        Pay anyone, anywhere - scan QR codes like UPI, SEPA, PIX. No Visa/Mastercard setup required for merchants.
                    </p>
                </div>

                <div className="border-t border-gray-200 border-1"></div>

                <div className="flex flex-col gap-1">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                        No cards, no topups - just scan and pay.
                    </h2>
                    <p className="text-grey-200 text-sm">
                        Skip the hassle of issuing or topping up crypto cards. Directly send stablecoins to any supported bank.
                    </p>
                </div>

                <div className="border-t border-gray-200 border-1"></div>

                <div className="flex flex-col gap-1">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Low fees. High reach.</h2>
                    <p className="text-grey-200 text-sm">
                        Pay freelancers or settle international bills with stablecoins - enjoy fast and reliable transfers worldwide.
                    </p>
                </div>
            </div>
            <ScanToPaySection className="md:hidden mx-4" />
          </div>
    )
}