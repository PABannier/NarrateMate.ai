import AnimatedCarousel from "./animated-carousel";
import ButtonSignin from "@/components/button-signin";

const Hero = () => {
  return (
    <section className="relative">
      <div className="absolute mt-8 sm:mt-16 lg:mt-0 z-20 w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20 h-full">
          <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center text-white lg:text-left lg:items-start">
            <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
              Understand million new voices watching your YouTube favorites
            </h1>
            <p className="text-lg leading-relaxed">
              The learning platform with all you need for understanding Arabic,
              Korean, or any other languages fast.
            </p>
            <ButtonSignin />
          </div>
        </div>
      </div>
      <div className="absolute bg-primary opacity-90 z-10 w-full h-full"></div>
      <AnimatedCarousel className="z-0" />
    </section>
  );
};

export default Hero;
