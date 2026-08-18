import React, { useState, useRef } from 'react';
import {
  X,
  Search,
  Upload,
  RotateCcw,
  Check,
  Image as ImageIcon,
  Sliders,
  Sparkles,
  Download,
  FileJson,
  ExternalLink,
  Info,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { useImages, ImageItem } from '../context/ImageContext';

interface AdminImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  'All Images',
  'Hero Slider',
  'Services',
  'Industries',
  'About & Company',
  'Worker Housing & Care',
  'Locations & Corridors',
  'Testimonials & Avatars',
];

export const AdminImageManagerModal: React.FC<AdminImageManagerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    images,
    updateImage,
    resetImage,
    resetAllImages,
    exportConfigJson,
    importConfigJson,
  } = useImages();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Images');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [previewModalImage, setPreviewModalImage] = useState<ImageItem | null>(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const imageList: ImageItem[] = Object.keys(images).map((k) => images[k]);

  const filteredImages: ImageItem[] = imageList.filter((item: ImageItem) => {
    const matchesCategory =
      selectedCategory === 'All Images' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const modifiedCount = imageList.filter((img: ImageItem) => img.currentUrl !== img.defaultUrl).length;

  const handleFileUpload = (key: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WebP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        updateImage(key, e.target.result);
        showToast(`Uploaded new image for "${images[key]?.title}"`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleExport = () => {
    const json = exportConfigJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bluegate-website-images-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Image configuration exported as JSON file');
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const success = importConfigJson(importJsonText);
    if (success) {
      showToast('Successfully imported image configuration!');
      setShowImportBox(false);
      setImportJsonText('');
    } else {
      showToast('Invalid JSON format. Please verify the copied structure.');
    }
  };

  const handleResetAll = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all images back to their original website defaults?'
      )
    ) {
      resetAllImages();
      showToast('All images have been restored to factory defaults');
    }
  };

  return (
    <div
      id="admin-image-manager-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-panel-title"
    >
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* HEADER BAR */}
        <div className="bg-[#002255] text-white p-5 sm:p-6 border-b border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD000] text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="admin-panel-title" className="text-xl sm:text-2xl font-black font-heading tracking-tight">
                  Website Image CMS & Admin Panel
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-800/80 text-[11px] font-bold text-blue-200 border border-blue-600">
                  Live Reactivity
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-200/90 mt-0.5">
                Replace, upload, or fine-tune every image on the Bluegate Work website with instant live previews.
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              id="admin-export-btn"
              onClick={handleExport}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Export all custom image settings as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Config</span>
            </button>

            <button
              id="admin-import-btn"
              onClick={() => setShowImportBox(!showImportBox)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Import previously saved image JSON"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Import JSON</span>
            </button>

            <button
              id="admin-reset-all-btn"
              onClick={handleResetAll}
              className="px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 rounded-lg text-xs font-semibold text-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset all images back to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>

            <button
              id="admin-close-modal-btn"
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TOAST NOTIFICATION */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-between animate-fadeIn shadow-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* JSON IMPORT MODAL / COLLAPSIBLE DRAWER */}
        {showImportBox && (
          <div className="p-4 bg-slate-900 text-white border-b border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFD000]">
                Paste Custom Image JSON Config
              </span>
              <button
                onClick={() => setShowImportBox(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Cancel
              </button>
            </div>
            <textarea
              id="admin-json-import-textarea"
              rows={3}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='Paste JSON here, e.g. { "hero_slide_1": "https://..." }'
              className="w-full font-mono text-xs p-2.5 bg-slate-950 border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-[#FFD000]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleImportSubmit}
                className="px-4 py-1.5 bg-[#FFD000] text-slate-950 font-bold text-xs rounded hover:bg-[#ffe043] transition-colors"
              >
                Apply & Update Images
              </button>
            </div>
          </div>
        )}

        {/* CONTROLS & FILTER BAR */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="admin-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images by name, section, keyword..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#002255] focus:ring-1 focus:ring-[#002255]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="w-full lg:w-auto flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All Images'
                  ? imageList.length
                  : imageList.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-[#002255] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STATUS SUMMARY BAR */}
        <div className="px-5 py-2 bg-blue-50/70 border-b border-blue-100/60 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#002255]" />
            <span>
              Showing <strong>{filteredImages.length}</strong> of <strong>{imageList.length}</strong> website images
            </span>
          </div>
          <div className="flex items-center gap-3">
            {modifiedCount > 0 ? (
              <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded">
                <Sparkles className="w-3 h-3" />
                {modifiedCount} customized from default
              </span>
            ) : (
              <span className="text-slate-500">All images on default settings</span>
            )}
          </div>
        </div>

        {/* IMAGE CARDS GRID */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {filteredImages.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-700">No images match your search filter</h3>
              <p className="text-xs text-slate-500">Try changing keywords or clearing the category filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Images');
                }}
                className="px-4 py-2 bg-[#002255] text-white text-xs font-bold rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredImages.map((item) => {
                const isModified = item.currentUrl !== item.defaultUrl;
                const isDataUrl = item.currentUrl.startsWith('data:');

                return (
                  <div
                    key={item.key}
                    id={`admin-card-${item.key}`}
                    className={`bg-white rounded-xl border transition-all shadow-sm hover:shadow-md flex flex-col ${
                      isModified ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
                    }`}
                  >
                    {/* Card Header & Thumbnail */}
                    <div className="p-4 border-b border-slate-100 flex items-start gap-4">
                      {/* Image Thumbnail Preview with Zoom trigger */}
                      <div className="relative group w-28 h-24 sm:w-32 sm:h-24 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                        <img
                          src={item.currentUrl}
                          alt={item.altText}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = item.defaultUrl;
                          }}
                        />
                        <button
                          onClick={() => setPreviewModalImage(item)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                          title="Preview full size"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {isModified && (
                          <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-black rounded shadow">
                            CUSTOM
                          </span>
                        )}
                      </div>

                      {/* Title & Metadata */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                            {item.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {item.recommendedSize}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 truncate" title={item.title}>
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2" title={item.description}>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Body: URL & Upload Controls */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-slate-50/50">
                      {/* URL Input */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                          <span>Image URL (or upload local file below):</span>
                          {isDataUrl && (
                            <span className="text-[10px] text-emerald-600 font-semibold">
                              (Base64 Local Upload)
                            </span>
                          )}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={isDataUrl ? '[Local File Uploaded]' : item.currentUrl}
                            readOnly={isDataUrl}
                            onChange={(e) => updateImage(item.key, e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="flex-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-800 font-mono focus:outline-none focus:border-[#002255]"
                          />
                        </div>
                      </div>

                      {/* Preset Alternatives Quick Picker */}
                      {item.presetAlternatives && item.presetAlternatives.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Quick Industry Presets:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.presetAlternatives.map((preset, pIdx) => {
                              const isSelected = item.currentUrl === preset.url;
                              return (
                                <button
                                  key={pIdx}
                                  onClick={() => {
                                    updateImage(item.key, preset.url);
                                    showToast(`Applied preset "${preset.label}"`);
                                  }}
                                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                                    isSelected
                                      ? 'bg-[#002255] text-[#FFD000] font-bold ring-1 ring-[#002255]'
                                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 text-[#FFD000]" />}
                                  <span>{preset.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Action Bar: Upload File & Reset */}
                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                        {/* Hidden File Input */}
                        <input
                          type="file"
                          accept="image/*"
                          ref={(el) => (fileInputRefs.current[item.key] = el)}
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(item.key, e.target.files[0]);
                            }
                          }}
                        />

                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[item.key]?.click()}
                          className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5 text-blue-700" />
                          <span>Upload File</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {isModified && (
                            <button
                              type="button"
                              onClick={() => {
                                resetImage(item.key);
                                showToast(`Reset "${item.title}" to default`);
                              }}
                              className="px-2.5 py-1.5 text-xs text-rose-700 hover:bg-rose-50 rounded font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              title="Revert back to default original image"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Reset Default</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER BAR */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-600">
            Changes take effect <strong>instantly</strong> across all website pages and stay saved in browser memory.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#002255] hover:bg-[#001738] text-white font-bold rounded-lg shadow transition-colors cursor-pointer"
            >
              Done & View Live Site
            </button>
          </div>
        </div>
      </div>

      {/* FULL PREVIEW MODAL */}
      {previewModalImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setPreviewModalImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] bg-slate-900 rounded-xl overflow-hidden shadow-2xl p-2 flex flex-col">
            <div className="p-3 flex items-center justify-between text-white border-b border-slate-800">
              <span className="font-bold text-sm">{previewModalImage.title}</span>
              <button
                onClick={() => setPreviewModalImage(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center p-4">
              <img
                src={previewModalImage.currentUrl}
                alt={previewModalImage.altText}
                className="max-h-[70vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
