import { HomePageLayout } from "@/components/layout/HomePageLayout"
import { BackgroundWithName } from "@/components/shared/BackgroundImageWithGradient";
import { Button } from "@/components/ui";

export default function HomePage() {
  return (
    <HomePageLayout>
      <BackgroundWithName />

      <div className="flex flex-col gap-12 px-[300px]">
        <div className="flex flex-col gap-4 max-w-5xl leading-[80px] text-[80px] font-satoshi font-bold">
          <h1 className="text-blue-100">Coming soon.</h1>
          <h1>Reveal at the Colosseum</h1>
          <h1>Breakout Hackathon.</h1>
        </div>

        <div className="flex flex-col max-w-[270px] gap-5 self-end text-24">
          <div>
            <p>We’re tirelessly building.</p>
            <p>Reach out to learn more.</p>
          </div>
          <Button className="max-w-fit">Contact Us</Button>
        </div>
      </div>

    </HomePageLayout>
  )
}

