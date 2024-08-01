import React from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export default function LanguageDropdown() {
    const { t } = useTranslation(['common']);

    const userMenuItems = [
        {
            key: '1',
            label: (
                <div className="countryName" onClick={() => i18next.changeLanguage('en')}>
                    <img className="countryFlag" src="/assets/usa.png" alt="usa" />
                    <span>{t('English')}</span>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className="countryName" onClick={() => i18next.changeLanguage('vi')}>
                    <img className="countryFlag" src="/assets/vietnam.png" alt="vietnam" />
                    <span>{t('Vietnamese')}</span>
                </div>
            ),
        },
    ];

    return (
        <Dropdown menu={{ items: userMenuItems }} className="language-dropdown">
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    {t('LANG')}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
}
