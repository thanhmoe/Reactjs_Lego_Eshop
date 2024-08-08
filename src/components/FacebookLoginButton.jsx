import FacebookLogin from '@greatsumini/react-facebook-login';

import { Button } from 'antd';
import {
    FacebookFilled
} from '@ant-design/icons';

const APPID = import.meta.env.VITE_FB_APP_ID

import { useTranslation } from 'react-i18next';

const FacebookLoginButton = ({ onSuccess, onFail }) => {
    const { t } = useTranslation(['login'])
    return (
        <FacebookLogin
            appId={APPID}
            onSuccess={onSuccess}
            onFail={onFail}
            onProfileSuccess={(response) => {
                console.log('Get Profile Success!', response);
            }}
            render={({ onClick }) => (
                <Button
                    icon={<FacebookFilled />}
                    onClick={onClick}
                    style={{
                        background: 'linear-gradient(45deg, #4267b2, #3b5998)',
                        color: '#fff',
                        marginTop: '2rem',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {t('Login_With_Facebook')}
                </Button>
            )}
        />

    );
};

export default FacebookLoginButton;