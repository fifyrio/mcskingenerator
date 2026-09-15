// Shared homepage FAQ — rendered on the page and emitted as FAQPage JSON-LD.
export interface FaqItem {
  q: string;
  a: string;
}

export const HOME_FAQ: FaqItem[] = [
  {
    q: 'Is MCSkinGenerator free?',
    a: 'Yes. The editor, the template library and PNG downloads are completely free, with no sign-up, no watermark and no limit on how many skins you create or download. AI generation is also free within a generous daily quota.',
  },
  {
    q: 'Do I need to install anything or create an account?',
    a: 'No. The whole skin maker runs in your browser, so there is nothing to download or install, and you can design a skin and export it without ever creating an account.',
  },
  {
    q: 'How do I use my skin in Minecraft Java Edition?',
    a: 'Download the PNG, open the Minecraft Launcher, go to the Skins tab, click New Skin, choose Classic or Slim, then select your file and save. Your new look appears the next time you launch the game.',
  },
  {
    q: 'How do I import a skin into Minecraft Bedrock Edition?',
    a: 'On Windows, iOS or Android open the Dressing Room, choose Classic Skins, pick an empty slot, select Import and choose your downloaded PNG. Consoles cannot import custom PNG skins, so use a PC or mobile device.',
  },
  {
    q: 'What is the difference between Classic and Slim models?',
    a: 'Classic (Steve) characters have 4-pixel-wide arms, while Slim (Alex) characters have 3-pixel-wide arms. Toggle between the two in the 3D preview so the skin lines up with your account body type before you download.',
  },
  {
    q: 'What size are Minecraft skins?',
    a: 'Modern Minecraft skins are 64×64 pixel PNGs with a base layer plus a second overlay layer for hats, jackets and sleeves. This editor always works at the correct 64×64 size, so your export is game-ready.',
  },
  {
    q: 'Can I make a skin on my phone?',
    a: 'Yes. The editor supports touch, so you can draw pixels, spin the 3D preview and download a finished skin on a phone or tablet just as easily as on a desktop computer.',
  },
  {
    q: 'Can AI generate a Minecraft skin for me?',
    a: 'Yes. Open the AI Minecraft Skin Maker, describe the character you want or upload a photo, and the AI returns a skin in seconds that you can keep refining in the editor.',
  },
  {
    q: 'Where are my skins stored?',
    a: 'Skins are created locally in your browser and downloaded straight to your device. Nothing is uploaded when you draw, so your designs stay private on your own computer.',
  },
  {
    q: 'Can I use these skins on multiplayer servers?',
    a: 'Yes. A skin is just a cosmetic texture, so it works anywhere you play, including servers and realms. Keep your designs appropriate and within each server community rules.',
  },
];
