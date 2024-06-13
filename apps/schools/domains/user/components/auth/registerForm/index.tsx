import { Col, Form, Row } from 'antd'
import React, { PropsWithChildren, useCallback, useContext, useState } from 'react'

import styles from '../styles/formStyles.module.scss'
import { ResponsiveCol } from '../containers/ResponsiveCol'
import { Input } from '@domains/common/components/input'
import { Button } from '@domains/common/components/button'
import { useRegisterFormValidators } from './hooks'
import { IRegisterFormProps } from './interfaces'
import { BUTTON_FORM_GUTTER_20 } from '../constants/styles'
import { FirebaseReCaptchaContext } from '@domains/user/providers/firebaseReCaptchaProvider'
import { registrationHandler } from '@domains/user/handlers/auth/register'
import { useUsersMutation } from '@domains/user/redux/userApi'

const RequiredFlagWrapper: React.FC<PropsWithChildren<any>> = (props) => {
    return <div className={styles.requiredField}>{props.children}</div>
}

export const RegisterForm: React.FC<IRegisterFormProps> = ({ onFinish, onError }) => {
    const validators = useRegisterFormValidators()

    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userRegistration] = useUsersMutation()
    const { phone } = useContext(FirebaseReCaptchaContext)
    const { signInByPhone } = /*useContext(AuthLayoutContext)*/ {
        signInByPhone: () => {},
    }
    const [sendEmail] = useUsersMutation();

    const registerComplete = useCallback(async () => {
        const { password } = form.getFieldsValue(['password'])
        await registrationHandler(phone, password, userRegistration, onFinish, onError, form, sendEmail)
    }, [form, signInByPhone])

    const initialValues = { phone }

    return (
        <Form
            form={form}
            name='register'
            onFinish={registerComplete}
            initialValues={initialValues}
            colon={false}
            requiredMark={true}
            layout='vertical'
            validateTrigger={['onBlur', 'onSubmit']}
        >
            <Row gutter={BUTTON_FORM_GUTTER_20} className={styles.rowStyles}>
                <ResponsiveCol span={24}>
                    <Row>
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item name='phone' label={'Телефон'} rules={validators.phone} validateFirst>
                                    <Input disabled={true} readOnly={true} />
                                </Form.Item>
                            </RequiredFlagWrapper>
                        </Col>
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item
                                    name='name'
                                    label={'ФИО'}
                                    rules={validators.name}
                                    data-cy='register-name-item'
                                    validateFirst
                                >
                                    <Input placeholder={'Иванов Сергей Владимирович'} />
                                </Form.Item>
                            </RequiredFlagWrapper>
                        </Col>
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item
                                    name='email'
                                    label={'Эл. почта'}
                                    rules={validators.email}
                                    data-cy='register-email-item'
                                    validateFirst
                                >
                                    <Input
                                        autoComplete='chrome-off'
                                        placeholder={'email@example.com'}
                                    />
                                </Form.Item>
                            </RequiredFlagWrapper>
                        </Col>
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item
                                    name='password'
                                    label={'Придумайте пароль'}
                                    rules={validators.password}
                                    data-cy='register-password-item'
                                    validateFirst
                                >
                                    <Input customType={'inputPassword'} type={'password'} autoComplete='new-password' />
                                </Form.Item>
                            </RequiredFlagWrapper>
                        </Col>
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item
                                    name='confirm'
                                    label={'Повторите пароль'}
                                    dependencies={['password']}
                                    rules={validators.confirm}
                                    data-cy='register-confirmpassword-item'
                                    validateFirst
                                >
                                    <Input
                                        customType={'inputPassword'}
                                        value={confirmPassword}
                                        type={'password'}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Item>
                            </RequiredFlagWrapper>
                        </Col>
                    </Row>
                </ResponsiveCol>
                <ResponsiveCol span={24}>
                    <Form.Item>
                        <Button
                            key='submit'
                            type='schoolDefault'
                            htmlType='submit'
                            loading={isLoading}
                            block
                            data-cy='registercomplete-button'
                        >
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </ResponsiveCol>
            </Row>
        </Form>
    )
}
