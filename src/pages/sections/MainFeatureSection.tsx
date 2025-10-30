import Grid from '@mui/material/Grid';

const MainFeatureSection = () => {

  return (
    <>
      <main data-testid ={'main-feature-section'}>
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 6, lg: 6 }}>
            <section className="p-4">
              <img
                src="./image/Main_Pediatric_section_1.png"
                alt="features_one_pediatric_img"
                className="m-auto max-w-100  md:max-w-[600px] lg:max-w-full h-auto rounded-2xl relative left-0 md:left-12 -z-10"
              />
            </section>
          </Grid>
          <Grid size={{ sm: 12, md: 6, lg: 6 }} alignSelf={"center"}>
            <section>
              {/* 2BBBB3 */}
              {/* outline-(--color-primary) */}
              <div className="text-center md:text-left ">
                <h6 className=" text-sm text-[#2BBBB3] text-shadow-xs p-2 my-2 outline-2 outline-[#2BBBB3]  inline-block rounded-full ">
                  Direct communication with your Pediatrician
                </h6>
                <div className="bg-[#2BBBB3]/55 p-2 rounded-xl text-(--color-tertiary)">
                  <h1 className="text-2xl mb-2">
                    Enrich Every Single Pediatric Record
                  </h1>
                  <h4 className="text-xl my-2">
                    Global coverage across every country for healthcare.
                  </h4>
                  <p className="text-justify">
                    Starting with the most precise data sources, we then
                    incorporate all other available sources to offer you the
                    optimal combination of accuracy and coverage.
                  </p>
                </div>
              </div>
            </section>
          </Grid>  
        </Grid>
      </main>
    </>
  );
}

export default MainFeatureSection