import { Bounce, toast } from "react-toastify";

const useToastMessage = () => {
  
  const ToastSuccess = (message: string) => {
     toast.success(message, {
       position: "top-right",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       transition: Bounce,
     }); 
  };

  const ToastError = (message: string | undefined ) => {
    toast.error(message, {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return {ToastSuccess,ToastError}
};

export default useToastMessage