import { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, AlertCircle } from 'lucide-react';

export default function ImageUploadInput({ 
    label = 'Thumbnail / Cover Gambar', 
    required = false, 
    recommendedText = '1200 × 675 px (Rasio 16:9), Maks 3MB',
    aspectRatio = 'aspect-video', // 'aspect-video' (16:9) or 'aspect-[16/10]' or 'aspect-[4/3]'
    value, 
    onChangeFile,
    onChangeUrl,
    error 
}) {
    const [mode, setMode] = useState('file'); // 'file' or 'url'
    const [previewUrl, setPreviewUrl] = useState(typeof value === 'string' && value ? value : null);
    const [urlInput, setUrlInput] = useState(typeof value === 'string' && value ? value : '');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Silakan pilih file gambar yang valid (PNG, JPG, WEBP, SVG).');
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        if (onChangeFile) {
            onChangeFile(file);
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileChange(file);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileChange(file);
        }
    };

    const handleUrlChange = (e) => {
        const val = e.target.value;
        setUrlInput(val);
        setPreviewUrl(val || null);
        if (onChangeUrl) {
            onChangeUrl(val);
        }
    };

    const handleRemoveImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPreviewUrl(null);
        setUrlInput('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (onChangeFile) onChangeFile(null);
        if (onChangeUrl) onChangeUrl('');
    };

    return (
        <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
                <label className="font-bold text-[#0F172A] flex items-center space-x-1">
                    <span>{label}</span>
                    {required && <span className="text-red-500">*</span>}
                </label>

                {/* Mode Switcher */}
                <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg text-[11px]">
                    <button
                        type="button"
                        onClick={() => setMode('file')}
                        className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                            mode === 'file' 
                                ? 'bg-white text-blue-600 shadow-xs' 
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        Upload File
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('url')}
                        className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                            mode === 'url' 
                                ? 'bg-white text-blue-600 shadow-xs' 
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        Link URL
                    </button>
                </div>
            </div>

            {/* Recommendation Dimension Badge */}
            <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span className="font-mono">Rekomendasi: {recommendedText}</span>
                </span>
            </div>

            {/* Preview or Upload Dropzone */}
            {previewUrl ? (
                <div className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner group`}>
                    <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={() => setPreviewUrl(null)}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 bg-white/90 hover:bg-white text-[#0F172A] font-bold rounded-xl shadow-md text-xs cursor-pointer"
                        >
                            Ganti Gambar
                        </button>
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md cursor-pointer"
                            title="Hapus Gambar"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ) : mode === 'file' ? (
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full ${aspectRatio} max-h-[180px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-200 ${
                        dragActive
                            ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-200'
                            : 'border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20'
                    }`}
                >
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2 shadow-xs">
                        <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-[#0F172A] mb-0.5">
                        Klik untuk upload <span className="text-slate-400 font-normal">atau drag & drop file</span>
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                        PNG, JPG, WEBP atau SVG (Maks. 3MB)
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    <div className="relative">
                        <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="url"
                            value={urlInput}
                            onChange={handleUrlChange}
                            placeholder="https://images.unsplash.com/photo-... atau https://cdn.domain.com/image.png"
                            className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono text-xs"
                        />
                    </div>
                </div>
            )}

            {/* Hidden Native File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                onChange={handleFileInput}
                className="hidden"
            />

            {error && (
                <p className="text-red-500 text-[11px] flex items-center space-x-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{error}</span>
                </p>
            )}
        </div>
    );
}
