import '../globals.css';
import { Inter, Instrument_Serif, Barlow } from 'next/font/google';
import Footer from '@/components/common/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import AppToaster from '@/components/common/AppToaster';
import CookieConsent from '@/components/common/CookieConsent';
import GoogleOneTap from '@/components/auth/GoogleOneTap';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'Minecraft Skin Maker – Create Your Own Skin Online | MCSkinGenerator',
  description: 'Free skin maker for Minecraft: draw your own skin, preview in 3D, and download a PNG for Java & Bedrock.',
  metadataBase: new URL('https://mcskingenerator.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${instrumentSerif.variable} ${barlow.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <AppToaster />
            <CookieConsent />
            <GoogleOneTap />
          </AuthProvider>
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
