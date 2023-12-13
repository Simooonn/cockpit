import React, { useState, ReactNode, useRef, useEffect } from 'react'
import { Layout, Spin } from '@arco-design/web-react'
import cs from 'classnames'


import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Footer from '../components/Footer'
import useRoute, { IRoute } from '@/routes'
import { GlobalState } from '@/store'
import getUrlParams from '@/utils/getUrlParams'
import styles from '@/style/layout.module.less'
import Workplace from '@/pages/dashboard'

const Content = Layout.Content

function PageLayout({ children }: { children: ReactNode }) {
    const urlParams = getUrlParams()
    const router = useRouter()
    const pathname = router.pathname
    const { userInfo, settings, userLoading } = useSelector((state: GlobalState) => state)
    const [ routes, defaultRoute ] = useRoute(userInfo?.permissions)
    const showNavbar = settings?.navbar && urlParams.navbar !== false
    const showFooter = settings?.footer && urlParams.footer !== false
    const routeMap = useRef<Map<string, ReactNode[]>>(new Map())
    const [ breadcrumb, setBreadCrumb ] = useState([])

    function renderRoutes() {
        routeMap.current.clear()
        return function travel(_routes: IRoute[], level, parentNode = []) {
            return _routes.map((route) => {
                routeMap.current.set(
                    `/${route.key}`,
                    breadcrumb ? [ ...parentNode, route.name ] : []
                )
            })
        }
    }


    const goToUrl = (url = '') => {
        window.location.href = url
        return
    }

    useEffect(() => {
        const routeConfig = routeMap.current.get(pathname)
        setBreadCrumb(routeConfig || [])
    }, [ pathname ])

    return (
        <Layout className={styles.layout}>
            <div
                className={cs(styles['layout-navbar'], {
                    [styles['layout-navbar-hidden']]: !showNavbar,
                })}
            >
                <header className={styles.aa1}>
                    <div style={{ cursor: 'pointer' }} onClick={() => goToUrl('https://explorer.metablox.io/')}>
                        <Image className={styles['aa1-logo']} width={235} height={60} src={'/logo-dark.png'} alt="logo" />
                    </div>
                    <div className={styles['aa1-nav-container']}>
                        <div>
                            <ul className={styles['aa1-nav-tab']}>
                                <li className={styles['aa1-nav-tab-li-active']}>Dashboard</li>
                                <li className={styles['aa1-nav-tab-li']} onClick={() => goToUrl('https://explorer.metablox.io/staking/#/staking')}>Staking</li>
                                <li className={styles['aa1-nav-tab-li']} onClick={() => goToUrl('https://explorer.metablox.io/nft/')}>Ranking</li>
                                <li className={styles['aa1-nav-tab-li']} onClick={() => goToUrl('https://explorer.metablox.io/nft/mynft')}>My NFT</li>
                            </ul>
                        </div>
                    </div>
                    <div className="opeartor-container">
                        <div className="opeartor base-color">Connect</div>
                    </div>
                </header>
                {/*<Navbar show={showNavbar} />*/}
            </div>
            {userLoading ? (
                <Spin className={styles['spin']} />
            ) : (
                <Layout>
                    {renderRoutes()(routes, 1)}
                    <Layout className={styles['layout-content']}>
                        <div className={styles['layout-content-wrapper']}>
                            {!!breadcrumb.length && (
                                <div className={styles['layout-breadcrumb']}></div>
                            )}

                            <Content className={styles['layout-content1']}>

                                {routeMap.current.has(pathname) ? children : <Workplace/>}
                            </Content>
                        </div>
                        {showFooter && <Footer />}
                    </Layout>
                </Layout>
            )}
        </Layout>
    )
}

export default PageLayout
