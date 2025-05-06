import { BackgroundWithNameLayout } from "@/components/layout/BackgroundWithNameLayout";
import Image from "next/image";
import SHORT_LOGO from "../../public/Images/short-logo.png";
import { SolutionSection } from "@/components/Explainer";
import { TestimonialsSection } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";

export default function HomePage() {
  return (
    <BackgroundWithNameLayout showFooter={true} >
      <div className="flex flex-col md:gap-20 xs:gap-10">
        <div className="flex justify-center w-full">
          <Image src={SHORT_LOGO} alt="zunopay" />
        </div>

        <CTASection />
        <SolutionSection />
        {/* <TestimonialsSection /> */}
      </div>
    </BackgroundWithNameLayout>
  );
}
