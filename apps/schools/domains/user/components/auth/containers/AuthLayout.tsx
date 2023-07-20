import { Row } from 'antd'
import React from 'react'
import styles from './styles/styles.module.scss'
import Link from 'next/link'
import logo from '@public/icons/logo.svg'
import Image from 'next/image'
import {AuthBackground} from "../authBackground";

export interface IAuthLayoutProps {
    headerAction: React.ReactElement,
    children: JSX.Element,
}

// #TODO: take this variables from env
const {
    publicRuntimeConfig: {
        HelpRequisites: {
            support_email: SUPPORT_EMAIL = null,
            support_phone: SUPPORT_PHONE = null,
        },
    },
} /* = getConfig() */ = {
    publicRuntimeConfig: {
        HelpRequisites: {
            support_email: 'openschools@education',
            support_phone: '+79999999999',
        },
    },
}

const AuthLayout: React.FC<IAuthLayoutProps> = (props) => {
    const { children, ...otherProps } = props
    return (
        <div
            className={styles.container}
        >
            <AuthBackground/>
            {/*# TODO: add env for link there */}
            <Link className={styles.logoContainer} href={''}>
                <Row className={styles.rowWithGap}>
                    <Image src={logo} alt={'Логотип'} width={50}></Image>
                    <div className={styles.logoText}>
                        Открытые<br/>
                        школы
                    </div>
                </Row>
            </Link>
            {children}
            {/*# TODO: add env for email there */}
            <Link className={styles.emailContainer} href={'mailto:help@openschools.education'}>
                <div className={styles.emailText}>
                    help@openschools.education
                </div>
            </Link>
        </div>
    )
}

export default AuthLayout
