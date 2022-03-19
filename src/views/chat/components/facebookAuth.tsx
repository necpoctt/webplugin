import { initToken } from '../../../features/messageSlice';

declare global {
  interface Window {
    FB: any;
  }
}

const FacebookAuth = (props: { onSignIn: () => void }) => {
  const getUserProfile = () =>
    new Promise((resolve, reject) => {
      window.FB.api('/me?fields=email,picture,name', (response: any) => {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    });

  const logInFB = () => {
    window.FB.init({
      appId: '637672583101659',
      xfbml: false,
      version: 'v8.0',
    });

    return new Promise((resolve, reject) => {
      window.FB.login(
        (res: any) => {
          if (res.authResponse) {
            getUserProfile()
              .then((profile: any) => {
                const user = {
                  authResponse: res.authResponse,
                  name: profile.name,
                  pictureUrl: profile.picture.data.url,
                  email: profile.email.toLowerCase(),
                };
                resolve(user);
              })
              .catch(e => {
                reject(e);
              });
          } else {
            reject();
          }
        },
        {
          scope: 'public_profile, email',
        },
      );
    });
  };

  const signIn = async () => {
    const currentUser: any = JSON.parse(localStorage.getItem('super8') || '{}');
    const res: any = await logInFB();
    await initToken({
      authData: {
        facebook: {
          id: res.authResponse.userID,
          accessToken: res.authResponse.accessToken,
        },
      },
      uid: currentUser.uid,
    });
    props.onSignIn();
  };

  return (
    <button type="button" onClick={signIn}>
      fb login
    </button>
  );
};

export default FacebookAuth;
