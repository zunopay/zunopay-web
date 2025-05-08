import { BackgroundWithNameLayout } from "@/components/layout/BackgroundWithNameLayout";
import Image from "next/image";
import SHORT_LOGO from "../../public/Images/short-logo.png";
// import { SolutionSection } from "@/components/Explainer";
// import { TestimonialsSection } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  return (
    <BackgroundWithNameLayout showFooter={true}>
      <div className="flex justify-center w-full">
        <Image src={SHORT_LOGO} alt="zunopay" height={200} width={200}/>
      </div>
      <div className="flex flex-col xs:gap-10">
        <CTASection />
        {/* <SolutionSection /> */}
        {/* <TestimonialsSection /> */}
      </div>
    </BackgroundWithNameLayout>
  );
}
