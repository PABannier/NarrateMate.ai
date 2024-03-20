import Header from "@/components/header";
import { Suspense } from "react";
import FeaturesAccordion from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Problem } from "@/components/problem";

export default function LandingPage() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <Problem />
        <FeaturesAccordion />
      </main>
      <Footer />
    </>
  );
}
