import Hero from "./components/Hero/page";

export default function Home() {
  return (
    <div className='w-full flex justify-center items-center relative'>

      <div className="icon hidden lg:block absolute top-12 right-24">
        <img
          src="arrow.svg"
          alt="icon"
          className="w-[50px] h-[50px] rotate-[220deg]"
        />
      </div>
      {/* Hero Section */}
      <section className="w-full flex flex-col gap-6 md:gap-12 justify-center items-center">
        <Hero />
      </section>

    </div>
  )
}
