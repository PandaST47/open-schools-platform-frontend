import React, { useState } from 'react'
import { Button, Modal, Select, SelectProps } from 'antd'
import styles from './styles/styles.module.scss'
import { useGetAllOrganizationsQuery } from '../../../../../organization/redux/organizationApi'
import { useOrganization } from 'domains/user/providers/organizationProvider'
import { OrganizationSelectProps, SuffixIconProps } from './interfaces'
import { SELECT_LIST_HEIGHT } from './constants'
import { DownOutlined, PlusCircleOutlined, UpOutlined } from '@ant-design/icons'
import { DROPDOWN_STYLE } from './styles/styles'

const { Option } = Select

const COLLAPSED_SELECT_STYLE = { height: '35px', width: '35px' }
const COLLAPSED_SUFFIX_ICON = { fontSize: '125%' }
const CREATE_BUTTON_STYLE = { height: '35px', width: '35px' }

const SuffixIcon: React.FC<SuffixIconProps> = (props) => {
    const { collapsed, isOpen } = props

    return (
        <div
            className={styles.suffixIcon}
            style={collapsed ? COLLAPSED_SUFFIX_ICON : {}}
        >
            {isOpen ? <UpOutlined /> : <DownOutlined />}
        </div>
    )
}

export const OrganizationSelect: React.FC<OrganizationSelectProps> = (
    props
) => {
    const { collapsed } = props
    const { isLoading, data } = useGetAllOrganizationsQuery({})
    const { organization, organizationId, setOrganizationId } =
        useOrganization()
    const [isOpen, setIsOpen] = useState(false)

    const [isModalVisible, setIsModalVisible] = useState(false)

    const ORGANIZATION_SELECT_SHOW_ACTIONS: SelectProps<string>['showAction'] =
        ['focus', 'click']

    const organizationCookieChange = (value: string) => {
        setOrganizationId(value)
        window.location.reload()
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    return (
        <div className={styles.container}>
            {organizationId === '' ? (
                <Button
                    icon={<PlusCircleOutlined />}
                    className={styles.createButton}
                    onClick={showModal}
                    style={collapsed ? CREATE_BUTTON_STYLE : {}}
                >
                    {collapsed ? '' : 'Создать организацию'}
                </Button>
            ) : (
                <Select
                    className={styles.select}
                    loading={isLoading}
                    size={'middle'}
                    open={isOpen}
                    listHeight={SELECT_LIST_HEIGHT}
                    optionFilterProp="children"
                    showAction={ORGANIZATION_SELECT_SHOW_ACTIONS}
                    autoFocus={true}
                    onClick={() => setIsOpen(!isOpen)}
                    style={collapsed ? COLLAPSED_SELECT_STYLE : {}}
                    dropdownStyle={DROPDOWN_STYLE}
                    dropdownRender={(menu) => (
                        <div className={styles.dropdown}>
                            {menu}
                            <Button
                                onClick={showModal}
                                className={styles.addButton}
                                icon={<PlusCircleOutlined />}
                            >
                                Создать организацию
                            </Button>
                        </div>
                    )}
                    onChange={organizationCookieChange}
                    suffixIcon={
                        <SuffixIcon collapsed={collapsed} isOpen={isOpen} />
                    }
                    value={
                        collapsed
                            ? ''
                            : organizationId
                            ? organization.name
                            : 'Создать организацию'
                    }
                >
                    {data?.results.map((organization) => (
                        <Option
                            className={styles.option}
                            data-cy={'organization-select-item'}
                            key={organization.id}
                            value={organization.id}
                            title={organization.name}
                        >
                            {organization.name}
                        </Option>
                    ))}
                    <Option style={{ display: 'none' }}>Empty</Option>
                </Select>
            )}
            <Modal
                className={styles.modal}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                {/*<CreateOrganization modalVisible={setIsModalVisible} />*/}
            </Modal>
        </div>
    )
}
