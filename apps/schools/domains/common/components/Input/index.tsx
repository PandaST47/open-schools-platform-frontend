import { Input as BaseInput } from 'antd'
import React from 'react'
import defaultStyles from './styles/default.module.scss'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { typeInput } from '../../constants/Input'
import { CustomInputProps, inputStyleDictionary } from './interfaces'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

const INPUT_PHONE_STYLE: React.CSSProperties = {
    width: '100%',
    height: 48,
    borderRadius: 12,
    borderColor: '#D9D9D9',
}
const BUTTON_INPUT_PHONE_STYLE: React.CSSProperties = {
    margin: 5,
    backgroundColor: '#E6E8F1',
    border: 0,
    borderRadius: 8,
}

export const Input: React.FC<CustomInputProps> = (props) => {
    const {
        disabled = false,
        customType = 'inputDefault',
        placeholder,
        label,
        ...restProps
    } = props

    if (!typeInput.includes(customType)) {
        return (
            <div className={defaultStyles.inputContainer}>
                <label>{label}</label>
                <BaseInput
                    className={defaultStyles.input}
                    placeholder={placeholder}
                    data-testid="input"
                    {...restProps}
                />
            </div>
        )
    } else if (customType === 'inputPhone') {
        return (
            <div className={defaultStyles.inputContainer}>
                <label>{label}</label>
                <PhoneInput
                    onChange={(value, data, event, formattedValue) => {
                        if (typeof restProps.onChange === 'function') {
                            restProps.onChange(event)
                        }
                    }}
                    disabled={disabled}
                    country={'ru'}
                    placeholder={placeholder}
                    buttonStyle={BUTTON_INPUT_PHONE_STYLE}
                    inputStyle={INPUT_PHONE_STYLE}
                />
            </div>
        )
    } else if (customType === 'inputPassword') {
        return (
            <div className={defaultStyles.inputContainer}>
                <label>{label}</label>
                <BaseInput.Password
                    iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    className={defaultStyles.input}
                    placeholder={placeholder}
                    data-testid="password-input"
                    {...restProps}
                />
            </div>
        )}
    else {
        return (
            <div className={inputStyleDictionary[customType]?.inputContainer}>
                <label>{label}</label>
                <BaseInput
                    className={inputStyleDictionary[customType]?.input}
                    {...restProps}
                    placeholder={placeholder}
                    data-testid="input"
                />
            </div>
        )
    }
}