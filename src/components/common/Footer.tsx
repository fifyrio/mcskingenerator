'use client';

import { Link } from '@/i18n/routing';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <span className="text-sm font-semibold text-white">MCSkinGenerator</span>
            <p className="mt-2 text-xs text-white/50">
              Free Minecraft skin maker for Java &amp; Bedrock.
            </p>
          </div>

          {/* Skin Makers */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-3">Skin Makers</h3>
            <ul className="space-y-2.5">
              <li><Link href="/ai-image-effects/ai-minecraft-skin" prefetch={false} className="text-sm text-white/60 hover:text-white transition-colors">AI Minecraft Skin Maker</Link></li>
              <li><Link href="/minecraft-skin" prefetch={false} className="text-sm text-white/60 hover:text-white transition-colors">Minecraft Skin Maker</Link></li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-3">Product</h3>
            <ul className="space-y-2.5">
              <li><Link href="/pricing" prefetch={false} className="text-sm text-white/60 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/contact" prefetch={false} className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-3">Legal</h3>
            <ul className="space-y-2.5">
              <li><Link href="/privacy" prefetch={false} className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" prefetch={false} className="text-sm text-white/60 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">© {YEAR} MCSkinGenerator</p>
          <p className="mt-1 text-white/40 text-xs">
            Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
