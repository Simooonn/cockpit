import React, { useContext, useEffect } from 'react';
import {
  Avatar,
  Select,
  Dropdown,
  Menu,
  Message,
  Button,
} from '@arco-design/web-react';
import {
  IconLanguage,
  IconSettings,
  IconPoweroff,
} from '@arco-design/web-react/icon';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '@/store';
import { GlobalContext } from '@/context';
import useLocale from '@/utils/useLocale';
import Logo from '@/assets/metablox-logo.png';
import IconButton from './IconButton';
import Settings from '../Settings';
import styles from './index.module.less';
import defaultLocale from '@/locale';
// import useStorage from '@/utils/useStorage';
// import { generatePermission } from '@/routes';
import Image from 'next/image';
import { getUserInfo, userLoginOut } from '@/request/api';
import Link from 'next/link';
import { clearAccount } from '@/utils/function';
import Router from "next/router"
function Navbar({ show }: { show: boolean }) {
  const t = useLocale();
  function logout() {
    userLoginOut({}).then((res) => {
      const { code } = res;
      if (code == 200) {
        // clearAccount();
        // localStorage.setItem('userStatus', 'logout');
        // Router.push('/login');
      } else {
        Message.info(t['login.form.login.errMsg']);
      }
    });
  }
  if (!show) {
    return (
      <div className={styles['fixed-settings']}>
        <Settings
          trigger={
            <Button icon={<IconSettings />} type="primary" size="large" />
          }
        />
      </div>
    );
  }

  // const handleChangeRole = () => {
  //   const newRole = role === 'admin' ? 'user' : 'admin';
  //   setRole(newRole);
  // };

  const droplist = (
    <Menu>
      <Menu.Item key="setting">
        <Link href={`/personalCenter/settings`}>
          <div>
            <IconSettings className={styles['dropdown-icon']} />
            {t['label.personalCenter.settings']}
          </div>
        </Link>
      </Menu.Item>
      {/*<Divider style={{ margin: '4px 0' }} />*/}
      <Menu.Item key="logout" onClick={() => logout()}>
        <IconPoweroff className={styles['dropdown-icon']} />
        {t['navbar.logout']}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          {Logo && (
            <Image src={Logo ?? 'error.jpg'} alt="Picture of the author" />
          )}
        </div>
      </div>
      <ul className={styles.right}>
        <Settings />
          <li>
              <Link href={`/dashboard`}>
                  <div>
                      <IconSettings className={styles['dropdown-icon']} />
                      {t['label.personalCenter.settings']}
                  </div>
              </Link>
          </li>
      </ul>
    </div>
  );
}

export default Navbar;
