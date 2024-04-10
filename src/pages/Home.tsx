import { useContext } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "../contexts/FormContext";
import { initialEventData } from "../data/events";
import { AppContext } from "../contexts/AppContext";
import { Helmet } from "react-helmet";

const HomeProcessSection = ({
  children,
  src,
  reverse,
}: {
  children: React.ReactNode;
  src: string;
  reverse?: boolean;
}) => {
  return (
    <section
      className={`my-4 flex flex-wrap  items-center justify-between gap-8 laptop:my-7 ${reverse && "flex-row-reverse"}`}
    >
      <div className="w-full tablet:max-w-[45%]">
        <img src={src} alt="" />
      </div>
      <div className="w-full tablet:max-w-[45%]">{children}</div>
    </section>
  );
};

const SectionTitle = ({
  title,
  btnText,
}: {
  title: string;
  btnText?: string;
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      {btnText && (
        <p className="px-4 py-2 text-center rounded-full w-fit bg-orange-clr bg-opacity-15 text-orange-clr">
          {btnText}
        </p>
      )}
      <h2>{title}</h2>
    </div>
  );
};

const CreateButton = ({
  setCurrentStep,
  setEventData,
  creationSteps,
}: {
  setCurrentStep: any;
  setEventData: any;
  creationSteps: any;
}) => {
  return (
    <div>
      <Link
        to="/create"
        className="rounded-[15px] bg-orange-clr px-6 py-[14px] text-[18px] text-white"
        onClick={() => {
          setEventData(initialEventData);
          setCurrentStep!(creationSteps![0]);
        }}
      >
        Create event
      </Link>
    </div>
  );
};

