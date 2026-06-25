export default function Card({ children, className = '', title, icon: Icon }) {
  return (
    <div className={`bg-surface rounded-xl border border-border shadow-sm ${className}`} role="region" aria-label={title || 'Card'}>
      {(title || Icon) && (
        <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
          {Icon && <Icon size={18} className="text-accent" aria-hidden="true" />}
          {title && <h3 className="font-semibold text-sm text-text">{title}</h3>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}
