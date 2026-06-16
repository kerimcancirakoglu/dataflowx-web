'use client';

import { useEffect, useState } from 'react';
import PdfLeadModal from '@/components/PdfLeadModal/PdfLeadModal';

interface Props {
  documentName: string;
  fileUrl?: string;
}

export default function LeadModalTrigger({ documentName, fileUrl }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Tüm sayfa tıklamalarını dinleyip sadece .downloadBtn sınıfına sahip butonları yakalayacağız
    // Çünkü içerik WordPress'ten veya HTML string olarak (dangerouslySetInnerHTML) geliyor.
    const handleDownloadClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.downloadBtn')) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleDownloadClick);
    return () => document.removeEventListener('click', handleDownloadClick);
  }, []);

  return (
    <PdfLeadModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={() => setIsOpen(false)}
      documentName={documentName}
      fileUrl={fileUrl}
    />
  );
}
