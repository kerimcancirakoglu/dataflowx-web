// Root layout — Next.js 16 requires <html> and <body> in the root layout.
// lang/dir/fontClass are set dynamically by [locale]/layout.tsx via SetHtmlAttributes.
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
