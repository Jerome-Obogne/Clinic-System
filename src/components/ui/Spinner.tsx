import Lottie from "lottie-react";
import Loading from "../../../public/image/Loading.json";

interface SpinnerProps {
    divHeight?: string,
    height: number,
    width:number

}

const Spinner = ({divHeight,height,width}:SpinnerProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `${divHeight || '100vh' } `, // full screen height
      }}
    >
      <Lottie
        animationData={Loading}
        loop
        autoPlay
        style={{ width: `${width}`, height: `${height}` }}
      />
    </div>
  );
}

export default Spinner