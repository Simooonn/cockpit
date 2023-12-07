import React from 'react'
import {
    Menu,
    Message,
    Button,
} from '@arco-design/web-react'
import {
    IconSettings,
    IconPoweroff,
} from '@arco-design/web-react/icon'
import useLocale from '@/utils/useLocale'
import Logo from '@/assets/metablox-logo.png'
import Settings from '../Settings'
import styles from './index.module.less'
// import useStorage from '@/utils/useStorage';
// import { generatePermission } from '@/routes';
import Image from 'next/image'
import { userLoginOut } from '@/request/api'
import Link from 'next/link'
function Navbar({ show }: { show: boolean }) {
    const t = useLocale()
    function logout() {
        userLoginOut({}).then((res) => {
            const { code } = res
            if (code == 200) {
                // clearAccount();
                // localStorage.setItem('userStatus', 'logout');
                // Router.push('/login');
            } else {
                Message.info(t['login.form.login.errMsg'])
            }
        })
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
        )
    }

    // const handleChangeRole = () => {
    //   const newRole = role === 'admin' ? 'user' : 'admin';
    //   setRole(newRole);
    // };

    const droplist = (
        <Menu>
            <Menu.Item key="setting">
                <Link href={'/personalCenter/settings'}>
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
    )

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
                <li>
                    <Link href={'/dashboard'}>dashboard</Link>
                </li>
                <li>
                    <Link href={'https://explorer.metablox.io/staking/#/staking'}>staking</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
