// Sanity dokümanlarını en.json içeriğiyle otomatik doldurur.
// Kullanım: SANITY_API_WRITE_TOKEN="..." node scripts/seed-sanity.mjs

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const en = JSON.parse(readFileSync(join(__dirname, '../messages/en.json'), 'utf-8'));

const client = createClient({
  projectId: '15oto8dp',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ── homePage ────────────────────────────────────────────────────────────────

const h = en.Home.Hero;

const homePageDoc = {
  _id: 'homePage',
  _type: 'homePage',
  hero: {
    slides: [
      {
        _key: 'slide1',
        titlePrefix: h.slide1.titlePrefix,
        titleHighlight: h.slide1.titleHighlight,
        description: h.slide1.description,
        buttonText: h.slide1.buttonText,
        buttonLink: '#product',
      },
      {
        _key: 'slide2',
        titlePrefix: h.slide2.titlePrefix,
        titleHighlight: h.slide2.titleHighlight,
        description: h.slide2.description,
        buttonText: h.slide2.buttonText,
        buttonLink: '#solutions',
        features: [
          { _key: 'f1', text: h.slide2.f1 },
          { _key: 'f2', text: h.slide2.f2 },
          { _key: 'f3', text: h.slide2.f3 },
        ],
      },
    ],
  },
  seoTitle: 'DataFlowX (DFX) | Secure Critical Infrastructure via Unidirectional Gateway',
  seoDescription: 'Secure your critical network infrastructure with DataFlowX (DFX). EAL4+ certified unidirectional gateway, data diode, and email security solutions for zero-trust environments.',
};

// ── productPage: unidirectional-gateway ─────────────────────────────────────

const udg = en.UDGPage;

const udgDoc = {
  _id: 'product-unidirectional-gateway',
  _type: 'productPage',
  productName: 'DFX Unidirectional Gateway',
  slug: { _type: 'slug', current: 'unidirectional-gateway' },
  overview: {
    overTitle: udg.overviewOverTitle,
    title: udg.overviewTitle,
    description: udg.overviewDesc,
    infoBlocks: [
      { _key: 'ib1', label: udg.protectsLabel, text: udg.protectsText },
      { _key: 'ib2', label: udg.gartnerLabel, text: udg.gartnerText },
      { _key: 'ib3', label: udg.eal4Label, text: udg.eal4Text },
    ],
  },
  seoTitle: 'DataFlowX Unidirectional Gateway & Data Diode — OT/SCADA Security',
  seoDescription: 'DFX Unidirectional Gateway: EAL4+ certified hardware-enforced unidirectional gateway for OT/SCADA security. Physically isolates critical networks — recognized by Gartner for 3 consecutive years.',
};

// ── productPage: portx ───────────────────────────────────────────────────────

const portx = en.PortX;

const portxDoc = {
  _id: 'product-portx',
  _type: 'productPage',
  productName: 'DFX Portable Access Security System',
  slug: { _type: 'slug', current: 'portx' },
  hero: {
    overTitle: portx.hero.overTitle,
    title: 'Hardware-Based Zero Trust Data Bridge',
    subtitle: portx.hero.subtitle,
    primaryButtonText: portx.hero.reqDemo,
    primaryButtonLink: '/contact',
    secondaryButtonText: portx.hero.howItWorks,
    secondaryButtonLink: '#animation',
  },
  overview: {
    overTitle: portx.overview.overTitle,
    title: portx.overview.title,
    description: portx.overview.desc,
    infoBlocks: [
      { _key: 'ib1', label: portx.overview.c1.label, text: portx.overview.c1.text },
      { _key: 'ib2', label: portx.overview.c2.label, text: portx.overview.c2.text },
      { _key: 'ib3', label: portx.overview.c3.label, text: portx.overview.c3.text },
    ],
  },
  seoTitle: 'DFX Portable Access Security System | Hardware-Based Zero Trust Data Bridge',
  seoDescription: 'Eliminate the USB Risk. Keep the Workflow. DFX Portable Access Security System is a hardware-based Zero Trust secure data bridge purpose-built for industrial and operational environments.',
};

// ── productPage: sandbox ─────────────────────────────────────────────────────

const sandbox = en.Sandbox.page;

const sandboxDoc = {
  _id: 'product-sandbox',
  _type: 'productPage',
  productName: 'DFX Malware Mitigation Sandbox',
  slug: { _type: 'slug', current: 'sandbox' },
  overview: {
    overTitle: sandbox.overviewOverTitle,
    title: sandbox.overviewTitle,
    description: sandbox.overviewDesc,
    infoBlocks: [
      { _key: 'ib1', label: sandbox.isoLabel, text: sandbox.isoText },
      { _key: 'ib2', label: sandbox.intLabel, text: sandbox.intText },
      { _key: 'ib3', label: sandbox.contentLabel, text: sandbox.contentText },
    ],
  },
  features: {
    overTitle: sandbox.keyCapabilitiesLabel,
    title: sandbox.keyCapabilitiesTitle,
  },
  seoTitle: 'DFX Malware Mitigation Sandbox — AI-Powered Threat Detection',
  seoDescription: 'AI-powered sandbox detonating suspicious files in isolated VMs. YARA, MITRE ATT&CK integration. Zero-day threat prevention for OT/ICS networks.',
};

// ── productPage: dfx-cdr ─────────────────────────────────────────────────────

const cdr = en['DFX CDR'];

const cdrDoc = {
  _id: 'product-dfx-cdr',
  _type: 'productPage',
  productName: 'DFX CDR — Content Disarm & Reconstruction',
  slug: { _type: 'slug', current: 'dfx-cdr' },
  hero: {
    overTitle: cdr.hero.overTitle,
    title: 'TrueCDR™',
    subtitle: cdr.hero.subtitle,
    primaryButtonText: cdr.hero.reqDemo,
    primaryButtonLink: '#contact',
    secondaryButtonText: cdr.hero.reviewOpts,
    secondaryButtonLink: '#use-cases',
  },
  features: {
    overTitle: cdr.features.label,
    title: cdr.features.title,
    description: cdr.features.desc,
    items: [
      { _key: 'f1', title: cdr.features.f1.label, description: cdr.features.f1.text },
      { _key: 'f2', title: cdr.features.f2.label, description: cdr.features.f2.text },
      { _key: 'f3', title: cdr.features.f3.label, description: cdr.features.f3.text },
      { _key: 'f4', title: cdr.features.f4.label, description: cdr.features.f4.text },
      { _key: 'f5', title: cdr.features.f5.label, description: cdr.features.f5.text },
      { _key: 'f6', title: cdr.features.f6.label, description: cdr.features.f6.text },
    ],
  },
  seoTitle: 'DFX CDR — Content Disarm & Reconstruction Platform',
  seoDescription: 'DFX CDR neutralizes file-borne threats before they reach your users. A reconstruction-first security control that disarms weaponized content and delivers safe, usable files.',
};

// ── productPage: email-security-platform ────────────────────────────────────

const esp = en.EmailSecurity.page;

const emailSecurityDoc = {
  _id: 'product-email-security-platform',
  _type: 'productPage',
  productName: 'DFX Email Security Platform',
  slug: { _type: 'slug', current: 'email-security-platform' },
  overview: {
    overTitle: esp.overviewOverTitle,
    title: esp.overviewTitle,
    description: esp.overviewDesc,
    infoBlocks: [
      { _key: 'ib1', label: esp.aiLabel, text: esp.aiText },
      { _key: 'ib2', label: esp.cdrLabel, text: esp.cdrText },
      { _key: 'ib3', label: esp.retroLabel, text: esp.retroText },
    ],
  },
  seoTitle: 'DFX Email Security Platform — AI-Powered Threat Detection & CDR',
  seoDescription: 'DFX Email Security Platform: AI behavioral detection, deep CDR, and retrospective scanning. Zero Trust email gateway protecting critical infrastructure from phishing, BEC, and zero-day malware.',
};

// ── productPage: secure-remote-access ────────────────────────────────────────

const sra = en.SRA.page;

const secureRemoteAccessDoc = {
  _id: 'product-secure-remote-access',
  _type: 'productPage',
  productName: 'DFX Secure Remote Access',
  slug: { _type: 'slug', current: 'secure-remote-access' },
  overview: {
    overTitle: sra.overviewOverTitle,
    title: sra.overviewTitle,
    description: sra.overviewDesc,
    infoBlocks: [
      { _key: 'ib1', label: sra.ztnaLabel, text: sra.ztnaText },
      { _key: 'ib2', label: sra.contentLabel, text: sra.contentText },
      { _key: 'ib3', label: sra.sandboxLabel, text: sra.sandboxText },
    ],
  },
  seoTitle: 'DFX Secure Remote Access — Zero Trust Cross-Domain Solution',
  seoDescription: 'DFX Secure Remote Access: request-response based secure remote access across isolated OT/IT networks. Zero Trust architecture with Active Directory integration and ICAP sandbox support.',
};

// ── productPage: media-transfer-station ──────────────────────────────────────

const mts = en.MTS.page;

const mediaTransferStationDoc = {
  _id: 'product-media-transfer-station',
  _type: 'productPage',
  productName: 'DFX Media Transfer Station',
  slug: { _type: 'slug', current: 'media-transfer-station' },
  overview: {
    overTitle: mts.overviewOverTitle,
    title: mts.overviewTitle,
    description: mts.overviewDesc,
    infoBlocks: [
      { _key: 'ib1', label: mts.protectsLabel, text: mts.protectsText },
      { _key: 'ib2', label: mts.industryLabel, text: mts.industryText },
      { _key: 'ib3', label: mts.advLabel, text: mts.advText },
    ],
  },
  features: {
    overTitle: mts.keyCapabilitiesLabel,
    title: mts.keyCapabilitiesTitle,
  },
  seoTitle: 'DFX Media Transfer Station — Secure USB & Removable Media Sanitization',
  seoDescription: 'DFX Media Transfer Station: secure kiosk for USB and removable media sanitization using multi-engine AV and CDR. Prevents physical malware attacks on critical infrastructure.',
};

// ── productPage: intelroom ────────────────────────────────────────────────────

const intel = en.IntelRoom.page;

const intelroomDoc = {
  _id: 'product-intelroom',
  _type: 'productPage',
  productName: 'DFX IntelRoom',
  slug: { _type: 'slug', current: 'intelroom' },
  hero: {
    title: `${intel.heroTitle1} ${intel.heroTitle2}${intel.heroTitle3}`,
    subtitle: intel.heroSubtitle,
    primaryButtonText: intel.btn,
    primaryButtonLink: '#contact',
  },
  overview: {
    overTitle: intel.compLabel,
    title: intel.compTitle,
    description: intel.compDesc,
    infoBlocks: [
      { _key: 'ib1', label: intel.whoLabel, title: intel.whoTitle, text: intel.whoDesc },
    ],
  },
  features: {
    overTitle: intel.expLabel,
    title: intel.expTitle,
    description: intel.expDesc,
    items: [
      { _key: 'f1', title: intel.p1Title, description: intel.p1Desc },
      { _key: 'f2', title: intel.p2Title, description: intel.p2Desc },
      { _key: 'f3', title: intel.p3Title, description: intel.p3Desc },
    ],
  },
  seoTitle: 'DFX IntelRoom — Live Threat Intelligence Organism',
  seoDescription: 'DFX IntelRoom: Analyzes billions of signals, establishes context, and generates actionable decisions. Advanced Threat Intelligence platform for SOC, CISO, and MSSP.',
};

// ── Çalıştır ─────────────────────────────────────────────────────────────────

const docs = [
  homePageDoc,
  udgDoc,
  portxDoc,
  sandboxDoc,
  cdrDoc,
  emailSecurityDoc,
  secureRemoteAccessDoc,
  mediaTransferStationDoc,
  intelroomDoc,
];

console.log(`${docs.length} doküman Sanity'e yazılıyor...`);

for (const doc of docs) {
  const result = await client.createOrReplace(doc);
  console.log(`✅ ${result._id}`);
}

console.log('\n🎉 Seed tamamlandı!');
