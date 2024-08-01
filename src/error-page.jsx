import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Result, Button } from "antd";
export default function ErrorPage() {
  const navigate = useNavigate()
  const { t } = useTranslation(['common'])
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
      subTitle={t("Page_Not_Exist")}
      extra={<Button onClick={() => navigate('/')} type="primary">{t('Back_Home_Btn')}</Button>}
    />
  );
}