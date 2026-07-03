import { getTranslations } from 'next-intl/server';
import NavClient from './NavClient';

interface NavProps {
  hideMenu?: boolean;
}

export default async function Nav(props: NavProps) {
  const t = await getTranslations('Nav');

  const NAV_LINKS = [
    {
      label: t('solutions'),
      href: '#solutions',
      megaMenu: [
        {
          groupLabel: t('network_security'),
          items: [
            { label: t('unidirectional_gateway'), href: '/unidirectional-gateway' },
            { label: t('secure_remote_access'), href: '/secure-remote-access' },
          ]
        },
        {
          groupLabel: t('file_security'),
          items: [
            { label: t('sandbox'), href: '/sandbox' },
            { label: t('media_transfer_station'), href: '/media-transfer-station' },
          ]
        },
        {
          groupLabel: t('email_security'),
          items: [
            { label: t('email_security_platform'), href: '/email-security-platform' },
            { label: t('intelroom'), href: '/intelroom' },
            { label: t('true_cdr'), href: '/dfx-cdr' },
          ]
        },
        {
          groupLabel: t('ot_security'),
          items: [
            { label: t('portx'), href: '/portx' },
          ]
        }
      ],
    },
    {
      label: t('resources'),
      href: '/resources',
      submenu: [
        { label: t('resource_center'), href: '/resources' },
        { label: t('blog'), href: '/resources/blog' },
        { label: t('news'), href: '/news' },
      ],
    },
    { label: t('partners'), href: '/partners' },
    { label: t('about_us'), href: '/about-us' },
  ];

  return <NavClient {...props} navLinks={NAV_LINKS} contactLabel={t('contact')} />;
}
