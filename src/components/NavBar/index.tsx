import React from 'react'
import {
    Button,
} from '@arco-design/web-react'
import {
    IconSettings,
} from '@arco-design/web-react/icon'
import Logo from '@/assets/metablox-logo.png'
import Settings from '../Settings'
import styles from './index.module.less'
import Image from 'next/image'
import Link from 'next/link'
function Navbar({ show }: { show: boolean }) {

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
