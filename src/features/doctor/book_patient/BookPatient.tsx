
import { useParams } from 'react-router';
import { AppointmentForm } from './Components';


const BookPatient = () => {
  const { userId } = useParams();
  console.log("id", userId);

  return (
    <>
      <div>
        {userId ? <div>1</div> : <div>2</div>}
        <AppointmentForm/>
      </div>
    </>
  );
}

export default BookPatient
