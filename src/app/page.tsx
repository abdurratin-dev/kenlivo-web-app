import { Banner } from "@/components/home/banner";
// TODO(kenlivo): recreate these sections — they were removed during the redesign.
// import { FeaturedDestinations } from "@/components/home/featured-destinations";
// import { WhyChooseUs } from "@/components/home/why-choose-us";
// import { Testimonials } from "@/components/home/testimonials";
// import { CallToAction } from "@/components/home/call-to-action";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Banner />
      {/* <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction /> */}
    </main>
  );
}
