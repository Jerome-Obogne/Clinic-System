import { memo } from "react";
import Spinner from "./Spinner";

type BtnSubmissionProps ={
    isSubmitting: boolean,
    children: React.ReactNode
}
const ButtonSubmission = ({isSubmitting = false,children}: BtnSubmissionProps) => {
  return (
    <>
      {isSubmitting ? (
        <Spinner isDefault={false} height={20} width={20} />
      ) : (
        children
      )}
    </>
  );
}

export default memo(ButtonSubmission)