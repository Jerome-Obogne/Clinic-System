import Lottie from "lottie-react";
import Loading from "../../../public/image/Loading.json";
import styles from '../../features/auth/style.module.css'


interface SpinnerProps {
    height: number,
    width:number,
    isDefault :boolean

}


const Spinner = ({height,width,isDefault}:SpinnerProps) => {
  return (
    <div className={isDefault ? styles.default  : styles.spinner}>
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