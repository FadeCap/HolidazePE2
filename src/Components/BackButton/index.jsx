import { useNavigate } from "react-router-dom";

const BackButton = ({ to, label = "Go Back", className = "" }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className={` text-black py-2 px-4 hover:bg-gray-200 rounded text-lg font-bold ${className}`}
    >
      {label}
    </button>
  );
};

export default BackButton;
