import store from '../store/store'
import '../domains/common/components/styles/global.scss'
import 'antd/dist/antd.css'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { AuthProvider } from '../domains/user/providers/authProvider'
import React, { PropsWithChildren } from 'react'
import Head from 'next/head'
import BaseLayout from "../domains/common/components/containers/BaseLayoutComponents/BaseLayout";
import {OrganizationProvider} from "../domains/user/providers/organizationProvider";


export interface ContainerPage<PropsType> extends React.FC {
    container: React.FC<PropsType>
}

interface CustomAppProps extends AppProps {
    Component: ContainerPage<PropsWithChildren>
}


function MyApp ({ Component, pageProps }: CustomAppProps): JSX.Element {
    const LayoutComponent = Component.container || BaseLayout

    return (
        <Provider store={store}>
            <AuthProvider>
                <OrganizationProvider>
                    <Head>
                        <title>Открытые школы</title>
                        <link rel="icon" href="/icons/logo.svg" sizes="any" />
                    </Head>
                    <LayoutComponent>
                        <Component {...pageProps} />
                    </LayoutComponent>
                </OrganizationProvider>
            </AuthProvider>
        </Provider>
    )
}

export default MyApp
