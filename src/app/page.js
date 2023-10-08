import Hero from "./components/Hero/page";

export default function Home() {
  return (
    <div className='w-full'>
      {/* Hero Section */}
      <section className="w-full flex justify-center items-center">
        <Hero />
      </section>
    </div>
  )
}
