import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    // <div className="errorpage" id="error-page">
    //   <h1>Oops!</h1>
    //   <p>Sorry, an unexpected error has occurred.</p>
    //   <p>
    //     <i>{error.statusText || error.message}</i>
    //   </p>
    // </div>
    <Result
      style={{ minHeight: '100vh' }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={() => navigate('/')} type="primary">Back Home</Button>}
    />
  );
}