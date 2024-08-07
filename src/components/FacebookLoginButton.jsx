import FacebookLogin from '@greatsumini/react-facebook-login';

const FacebookLoginButton = () => {
    return (
        <FacebookLogin
            appId="862117099161328"
            onSuccess={(response) => {
                console.log('Login Success!', response);
            }}
            onFail={(error) => {
                console.log('Login Failed!', error);
            }}
            onProfileSuccess={(response) => {
                console.log('Get Profile Success!', response);
            }}
        />
    );
};

export default FacebookLoginButton;