const Home = () => {
  let setEventData: any, setCurrentStep, creationSteps;
  const formContext = useContext(FormContext);
  const appContext = useContext(AppContext);

  if (formContext && appContext) {
    ({ setEventData } = formContext);
    ({ setCurrentStep, creationSteps } = appContext);
  }
  return (
    <section>
      <Helmet>
        <title data-react-helmet="true">Groupgo | Home</title>

        <meta
          name="description"
          data-react-helmet="true"
          content="GroupGo is more than just an event planning platform; we're passionate about fostering unforgettable group experiences. We believe that life's most cherished moments are best shared with the people you love. That's why we created a platform that simplifies group event planning, taking the stress out of the process and allowing you to focus on the fun."
        />

        <meta
          property="og:url"
          data-react-helmet="true"
          content="https://groupgo.vercel.app"
        />
        <meta
          property="og:title"
          data-react-helmet="true"
          content="GroupGo | Home"
        />
        <meta
          property="og:description"
          data-react-helmet="true"
          content="GroupGo is more than just an event planning platform; we're passionate about fostering unforgettable group experiences. We believe that life's most cherished moments are best shared with the people you love. That's why we created a platform that simplifies group event planning, taking the stress out of the process and allowing you to focus on the fun."
        />
        <meta
          property="og:image"
          data-react-helmet="true"
          content="https://groupgo.vercel.app/site_img.png"
        />
        <meta
          property="og:site_name"
          content="GroupGo"
          data-react-helmet="true"
        />

        <meta
          name="twitter:card"
          data-react-helmet="true"
          content="summary_large_image"
        />
        <meta
          name="twitter:site"
          data-react-helmet="true"
          content="@your_twitter_handle"
        />
        <meta
          name="twitter:title"
          data-react-helmet="true"
          content="Groupgo | Home"
        />
        <meta
          name="twitter:description"
          data-react-helmet="true"
          content="GroupGo is more than just an event planning platform; we're passionate about fostering unforgettable group experiences. We believe that life's most cherished moments are best shared with the people you love. That's why we created a platform that simplifies group event planning, taking the stress out of the process and allowing you to focus on the fun."
        />
        <meta
          name="twitter:image"
          data-react-helmet="true"
          content="https://groupgo.vercel.app/site_img.png"
        />
        <meta
          name="pinterest:description"
          data-react-helmet="true"
          content="GroupGo is more than just an event planning platform; we're passionate about fostering unforgettable group experiences. We believe that life's most cherished moments are best shared with the people you love. That's why we created a platform that simplifies group event planning, taking the stress out of the process and allowing you to focus on the fun."
        />
        <meta
          name="pinterest:image"
          data-react-helmet="true"
          content="https://groupgo.vercel.app/site_img.png"
        />

        <meta
          name="linkedin:title"
          data-react-helmet="true"
          content="Groupgo"
        />
        <meta
          name="linkedin:description"
          data-react-helmet="true"
          content="GroupGo is more than just an event planning platform; we're passionate about fostering unforgettable group experiences. We believe that life's most cherished moments are best shared with the people you love. That's why we created a platform that simplifies group event planning, taking the stress out of the process and allowing you to focus on the fun."
        />
        <link
          rel="canonical"
          data-react-helmet="true"
          href="https://groupgo.vercel.app/"
        />
      </Helmet>
      <div className="mb-10 mt-[20px] flex w-full flex-col-reverse justify-center laptop:mb-0 laptop:mt-[50px] laptop:flex-row">
        <div className="flex w-full flex-col gap-[35px] laptop:w-[60%] laptop:gap-[28px]">
          <div>
            <h1 className="w-full text-[30px] tablet:text-[64px]">
              Create and share events in minutes
            </h1>
            <p className="text-[18px] font-light leading-[25.56px] tablet:w-[70%]">
              You can set a budget for your event and collect money from the
              participants securely and conveniently.
            </p>
          </div>
          <div className="flex gap-4">
            <CreateButton
              setCurrentStep={setCurrentStep}
              creationSteps={creationSteps}
              setEventData={setEventData}
            />
            <div>
              <a
                className="rounded-[15px] border border-[#060811] px-6 py-[14px] text-[18px] font-medium text-[#060811] "
                href={"#about"}
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className="shrink-0 laptop:w-[40%]">
          <img
            className="object-cover"
            src="../../friend_taking_pic.png"
            alt="Hero section image"
          />
        </div>
      </div>
      <div id="about" className="laptop:pb-16">
        <SectionTitle
          title="About Us"
          btnText="Create lasting memories with GroupGo."
        />
        <HomeProcessSection src="/about.svg">
          <h3>Who are we?</h3>
          <p>
            GroupGo is more than just an event planning platform; we're
            passionate about fostering unforgettable group experiences. We
            believe that life's most cherished moments are best shared with the
            people you love. That's why we created a platform that simplifies
            group event planning, taking the stress out of the process and
            allowing you to focus on the fun.
          </p>
        </HomeProcessSection>
      </div>
      <div>
        <SectionTitle
          title="How it works"
          btnText="Planning Events Simplified."
        />
        <HomeProcessSection src="/template.svg" reverse>
          <h3 className="text-center">Find Your Perfect Template</h3>
          <p>
            Struggling to visualize your dream group event? No worries! Browse
            our extensive library of pre-made event templates, categorized for
            different occasions:
          </p>

          <p className="my-2">
            Sports: Get Active! Find templates for sporting events, marathons,
            or game nights.
          </p>
          <p className="my-2">
            Travel: Explore the World Together! Utilize templates for weekend
            getaways, road trips, or group vacations.
          </p>
        </HomeProcessSection>
        <HomeProcessSection src="/customise.svg">
          <h3>Customize Your Event</h3>
          <p>
            Our user-friendly form makes it simple to personalize your event and
            bring your vision to life:
          </p>
          <p className="my-2">
            Event Details: Set the date, time, location, and craft a captivating
            description that will have everyone excited!
          </p>
          <p className="my-2">
            Tiered Ticketing (Optional): Cater to different budgets and
            preferences by offering tiered ticketing options. Create "VIP"
            tickets with exclusive perks or "Early Bird" discounts for early
            sign-ups.
          </p>
          <p className="my-2">
            Event Links: Link to relevant resources like the official event
            website, booking pages, or additional information for your attendees
          </p>
          <p>Fill out our intuitive form to personalize your event.</p>
        </HomeProcessSection>
        <HomeProcessSection src="/payment.svg" reverse>
          <h3>Secure Payments</h3>
          <p>
            Choose your preferred method to receive payments for tickets.
            GroupGo offers verified and secure payment processing.
          </p>
        </HomeProcessSection>
        <HomeProcessSection src="/share.svg">
          <h3>Get Ready to Have Fun and Spread the Word!</h3>
          <p>
            Manage tickets, share details, and track your group within the
            platform.
          </p>
          <p>Share your event with friends and family effortlessly.</p>
          <p>
            Utilize built-in social media sharing buttons and automated
            invitation tools.
          </p>
        </HomeProcessSection>
        <HomeProcessSection src={"/bonus.svg"} reverse>
          <h3>Bonus Features</h3>
          <p>
            Effortless Management: Enjoy a dedicated dashboard to manage all
            your events. Track RSVPs, ticket sales, and communication with your
            group in one place.
          </p>
          <p>
            Peace of Mind: Focus on creating amazing experiences, knowing
            GroupGo handles the rest.
          </p>
        </HomeProcessSection>
      </div>
      {/* CTA */}
      <div className="flex flex-wrap gap-8 items-center pt-16">
        <h5 className="text-5xl">Create Your First GroupGo Event Today!</h5>
        <CreateButton
          setCurrentStep={setCurrentStep}
          creationSteps={creationSteps}
          setEventData={setEventData}
        />
      </div>
    </section>
  );
};

export default Home;
/* Frame 4 */

/* 
border: 1px solid rgba(6, 8, 17, 0.2);
border-radius: 15px; */
