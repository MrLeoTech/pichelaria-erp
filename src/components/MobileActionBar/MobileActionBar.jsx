import { Save, RotateCcw, X } from 'lucide-react'

export default function MobileActionBar({ onSave, onClear, onCancel, saveLabel = 'Guardar' }) {
  return (
    <div className="lg:hidden fixed bottom-[72px] inset-x-0 z-40 px-4 safe-bottom-offset">
      <div className="bg-surface/95 backdrop-blur-md rounded-2xl border border-border shadow-lg p-3 flex gap-2">
        <button
          onClick={onSave}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl
            bg-primary text-white text-sm font-semibold hover:bg-primary-dark
            active:scale-[0.98] transition-all min-h-[48px]"
        >
          <Save size={18} />
          {saveLabel}
        </button>
        <button
          onClick={onClear}
          className="p-3.5 rounded-xl bg-bg border border-border text-text-muted
            hover:bg-slate-100 active:scale-[0.98] transition-all min-w-[48px] min-h-[48px]"
          aria-label="Limpar formulário"
        >
          <RotateCcw size={18} />
        </button>
        <button
          onClick={onCancel}
          className="p-3.5 rounded-xl bg-bg border border-border text-danger
            hover:bg-danger/5 active:scale-[0.98] transition-all min-w-[48px] min-h-[48px]"
          aria-label="Cancelar"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}
