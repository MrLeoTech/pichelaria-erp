import { Upload, X } from 'lucide-react'

export default function LogoUploader({ value, onChange }) {
  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text">Logótipo</label>
      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="Logo" className="h-16 w-auto rounded-lg border border-border" />
          <button onClick={() => onChange('')}
            className="absolute -top-2 -right-2 p-1 bg-danger text-white rounded-full hover:bg-red-600 transition-colors">
            <X size={12} />
          </button>
        </div>
      ) : (
        <label className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-border
          bg-bg cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors w-fit">
          <Upload size={16} className="text-text-muted" />
          <span className="text-sm text-text-muted">Carregar logótipo</span>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      )}
    </div>
  )
}
