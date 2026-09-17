export default function Button({ children, variant = 'primary', href = '#', className = '', onClick, ...props }) {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary'

  if (href && href !== '#') {
    return (
      <a
        href={href}
        className={`${baseClass} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={`${baseClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
