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
  const userInfo = useSelector((state: GlobalState) => state.userInfo);
  const dispatch = useDispatch();

  // const [_, setUserStatus] = useStorage('userStatus');
  // const [role, setRole] = useStorage('userRole', 'admin');

  const { setLang, lang } = useContext(GlobalContext);

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
  //
  // function onMenuItemClick(key) {
  //   if (key === 'logout') {
  //     logout();
  //   } else {
  //     Message.info(`You clicked ${key}`);
  //   }
  // }

  // useEffect(() => {
  //   dispatch({
  //     type: 'update-userInfo',
  //     payload: {
  //       userInfo: {
  //         ...userInfo,
  //         permissions: generatePermission(role),
  //       },
  //     },
  //   });
  // }, [role]);

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res.code === 200) {
        dispatch({
          type: 'update-userInfo',
          payload: { userInfo: res.data, loading: false },
        });
      }
    });
  }, []);

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
      {/*<Menu.SubMenu*/}
      {/*  key="role"*/}
      {/*  title={*/}
      {/*    <>*/}
      {/*      <IconUser className={styles['dropdown-icon']} />*/}
      {/*      <span className={styles['user-role']}>*/}
      {/*        {role === 'admin'*/}
      {/*          ? t['label.role.admin']*/}
      {/*          : t['label.role.user']}*/}
      {/*      </span>*/}
      {/*    </>*/}
      {/*  }*/}
      {/*>*/}
      {/*  <Menu.Item onClick={handleChangeRole} key="switch role">*/}
      {/*    <IconTag className={styles['dropdown-icon']} />*/}
      {/*    {t['label.switchRoles']}*/}
      {/*  </Menu.Item>*/}
      {/*</Menu.SubMenu>*/}
      <Menu.Item key="setting">
        <Link href={`/personalCenter/settings`}>
          <div>
            <IconSettings className={styles['dropdown-icon']} />
            {t['label.personalCenter.settings']}
          </div>
        </Link>
      </Menu.Item>
      {/*<Menu.SubMenu*/}
      {/*  key="more"*/}
      {/*  title={*/}
      {/*    <div style={{ width: 80 }}>*/}
      {/*      <IconExperiment className={styles['dropdown-icon']} />*/}
      {/*      {t['message.seeMore']}*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*>*/}
      {/*  <Menu.Item key="workplace">*/}
      {/*    <IconDashboard className={styles['dropdown-icon']} />*/}
      {/*    {t['label.dashboard.workplace']}*/}
      {/*  </Menu.Item>*/}
      {/*</Menu.SubMenu>*/}

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
        {/*<li>*/}
        {/*  <Input.Search*/}
        {/*    className={styles.round}*/}
        {/*    placeholder={t['navbar.search.placeholder']}*/}
        {/*  />*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <Select*/}
        {/*    triggerElement={<IconButton icon={<IconLanguage />} />}*/}
        {/*    options={[*/}
        {/*      { label: 'English', value: 'en-US' },*/}
        {/*      { label: '简体中文', value: 'zh-CN' },*/}
        {/*    ]}*/}
        {/*    value={lang}*/}
        {/*    triggerProps={{*/}
        {/*      autoAlignPopupWidth: false,*/}
        {/*      autoAlignPopupMinWidth: true,*/}
        {/*      position: 'br',*/}
        {/*    }}*/}
        {/*    trigger="hover"*/}
        {/*    onChange={(value) => {*/}
        {/*      setLang(value);*/}
        {/*      const nextLang = defaultLocale[value];*/}
        {/*      Message.info(`${nextLang['message.lang.tips']}${value}`);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <MessageBox>*/}
        {/*    <IconButton icon={<IconNotification />} />*/}
        {/*  </MessageBox>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <Tooltip*/}
        {/*    content={*/}
        {/*      theme === 'light'*/}
        {/*        ? t['settings.navbar.theme.toDark']*/}
        {/*        : t['settings.navbar.theme.toLight']*/}
        {/*    }*/}
        {/*  >*/}
        {/*    <IconButton*/}
        {/*      icon={theme !== 'dark' ? <IconMoonFill /> : <IconSunFill />}*/}
        {/*      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}*/}
        {/*    />*/}
        {/*  </Tooltip>*/}
        {/*</li>*/}
        {/*<Settings />*/}
        {/*{userInfo && (*/}
        {/*  <li>*/}
        {/*    <Dropdown droplist={droplist} position="br">*/}
        {/*      <Avatar size={32} style={{ cursor: 'pointer' }}>*/}
        {/*        <img*/}
        {/*          alt="avatar"*/}
        {/*          src={*/}
        {/*            userInfo.photoUrl ??*/}
        {/*            'https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png'*/}
        {/*          }*/}
        {/*        />*/}
        {/*      </Avatar>*/}
        {/*    </Dropdown>*/}
        {/*  </li>*/}
        {/*)}*/}
      </ul>
    </div>
  );
}

export default Navbar;
