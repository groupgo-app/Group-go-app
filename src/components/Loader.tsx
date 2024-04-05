import loader from "../assets/images/orange-loader.svg";
const Loader = () => {
  return (
    <div className="my-[56px] flex w-full items-center justify-center">
      <img width={48} src={loader} alt="" />
    </div>
  );
};

export default Loader;
