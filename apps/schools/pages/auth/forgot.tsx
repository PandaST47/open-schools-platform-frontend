import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Dictionary } from '@reduxjs/toolkit'
import { ContainerPage } from '../_app'
import AuthLayout, { IAuthLayoutProps } from '../../domains/user/components/auth/containers/AuthLayout'
import { InputPhoneForm } from '../../domains/user/components/auth/sharedForms/InputPhoneForm'
import { ValidatePhoneForm } from '../../domains/user/components/auth/sharedForms/ValidatePhoneForm'
import { ResetForm } from '../../domains/user/components/auth/resetForm'
import { FormContainer } from '../../domains/user/components/auth/formContainer'
import { CENTRALIZED } from '../../domains/common/components/styles/constantStyles'
import { Row } from 'antd'
import { ResetDescription, ResetPhoneButtonLabel } from '../../domains/user/components/auth/constants/labels'
import { TabsAuthAction } from '../../domains/user/components/auth/headerActions'
import { FirebaseReCaptcha } from '../../domains/user/providers/firebaseReCaptchaProvider'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

const ResetPage: ContainerPage<IAuthLayoutProps> = (props) => {
    const [step, setStep] = useState('inputPhone')

    const steps: Dictionary<JSX.Element> = {
        inputPhone: (
            <>
                <TabsAuthAction currentActiveKey={RoutePath[AppRoutes.AUTH_REGISTER]} title={'Восстановление пароля'} />
                <InputPhoneForm
                    title={''}
                    onFinish={() => setStep('validatePhone')}
                    nextUrl={'forgot'}
                    buttonText={ResetPhoneButtonLabel}
                    description={ResetDescription}
                    disclaimer={''}
                />
            </>
        ),
        validatePhone: (
            <>
                <TabsAuthAction currentActiveKey={RoutePath[AppRoutes.AUTH_REGISTER]} title={'Восстановление пароля'} />
                <ValidatePhoneForm
                    onFinish={() => setStep('reset')}
                    onReset={() => {
                        setStep('inputPhone')
                        Router.push(RoutePath[AppRoutes.AUTH_FORGOT])
                    }}
                    onError={() => {
                        setStep('inputPhone')
                        Router.push(RoutePath[AppRoutes.AUTH_FORGOT])
                    }}
                />
            </>
        ),
        reset: (
            <>
                <TabsAuthAction currentActiveKey={RoutePath[AppRoutes.AUTH_REGISTER]} title={'Восстановление пароля'} />
                <ResetForm
                    onFinish={() => {}}
                    onError={() => {
                        setStep('inputPhone')
                        Router.push(RoutePath[AppRoutes.AUTH_FORGOT])
                    }}
                />
            </>
        ),
    }

    return (
        <>
            <Head>
                <title>Регистрация</title>
            </Head>
            <Row className={CENTRALIZED}>
                <FirebaseReCaptcha>
                    <FormContainer>{steps[step]}</FormContainer>
                </FirebaseReCaptcha>
            </Row>
        </>
    )
}

ResetPage.container = AuthLayout
export default ResetPage
