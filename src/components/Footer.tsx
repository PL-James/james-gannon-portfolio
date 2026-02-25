import { socials } from '../data/content'

export function Footer() {
  return (
    <footer
      className="px-6 py-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
    >
      <span>&copy; {new Date().getFullYear()} James Gannon</span>
      <div className="flex items-center gap-4">
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
          LinkedIn
        </a>
        <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline">
          X
        </a>
      </div>
    </footer>
  )
}
