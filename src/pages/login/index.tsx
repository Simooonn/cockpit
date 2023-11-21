import React, { useEffect } from 'react';
import Footer from '@/components/Footer';
import Logo from '@/assets/metablox-logo.png';
import LoginForm from './form';
import styles from './style/index.module.less';
import Image from 'next/image';

function Login() {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'dark');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        {Logo && <Image src={Logo ?? 'error.jpg'}></Image>}
        {/*<div className={styles['logo-text']}>Metablox Admin</div>*/}
      </div>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
Login.displayName = 'LoginPage';

export default Login;
