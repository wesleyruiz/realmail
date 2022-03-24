import React, { useState } from 'react';
import './index.css';
import { render } from 'react-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import services from '@demo/services';
import { Loading } from '@demo/components/loading';
import { Message } from '@arco-design/web-react';
import { UserStorage } from '@demo/utils/user-storage';
import { useHistory } from 'react-router-dom';
import App from '@demo/App';

const firebaseConfig = {
  apiKey: 'AIzaSyAPWVdnDxEmk84Njr1FLXWcTvY-wTTXDqA',
  authDomain: 'easy-email-5e11f.firebaseapp.com',
  projectId: 'easy-email-5e11f',
  storageBucket: 'easy-email-5e11f.appspot.com',
  messagingSenderId: '249888489838',
  appId: '1:249888489838:web:252b3ca9db550231bf817f',
  measurementId: 'G-DB2D2Z3SF3'
};


initializeApp(firebaseConfig);



export default function Login() {
  const [isLoading, setIsLoading] = useState(false);



  const onClick = (type: string) => {

    let provider;
    switch (type) {
      case 'google':
        provider = new GoogleAuthProvider();
        break;
      case 'github':
        provider = new GithubAuthProvider();
        break;
    }

    if (provider) {
      const auth = getAuth();

      signInWithPopup(auth, provider)
        .then((result) => {
          auth.currentUser?.getIdToken(/* forceRefresh */ true)
            .then(async (idToken) => {
              setIsLoading(true);

              try {
                const user = await services.user.login(idToken);

                UserStorage.setToken(user.token);
                render(<App />, document.getElementById('root'));
              } catch (error: any) {
                Message.error(error?.message || error);
              } finally {
                setIsLoading(false);
              }
            });
        });

    }
  };

  return <div
    style={{
      backgroundImage: 'url(https://assets.maocanhua.cn/b17646b5-4142-4bb5-93e0-e9c00707f89e-image.png)', backgroundRepeat: 'no-repeat',
      backgroundSize: '100% '
    }}>

    <div className="container-login100">
      <div className="wrap-login100">
        <form className="login100-form validate-form">
          <span className="login100-form-title p-b-49">
            Login
          </span>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 50
          }}>
            <Loading loading={isLoading}>
              <a onClick={() => onClick('github')} data-type="github" className="login-btn login100-social-item bg1">
                <i className="fa fa-github"></i>
              </a>
              <span>&emsp;</span>
              <a onClick={() => onClick('google')} data-type="google" className="login-btn login100-social-item bg3">
                <i className="fa fa-google"></i>
              </a>
            </Loading>
          </div>

        </form>
      </div>
    </div>

    <script type="module" src="/client/main.tsx"></script>
  </div>;
}

