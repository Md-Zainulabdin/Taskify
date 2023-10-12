import Hero from "./components/Hero/page";

export default function Home() {
  return (
    <div className='w-full lg:h-[80vh] flex justify-center items-center relative'>

      <div className="icon hidden lg:block absolute top-32 right-24 xl:right-36">
        <img
          src="arrow.svg"
          alt="icon"
          className="w-[50px] h-[50px] rotate-[220deg]"
        />
      </div>
      {/* Hero Section */}
      <section className="w-full flex justify-center items-center">
        <Hero />
      </section>

    </div>
  )
}
