import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();

  return <div>{id}번째 페이지</div>;
};

export default DetailPage;