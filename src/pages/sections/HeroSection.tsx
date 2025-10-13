import Containers from '@/components/ui/Containers'

const HeroSection = () => {
  return (
    <>
      <Containers maxWidth="md">
        <section className="mt-30">
          <div className="text-black text-center ">
            <h1 className="text-3xl md:text-4xl lg:text-[50px] md:leading-15 lg:leading-18 mb-3 font-semibold">
              Where Every Visit Is A Step Toward A Brighter, Healthier Future
            </h1>
            <p className="font-medium tracking-wide text-gray-600">
              Compassionate pediatric care that grows with your child—from
              infancy through adolescence.
            </p>
          </div>
          <div className="my-4 bg-[url(./image/data-section-colors.svg)] bg-center bg-no-repeat bg-cover">
            <img
              src="./image/Pediatrics.gif"
              alt="pediatric image"
              className="m-auto  max-w-full w-[180px] h-auto"
            />
            <div className="text-center ">
              <h2 className="text-2xl md:text-3xl lg:text-[40px] md:leading-14 mb-3 font-semibold">
                Book Your Appointment
                <br />
                Today
              </h2>
              <div className="mt-3 text-sm md:text-base lg:text-base">
                <p className="tracking-wide text-gray-600 mb-3">
                  Every visit to our clinic is designed to be more than just a
                  checkup. It's an opportunity to build trust, celebrate
                  milestones, and ensure your little one grows up strong,
                  confident, and thriving.
                </p>
                <p className=" tracking-wide text-gray-500">
                  We're nurturing healthy, happy children and supporting
                  families every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Containers>
    </>
  );
}

export default HeroSection