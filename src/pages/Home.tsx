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
      <div className="w-full tablet:max-w-[45%]">{children}</div>
      <div className="w-full tablet:max-w-[45%]">
        <img src={src} alt="" />
      </div>
    </section>
  );
};

const SectionTitle = ({
  title,
  btnText,
  center,
}: {
  title?: string;
  btnText?: string;
  center?: boolean;
}) => {
  return (
    <div className={`${center && "items-center"} flex w-full flex-col`}>
      {btnText && (
        <p
          className={`${center && "text-center"} w-fit rounded-full bg-orange-clr bg-opacity-15 px-4 py-2 text-orange-clr`}
        >
          {btnText}
        </p>
      )}
      <h2>{title && title}</h2>
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
          content="GroupGo was built by creators, for creators. We understand the importance of building an online community, but sometimes the best connections happen offline. We make it easy for you to bring your online community together in real-life experiences that strengthen bonds and create lasting memories."
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
          content="GroupGo was built by creators, for creators. We understand the importance of building an online community, but sometimes the best connections happen offline. We make it easy for you to bring your online community together in real-life experiences that strengthen bonds and create lasting memories."
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
        {/* <meta
          name="twitter:site"
          data-react-helmet="true"
          content="@your_twitter_handle"
        /> */}
        <meta
          name="twitter:title"
          data-react-helmet="true"
          content="Groupgo | Home"
        />
        <meta
          name="twitter:description"
          data-react-helmet="true"
          content="GroupGo was built by creators, for creators. We understand the importance of building an online community, but sometimes the best connections happen offline. We make it easy for you to bring your online community together in real-life experiences that strengthen bonds and create lasting memories."
        />
        <meta
          name="twitter:image"
          data-react-helmet="true"
          content="https://groupgo.vercel.app/site_img.png"
        />
        <meta
          name="pinterest:description"
          data-react-helmet="true"
          content="GroupGo was built by creators, for creators. We understand the importance of building an online community, but sometimes the best connections happen offline. We make it easy for you to bring your online community together in real-life experiences that strengthen bonds and create lasting memories."
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
          content="GroupGo was built by creators, for creators. We understand the importance of building an online community, but sometimes the best connections happen offline. We make it easy for you to bring your online community together in real-life experiences that strengthen bonds and create lasting memories."
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
          center
        />

        <HomeProcessSection src="/about.svg">
          <h3>Who are we?</h3>
          <p>
            GroupGo was built by creators, for creators. We understand the
            importance of building an online community, but sometimes the best
            connections happen offline. We make it easy for you to bring your
            online community together in real-life experiences that strengthen
            bonds and create lasting memories.
          </p>
        </HomeProcessSection>
      </div>
      <div>
        <SectionTitle
          title="How it works"
          btnText="Planning Events Simplified."
          center
        />
        <HomeProcessSection src="/template.svg" reverse>
          <h3>Find Your Perfect Template</h3>
          <p>
            Browse our event templates for Restaurant ideas, Sports lovers,
            Group tours & more. Plan the perfect outing in a minute
          </p>
        </HomeProcessSection>
        <HomeProcessSection src="/customise.svg">
          <h3>Customize Your Event</h3>

          <p className="my-2">Customise every detail of your event</p>
          <p className="my-2">
            Our user-friendly form lets you
            <ul>
              <li>Set the scene (date, time, location)</li>
              <li>Craft your event description</li>
              <li>Offered tiered tickets (optional)</li>
              <li>Add event links (website, socials, booking)</li>
            </ul>
          </p>
        </HomeProcessSection>
        <HomeProcessSection src="/payment.svg" reverse>
          <h3>Seamless Payments</h3>
          <p>
            Creators can now focus on creating amazing experiences. GroupGo
            integrates securely with truste payment providers, so you can accept
            payments with ease and get your funds delivered straight to your
            preferred account. No more juggling screenshots and bank apps
          </p>
        </HomeProcessSection>
        <HomeProcessSection src="/share.svg">
          <h3>Share</h3>
          <p>
            Groupgo makes group outinh simple. Create and share details of your
            event with your online community across different social platforms
          </p>
        </HomeProcessSection>
        <HomeProcessSection src={"/bonus.svg"} reverse>
          <SectionTitle
            title="Bonus Features"
            btnText="Dashboard"
          ></SectionTitle>
          <p>
            Manage all your created events in one place. Track RSVPs, ticket
            sales and communicate seamlessly with your group
          </p>
        </HomeProcessSection>
      </div>
      {/* CTA */}
      <div className="flex flex-wrap items-center gap-8 pt-16">
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
