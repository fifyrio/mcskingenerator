'use client';

import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import Image from 'next/image';
import VoxelHeader from './common/VoxelHeader';
import FreeOriginalDownloadButton from './ui/FreeOriginalDownloadButton';
import ShareModal from './ui/ShareModal';
import ImagePreviewModal from './ui/ImagePreviewModal';
import LoginModal from './ui/LoginModal';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useTranslations } from 'next-intl';

export interface MinecraftSkinPresetAsset {
  displaySrc: string;
  referenceSrc: string;
  fileName: string;
  name: string;
}

interface AiMinecraftSkinExperienceProps {
  skinPresets: MinecraftSkinPresetAsset[];
}

const PROMPT_MAP: Record<string, string> = {
  'Classic Steve': 'Transform this photo into a Minecraft-style blocky pixel art character resembling the classic Steve skin. Convert the person into a blocky 3D Minecraft character with the iconic square head, rectangular body, and pixelated textures. Use the default Steve color palette with blue shirt, dark pants, and brown hair. Maintain the person\'s recognizable features in pixel form.',
  'Diamond Armor': 'Transform this photo into a Minecraft-style blocky pixel art character wearing full diamond armor. Convert the person into a blocky 3D Minecraft character with gleaming cyan-blue diamond armor covering the entire body, diamond helmet on the head. The armor should have the characteristic Minecraft diamond texture with light blue and teal pixel patterns.',
  'Creeper': 'Transform this photo into a Minecraft-style blocky pixel art character with a Creeper theme. Convert the person into a blocky Minecraft character with the iconic green Creeper skin pattern — bright green pixelated body with the distinctive Creeper face pattern (sad mouth and dark eyes). Blend the person\'s features with the Creeper aesthetic.',
  'Enderman': 'Transform this photo into a Minecraft-style blocky pixel art character with an Enderman theme. Convert the person into a tall, dark blocky Minecraft character with the Enderman\'s black body, glowing purple eyes, and particle effects. The character should have the Enderman\'s slender proportions and dark purple-black color scheme.',
  'Zombie': 'Transform this photo into a Minecraft-style blocky pixel art character as a Zombie variant. Convert the person into a blocky Minecraft zombie with green-tinted skin, tattered clothing, dark eye sockets, and the characteristic undead appearance. Keep the person\'s features recognizable but zombified with pixelated green skin texture.',
  'Skeleton': 'Transform this photo into a Minecraft-style blocky pixel art character as a Skeleton. Convert the person into a blocky Minecraft skeleton with white bone-textured body, dark hollow eyes, and the characteristic skeletal appearance. The character should have the Minecraft skeleton\'s bone-white pixel pattern throughout.',
  'Nether Knight': 'Transform this photo into a Minecraft-style blocky pixel art character with a Nether Knight theme. Convert the person into a blocky Minecraft character with fiery nether-themed armor in deep red, orange, and black colors. Add glowing lava-like accents, netherite-style textures, and blazing particle effects around the character.',
  'Medieval Knight': 'Transform this photo into a Minecraft-style blocky pixel art character as a Medieval Knight. Convert the person into a blocky Minecraft character wearing iron armor with a medieval design — iron helmet with visor, chainmail body armor, iron leggings and boots. Add a shield and sword. Use gray iron and silver pixel textures.',
  'Ender Dragon': 'Transform this photo into a Minecraft-style blocky pixel art character with an Ender Dragon theme. Convert the person into a blocky Minecraft character with dark purple-black dragon-scale armor, glowing purple eyes, dragon wing accessories, and End dimension purple particle effects. The character should embody the Ender Dragon\'s dark purple and black aesthetic.',
  'Pixel Hero': 'Transform this photo into an extra-blocky retro pixel art Minecraft-style character. Convert the person into a highly pixelated, retro 8-bit style Minecraft character with exaggerated block proportions, bold primary colors, and a classic video game hero appearance. The pixel density should be intentionally low for a nostalgic retro gaming feel.',
};

const beforeImage = 'https://pub-103b451e48574bbfb1a3ca707ebe5cff.r2.dev/showcases/ai-minecraft-skin/feature/before.png';
const afterImage = 'https://pub-103b451e48574bbfb1a3ca707ebe5cff.r2.dev/showcases/ai-minecraft-skin/feature/after.png';

