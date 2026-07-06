import { getTranslations } from 'next-intl/server';
import SolutionsClient, { SolutionType } from './SolutionsClient';
import React from 'react';

export default async function Solutions() {
  const t = await getTranslations('Solutions');

  const solutionsList: SolutionType[] = [
    {
      id: 'unidirectional',
      category: t('categories.networkSecurity'),
      titlePrefix: t('items.unidirectional.titlePrefix'),
      titleHighlight: t('items.unidirectional.titleHighlight'),
      description: t('items.unidirectional.description'),
      protects: t('items.unidirectional.protects'),
      link: '/unidirectional-gateway',
      features: [
        {
          text: t('items.unidirectional.features.f1'),
          icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        },
        {
          text: t('items.unidirectional.features.f2'),
          icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        },
        {
          text: t('items.unidirectional.features.f3'),
          icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        },
        {
          text: t('items.unidirectional.features.f4'),
          icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        },
        {
          text: t('items.unidirectional.features.f5'),
          icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
        }
      ],
      image: `/svgler/server.svg`
    },
    {
      id: 'Secure Remote',
      category: t('categories.networkSecurity'),
      titlePrefix: t('items.secureRemote.titlePrefix'),
      titleHighlight: t('items.secureRemote.titleHighlight'),
      description: t('items.secureRemote.description'),
      protects: t('items.secureRemote.protects'),
      link: '/secure-remote-access',
      features: [
        { text: t('items.secureRemote.features.f1'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> },
        { text: t('items.secureRemote.features.f2'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> },
        { text: t('items.secureRemote.features.f3'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg> },
        { text: t('items.secureRemote.features.f4'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> },
        { text: t('items.secureRemote.features.f5'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> }
      ],
      image: `/svgler/trafoyeni.svg`
    },
    {
      id: 'sandbox',
      category: t('categories.fileSecurity'),
      titlePrefix: t('items.sandbox.titlePrefix'),
      titleHighlight: t('items.sandbox.titleHighlight'),
      description: t('items.sandbox.description'),
      protects: t('items.sandbox.protects'),
      link: '/sandbox',
      features: [
        { text: t('items.sandbox.features.f1'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> },
        { text: t('items.sandbox.features.f2'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
        { text: t('items.sandbox.features.f3'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg> },
        { text: t('items.sandbox.features.f4'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> },
        { text: t('items.sandbox.features.f5'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg> }
      ],
      image: `/svgler/robot.svg`
    },
    {
      id: 'media-transfer',
      category: t('categories.fileSecurity'),
      titlePrefix: t('items.mediaTransfer.titlePrefix'),
      titleHighlight: t('items.mediaTransfer.titleHighlight'),
      description: t('items.mediaTransfer.description'),
      protects: t('items.mediaTransfer.protects'),
      link: '/media-transfer-station',
      features: [
        { text: t('items.mediaTransfer.features.f1'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> },
        { text: t('items.mediaTransfer.features.f2'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> },
        { text: t('items.mediaTransfer.features.f3'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
        { text: t('items.mediaTransfer.features.f4'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="19" x2="6" y2="2"></line><line x1="10" y1="19" x2="10" y2="2"></line><line x1="14" y1="19" x2="14" y2="2"></line><line x1="18" y1="19" x2="18" y2="2"></line><path d="M22 22H2V19h20z"></path></svg> }
      ],
      image: `/svgler/server.svg`
    },
    {
      id: 'email-security',
      category: t('categories.emailSecurity'),
      titlePrefix: t('items.emailSecurity.titlePrefix'),
      titleHighlight: t('items.emailSecurity.titleHighlight'),
      description: t('items.emailSecurity.description'),
      protects: t('items.emailSecurity.protects'),
      link: '/email-security-platform',
      features: [
        { text: t('items.emailSecurity.features.f1'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> },
        { text: t('items.emailSecurity.features.f2'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
        { text: t('items.emailSecurity.features.f3'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> },
        { text: t('items.emailSecurity.features.f4'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> },
        { text: t('items.emailSecurity.features.f5'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> }
      ],
      image: `/svgler/walletcrypto.svg`
    },
    {
      id: 'intelroom',
      category: t('categories.dataSecurity'),
      titlePrefix: t('items.intelroom.titlePrefix'),
      titleHighlight: t('items.intelroom.titleHighlight'),
      description: t('items.intelroom.description'),
      protects: t('items.intelroom.protects'),
      link: '/intelroom',
      features: [
        { text: t('items.intelroom.features.f1'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> },
        { text: t('items.intelroom.features.f2'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> }
      ],
      image: `/svgler/server.svg`
    },
    {
      id: 'trucdr',
      category: t('categories.dataSecurity'),
      titlePrefix: t('items.trucdr.titlePrefix'),
      titleHighlight: t('items.trucdr.titleHighlight'),
      description: t('items.trucdr.description'),
      protects: t('items.trucdr.protects'),
      link: '/dfx-cdr',
      features: [
        { text: t('items.trucdr.features.f1'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> },
        { text: t('items.trucdr.features.f2'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> }
      ],
      image: `/svgler/robot.svg`
    },
    {
      id: 'portable-access',
      category: t('categories.otSecurity'),
      titlePrefix: t('items.portableAccess.titlePrefix'),
      titleHighlight: t('items.portableAccess.titleHighlight'),
      description: t('items.portableAccess.description'),
      protects: t('items.portableAccess.protects'),
      link: '/portx',
      features: [
        { text: t('items.portableAccess.features.f1'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> },
        { text: t('items.portableAccess.features.f2'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg> },
        { text: t('items.portableAccess.features.f3'), icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> }
      ],
      image: `/svgler/trafoyeni.svg`
    }
  ];

  return (
    <SolutionsClient 
      titlePrefix={t('titlePrefix')}
      titleHighlight={t('titleHighlight')}
      subtitle={t('subtitle')}
      protectsTitle={t('protectsTitle')}
      goToProductLabel={t('goToProduct')}
      solutionsList={solutionsList}
    />
  );
}
