'use client';

import { useEffect, useState } from 'react';
import PdfLeadModal from '@/components/PdfLeadModal/PdfLeadModal';

interface Props {
  documentName: string;
  fileUrl?: string;
}

export default function LeadModalTrigger({ documentName, fileUrl }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [resolvedFileUrl, setResolvedFileUrl] = useState<string | undefined>(fileUrl);

  useEffect(() => {
    const handleDownloadClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('.downloadBtn') as HTMLAnchorElement | null;
      if (btn) {
        e.preventDefault();
        // Static fileUrl prop takes priority; otherwise capture the link's own href
        setResolvedFileUrl(fileUrl ?? btn.href ?? undefined);
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleDownloadClick);
    return () => document.removeEventListener('click', handleDownloadClick);
  }, [fileUrl]);

  return (
    <PdfLeadModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={() => setIsOpen(false)}
      documentName={documentName}
      fileUrl={resolvedFileUrl}
    />
  );
}
