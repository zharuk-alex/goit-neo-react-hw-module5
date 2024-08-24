import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Btn from "components/Btn/Btn";

const BackBtn = ({ locationState }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(locationState);
  };

  return (
    <Btn onClick={handleBack}>
      <MdArrowBack /> Go Back
    </Btn>
  );
};

export default BackBtn;
