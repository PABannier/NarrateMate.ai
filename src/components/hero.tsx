import AnimatedCarousel from "./animated-carousel";

const Hero = () => {
  return (
    <section className="relative flex w-full h-[480px] items-center">
      <div className="absolute w-full h-full top-0 left-0 z-0">
        <AnimatedCarousel />
      </div>
      <div className="max-w-7xl mx-auto z-10 flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Understand million new voices watching your YouTube favorites
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          The learning platform with all you need for understanding Arabic,
          Korean, or any other languages fast.
        </p>
      </div>
      <div className="lg:w-full">
        {/* <Image
          src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
          alt="Product Demo"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        /> */}
      </div>
    </section>
  );
  // return (
  //   <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
  //     <div className="relative w-full">
  //       <div className="absolute w-full h-full top-0 left-0 z-0">
  //         <AnimatedCarousel />
  //       </div>
  //     </div>
  //   </section>
  // );
};

export default Hero;
