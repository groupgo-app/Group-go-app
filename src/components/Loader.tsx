import orangeLoader from "../assets/images/orange-loader.svg";
import loader from "../assets/images/loader.svg";

const Loader = ({ variant = "large" }: { variant?: "small" | "large" }) => {
  if (variant == "small") {
    return (
      <>
        <img src={loader} />
      </>
    );
  } else {
    return (
      <div className="my-[56px] flex w-full items-center justify-center">
        <img width={48} src={orangeLoader} alt="" />
      </div>
    );
  }
};

export default Loader;
