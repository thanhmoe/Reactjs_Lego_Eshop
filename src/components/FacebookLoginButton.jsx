import FacebookLogin from '@greatsumini/react-facebook-login';

const FacebookLoginButton = ({ onSuccess, onFail }) => {
    return (
        <FacebookLogin
            appId="862117099161328"
            onSuccess={onSuccess}
            onFail={onFail}
            onProfileSuccess={(response) => {
                console.log('Get Profile Success!', response);
            }}
        />
    );
};

export default FacebookLoginButton;