export default function AiMinecraftSkinExperience({ skinPresets }: AiMinecraftSkinExperienceProps) {
  const t = useTranslations('aiMinecraftSkin');
  const { user, profile, refreshProfile } = useAuth();

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const [selectedPreset, setSelectedPreset] = useState<MinecraftSkinPresetAsset | null>(null);
  const [styleDescription, setStyleDescription] = useState('');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isDragActive, setIsDragActive] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const creditsRequired = 5;

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSelectedFile = (file?: File) => {
    if (!file) {
      setUploadedFileName(null);
      setUploadedImage(null);
      setUploadedFile(null);
      setUploadedImageUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setUploadedFile(file);
    setUploadedFileName(file.name);
    setUploadedImageUrl(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSelectedFile(event.target.files?.[0]);
    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    handleSelectedFile(event.dataTransfer.files?.[0]);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    setIsDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDragActive(false);
    }
  };

  const buildPrompt = () => {
    const customStyle = styleDescription.trim()
      ? ` Additional style instructions: ${styleDescription.trim()}`
      : '';
    if (!selectedPreset) {
      return `Transform this photo into a Minecraft-style blocky pixel art character. Convert the person into a blocky 3D Minecraft character with square head, rectangular body, and pixelated textures. Maintain recognizable features in pixel form.${customStyle}`;
    }
    const base = PROMPT_MAP[selectedPreset.name] || `Transform this photo into a Minecraft-style blocky pixel art character with a ${selectedPreset.name} theme. Convert the person into a blocky Minecraft character with pixelated textures.`;
    return `${base}${customStyle}`;
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      setError(t('error.upload'));
      return;
    }

    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!profile || (profile.credits || 0) < creditsRequired) {
      setError(t('error.credits', { required: creditsRequired }));
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      let imageUrl = uploadedImageUrl;
      if (!imageUrl) {
        if (!uploadedFile) {
          setError('No file selected');
          return;
        }

        const formData = new FormData();
        formData.append('file', uploadedFile);

        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          const uploadError = await uploadResponse.json();
          setError('Failed to upload image: ' + (uploadError.error || 'Unknown error'));
          return;
        }

        const { imageUrl: newImageUrl } = await uploadResponse.json();
        if (!newImageUrl) {
          setError('Failed to upload image: Missing image URL');
          return;
        }
        imageUrl = newImageUrl;
        setUploadedImageUrl(newImageUrl);
      }

      const promptText = buildPrompt();
      const skinStyle = selectedPreset ? selectedPreset.name : 'Classic Steve';
      const styleHint = `The target Minecraft skin style is "${skinStyle}". Create a blocky, pixelated Minecraft character art that captures the essence of this style while maintaining recognizable features from the original photo.`;
      const finalPrompt = `${promptText} ${styleHint} Deliver a high-quality Minecraft skin art powered by MCSkinGenerator.`;

      if (!imageUrl) {
        setError('Failed to upload image: Missing image URL');
        return;
      }

      const imageUrls = [imageUrl];

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          imageUrls,
          metadata: selectedPreset ? { skinStyle: selectedPreset.name } : undefined,
          aspectRatio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setShowLoginModal(true);
        } else if (response.status === 402) {
          setError(t('error.credits', { required: data.required }));
        } else if (response.status === 503) {
          setError(data.message || 'Service temporarily unavailable. Please try again in a moment.');
        } else {
          setError(data.error || 'Failed to generate Minecraft skin.');
        }
        return;
      }

      const taskId = data.taskId;
      if (!taskId) {
        setError('No task ID received. Please try again.');
        return;
      }

      const maxAttempts = 30;
      const pollInterval = 5000;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        await new Promise(resolve => setTimeout(resolve, pollInterval));

        const statusResponse = await fetch(`/api/kie/task-status?taskId=${taskId}`, { cache: 'no-store' });
        if (!statusResponse.ok) {
          continue;
        }

        const statusData = await statusResponse.json();

        if (statusData.status === 'completed') {
          if (statusData.resultUrls && statusData.resultUrls.length > 0) {
            setGeneratedImage(statusData.resultUrls[0]);
            setDescription('Minecraft skin generated successfully');
            await refreshProfile();
            return;
          } else {
            setError('Generation completed but no result URL found.');
            return;
          }
        }

        if (statusData.status === 'failed') {
          setError(statusData.error || 'Generation failed. Please try again.');
          return;
        }
      }

      setError('Generation is taking longer than expected. Please check back later.');
    } catch (err: unknown) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else if (err instanceof Error && err.message?.includes('timeout')) {
        setError('Request timed out. The server may be busy, please try again.');
      } else {
        setError('Failed to generate Minecraft skin. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const updateSliderPosition = (clientX: number) => {
    const container = comparisonRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percentage = (relativeX / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, percentage)));
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    updateSliderPosition(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    updateSliderPosition(clientX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const beforeDisplayImage = uploadedImage || beforeImage;
  const afterDisplayImage = generatedImage || afterImage;
  const beforeTag = uploadedImage ? t('preview.labels.original') : t('preview.labels.before');
  const afterTag = generatedImage ? t('preview.labels.result') : t('preview.labels.after');

  const btn = 'inline-flex items-center justify-center border-2 border-ink bg-chalk press-block';

  return (
    <>
      <VoxelHeader />
      <main className="workbench-bg min-h-screen text-ink pb-16">
        <section className="max-w-6xl mx-auto px-4 pt-10 md:pt-14">
          <div className="grid items-start gap-6 lg:grid-cols-2">
            {/* Left column — inputs */}
            <div className="border-2 border-ink bg-chalk shadow-block p-6 sm:p-8 space-y-6">
              <span className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-1 text-xs font-semibold">
                <span className="grid h-6 w-6 place-items-center border-2 border-ink bg-diamond text-sm">🎮</span>
                {t('hero.badge')}
              </span>

              <div className="space-y-3">
                <h1 className="font-pixel text-3xl sm:text-4xl leading-tight text-ink">
                  {t('hero.title')}
                </h1>
                <p className="text-base text-ink-muted">
                  {t('hero.subtitle')}
                </p>
              </div>

              <div className="space-y-6">
                {/* Upload */}
                <div
                  className={`border-2 border-ink bg-paper p-5 shadow-block-inset transition ${
                    isDragActive ? 'ring-2 ring-grass bg-diamond-tint' : ''
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-ink">{t('input.upload.label')}</p>
                      <p className="text-xs text-ink-soft">{t('input.upload.format')}</p>
                    </div>
                    <label
                      htmlFor="minecraft-skin-upload"
                      className="cursor-pointer border-2 border-ink bg-grass px-4 py-2 text-sm font-semibold text-white shadow-block-sm press-block"
                    >
                      {t('input.upload.button')}
                    </label>
                    <input type="file" accept="image/*" id="minecraft-skin-upload" className="hidden" onChange={handleFileChange} />
                  </div>
                  {uploadedFileName ? (
                    <div className="mt-4 border-2 border-dashed border-ink/50 bg-chalk px-3 py-2 text-sm font-medium text-ink">
                      {uploadedFileName}
                    </div>
                  ) : (
                    <div className="mt-4 border-2 border-dashed border-ink/30 px-3 py-2 text-sm text-ink-soft">
                      {t('input.upload.placeholder')}
                    </div>
                  )}
                </div>

                {/* Style description */}
                <div>
                  <label htmlFor="style-description" className="block text-sm font-semibold text-ink mb-2">
                    {t('input.styleDescription.label')}
                  </label>
                  <textarea
                    id="style-description"
                    value={styleDescription}
                    onChange={(e) => setStyleDescription(e.target.value)}
                    placeholder={t('input.styleDescription.placeholder')}
                    maxLength={300}
                    rows={3}
                    className="w-full border-2 border-ink bg-paper px-4 py-3 text-sm text-ink placeholder-ink-soft focus:border-grass focus:outline-none focus:ring-2 focus:ring-grass transition resize-none"
                  />
                  <p className="mt-1 text-xs text-ink-soft">{t('input.styleDescription.hint')}</p>
                </div>

                {/* Aspect ratio */}
                <div>
                  <p className="text-sm font-semibold text-ink mb-2">{t('input.aspectRatio.label')}</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: '1:1', w: 'w-4', h: 'h-4' },
                      { value: '9:16', w: 'w-2.5', h: 'h-[18px]' },
                      { value: '16:9', w: 'w-[18px]', h: 'h-2.5' },
                      { value: '3:2', w: 'w-[18px]', h: 'h-3' },
                      { value: '2:3', w: 'w-3', h: 'h-[18px]' },
                    ].map(({ value, w, h }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setAspectRatio(value)}
                        aria-pressed={aspectRatio === value}
                        className={`flex items-center gap-1.5 border-2 border-ink px-3 py-2 text-xs font-semibold transition ${
                          aspectRatio === value ? 'bg-ink text-chalk' : 'bg-chalk text-ink-soft'
                        }`}
                      >
                        <span className={`inline-block border border-current ${w} ${h}`} />
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preset selector */}
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-ink">
                    <span>{t('input.preset.label')}</span>
                    <span className="hidden sm:block text-xs text-grass-ink">{t('input.preset.swipe')}</span>
                  </div>
                  {/* Mobile grid */}
                  <div className="grid grid-cols-4 gap-2 sm:hidden">
                    {skinPresets.map((preset) => {
                      const isSelected = selectedPreset?.referenceSrc === preset.referenceSrc;
                      return (
                        <button
                          type="button"
                          key={preset.referenceSrc}
                          onClick={() => setSelectedPreset(isSelected ? null : preset)}
                          className={`flex flex-col items-center border-2 px-2 py-2 transition ${
                            isSelected ? 'border-grass bg-diamond-tint' : 'border-ink/30 bg-chalk'
                          }`}
                        >
                          <div className="relative h-14 w-full overflow-hidden border-2 border-ink">
                            <Image src={preset.displaySrc} alt={preset.name} fill sizes="80px" className="object-cover" />
                          </div>
                          <div className="mt-1.5 text-[10px] font-semibold text-center leading-tight line-clamp-2 text-ink">
                            {preset.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {/* Desktop scroll */}
                  <div className="hidden sm:block overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
                    <div className="inline-flex gap-3 pr-6">
                      {skinPresets.map((preset) => {
                        const isSelected = selectedPreset?.referenceSrc === preset.referenceSrc;
                        return (
                          <button
                            type="button"
                            key={preset.referenceSrc}
                            onClick={() => setSelectedPreset(isSelected ? null : preset)}
                            className={`flex w-[100px] flex-shrink-0 flex-col items-center border-2 px-2 py-2 transition ${
                              isSelected ? 'border-grass bg-diamond-tint' : 'border-ink/30 bg-chalk'
                            }`}
                          >
                            <div className="relative h-20 w-full overflow-hidden border-2 border-ink">
                              <Image src={preset.displaySrc} alt={preset.name} fill sizes="100px" className="object-cover" />
                            </div>
                            <div className="mt-1.5 text-[11px] font-semibold text-center leading-tight text-ink">
                              {preset.name}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selection summary */}
                  <div className="mt-3 border-2 border-ink bg-paper p-4 text-xs text-ink-muted">
                    <p className="font-semibold text-ink mb-1">{t('input.preset.summary.title')}</p>
                    <p>
                      {selectedPreset
                        ? t('input.preset.summary.selected', { name: selectedPreset.name })
                        : t('input.preset.summary.none')}
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="border-2 border-redstone bg-red-50 px-4 py-3 text-sm font-medium text-redstone">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full border-2 border-ink bg-grass px-6 py-3 text-center text-base font-semibold text-white shadow-block press-block disabled:opacity-60"
                >
                  {isGenerating ? t('input.button.generating') : t('input.button.generate')}
                </button>
                <p className="text-center text-xs text-ink-soft sm:text-left">
                  {t('input.button.credits', { count: creditsRequired })}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-center">
                <div className="border-2 border-ink bg-paper px-2 py-3">
                  <div className="font-pixel text-xl text-ink">{t('input.stats.presets.value')}</div>
                  <div className="text-[11px] uppercase tracking-wide text-ink-soft">{t('input.stats.presets.label')}</div>
                </div>
                <div className="border-2 border-ink bg-paper px-2 py-3">
                  <div className="font-pixel text-xl text-ink">{t('input.stats.time.value')}</div>
                  <div className="text-[11px] uppercase tracking-wide text-ink-soft">{t('input.stats.time.label')}</div>
                </div>
              </div>
            </div>

            {/* Right column — preview */}
            <div className="relative">
              <div className="border-2 border-ink bg-chalk shadow-block p-4">
                <div
                  ref={comparisonRef}
                  className="relative w-full overflow-hidden border-2 border-ink pixel-checker-bg select-none"
                  style={{ aspectRatio: aspectRatio.replace(':', '/') }}
                  onMouseDown={(event) => handleDragStart(event.clientX)}
                  onMouseMove={(event) => handleDragMove(event.clientX)}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={(event) => handleDragStart(event.touches[0].clientX)}
                  onTouchMove={(event) => handleDragMove(event.touches[0].clientX)}
                  onTouchEnd={handleDragEnd}
                  role="presentation"
                >
                  <Image src={afterDisplayImage} alt="AI Minecraft skin preview" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" priority />
                  <div className="absolute inset-0 left-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                    <div className="relative h-full w-full">
                      <Image src={beforeDisplayImage} alt="Original photo" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" priority />
                    </div>
                  </div>

                  {isGenerating && (
                    <div className="absolute inset-0 bg-ink/70 flex flex-col items-center justify-center z-10">
                      <div className="w-16 h-16 border-4 border-paper/30 border-t-grass animate-spin" />
                      <div className="mt-5 text-center space-y-1">
                        <p className="text-white font-semibold text-lg">{t('preview.loading.title')}</p>
                        <p className="text-paper/80 text-sm">{t('preview.loading.subtitle')}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <div className="w-2 h-2 bg-grass animate-pulse" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-grass animate-pulse" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-grass animate-pulse" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-y-4 w-0.5 bg-ink" style={{ left: `calc(${sliderPosition}% - 1px)` }} />
                  <div
                    className="absolute top-1/2 -mt-5 h-10 w-10 -translate-x-1/2 border-2 border-ink bg-chalk text-ink shadow-block-sm flex items-center justify-center cursor-[ew-resize]"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    ⇆
                  </div>
                  <span className="absolute left-4 top-4 border-2 border-ink bg-chalk px-2 py-0.5 text-xs font-semibold text-ink">
                    {beforeTag}
                  </span>
                  <span className="absolute right-4 top-4 border-2 border-ink bg-ink px-2 py-0.5 text-xs font-semibold text-chalk">
                    {afterTag}
                  </span>

                  {generatedImage && (
                    <button
                      onClick={() => setShowPreviewModal(true)}
                      className="absolute bottom-4 right-4 flex items-center justify-center w-11 h-11 border-2 border-ink bg-chalk text-ink shadow-block-sm press-block"
                      aria-label={t('preview.viewFull')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              {generatedImage && (
                <div className="mt-4 border-2 border-ink bg-chalk p-5 shadow-block">
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-sm font-semibold text-ink">{t('preview.saved.title')}</p>
                      <p className="text-xs text-ink-soft">{t('preview.saved.subtitle')}</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <FreeOriginalDownloadButton
                        imageUrl={generatedImage}
                        filename="ai-minecraft-skin.png"
                        className="flex-1 justify-center border-2 border-ink bg-grass text-white shadow-block-sm press-block"
                      />
                      <button
                        type="button"
                        className={`${btn} flex-1 px-4 py-2 text-sm font-semibold shadow-block-sm`}
                        onClick={() => setShowShareModal(true)}
                      >
                        {t('preview.saved.share')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-4 mt-16">
          <div className="text-center space-y-2">
            <p className="font-pixel text-sm text-grass-ink">{t('howTo.badge')}</p>
            <h2 className="font-pixel text-2xl sm:text-3xl text-ink">{t('howTo.title')}</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((step) => (
              <div key={step} className="border-2 border-ink bg-chalk shadow-block p-6">
                <div className="font-pixel text-3xl text-grass-ink">{`0${step}`}</div>
                <h3 className="mt-2 text-lg font-semibold text-ink">{t(`howTo.steps.${step}.title`)}</h3>
                <p className="mt-1 text-sm text-ink-muted">{t(`howTo.steps.${step}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <section className="max-w-6xl mx-auto px-4 mt-16">
          <div className="space-y-2">
            <p className="font-pixel text-sm text-grass-ink">{t('benefits.badge')}</p>
            <h2 className="font-pixel text-2xl sm:text-3xl text-ink">{t('benefits.title')}</h2>
            <p className="max-w-3xl text-ink-muted">{t('benefits.subtitle')}</p>
          </div>
          <div className="mt-8 space-y-6">
            {[
              { key: 1, icon: '🎮', before: 'https://pub-103b451e48574bbfb1a3ca707ebe5cff.r2.dev/showcases/ai-minecraft-skin/cases/case-1-before.png', after: 'https://pub-103b451e48574bbfb1a3ca707ebe5cff.r2.dev/showcases/ai-minecraft-skin/cases/case-1-after.png' },
              { key: 2, icon: '⚔️', before: 'https://pub-103b451e48574bbfb1a3ca707ebe5cff.r2.dev/showcases/ai-minecraft-skin/cases/case-2-before.png', after: 'https://pub-103b451e48574bbfb1a3ca707ebe5cff.r2.dev/showcases/ai-minecraft-skin/cases/case-2-after.png' },
              { key: 3, icon: '✨', before: 'https://pub-103b451e48574bbfb1a3ca707ebe5cff.r2.dev/showcases/ai-minecraft-skin/cases/case-3-before.png', after: 'https://pub-103b451e48574bbfb1a3ca707ebe5cff.r2.dev/showcases/ai-minecraft-skin/cases/case-3-after.png' },
            ].map((card, index) => (
              <div key={card.key} className="grid gap-6 border-2 border-ink bg-chalk shadow-block p-6 md:p-8 items-center md:grid-cols-2">
                {(index === 0 || index === 2) && (
                  <div className="grid grid-cols-2 gap-2 border-2 border-ink bg-paper p-3">
                    <div className="relative border-2 border-ink overflow-hidden aspect-square">
                      <img src={card.before} alt="Before" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 border border-ink bg-chalk px-1 text-[10px] font-semibold">Before</span>
                    </div>
                    <div className="relative border-2 border-ink overflow-hidden aspect-square">
                      <img src={card.after} alt="After" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 border border-ink bg-ink px-1 text-[10px] font-semibold text-chalk">After</span>
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  <div className="grid h-11 w-11 place-items-center border-2 border-ink bg-diamond-tint text-xl">{card.icon}</div>
                  <h3 className="font-pixel text-xl text-ink">{t(`benefits.cards.${card.key}.title`)}</h3>
                  <p className="text-sm text-ink-muted">{t(`benefits.cards.${card.key}.desc`)}</p>
                </div>
                {index === 1 && (
                  <div className="grid grid-cols-2 gap-2 border-2 border-ink bg-paper p-3">
                    <div className="relative border-2 border-ink overflow-hidden aspect-square">
                      <img src={card.before} alt="Before" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 border border-ink bg-chalk px-1 text-[10px] font-semibold">Before</span>
                    </div>
                    <div className="relative border-2 border-ink overflow-hidden aspect-square">
                      <img src={card.after} alt="After" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 border border-ink bg-ink px-1 text-[10px] font-semibold text-chalk">After</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 mt-16">
          <div className="space-y-2">
            <p className="font-pixel text-sm text-grass-ink">{t('faq.badge')}</p>
            <h2 className="font-pixel text-2xl sm:text-3xl text-ink">{t('faq.title')}</h2>
            <p className="text-ink-muted">{t('faq.subtitle')}</p>
          </div>
          <div className="mt-6 space-y-3">
            {[1, 2, 3, 4].map((index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`border-2 border-ink ${isOpen ? 'bg-paper' : 'bg-chalk'}`}>
                  <button onClick={() => setOpenFaq(isOpen ? null : index)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                    <span className="font-semibold text-ink">{t(`faq.items.${index}.question`)}</span>
                    <span className="font-pixel text-grass-ink text-2xl">{isOpen ? '–' : '+'}</span>
                  </button>
                  {isOpen && <div className="px-5 pb-5 text-sm text-ink-muted">{t(`faq.items.${index}.answer`)}</div>}
                </div>
              );
            })}
          </div>
        </section>
      </main>
      {generatedImage && (
        <>
          <ShareModal
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
            imageUrl={generatedImage}
            description={description || 'AI Minecraft Skin by MCSkinGenerator'}
          />
          <ImagePreviewModal
            isOpen={showPreviewModal}
            onClose={() => setShowPreviewModal(false)}
            imageUrl={generatedImage}
            title="AI Minecraft Skin Preview"
          />
        </>
      )}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
