import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-dark-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-sm uppercase tracking-wider mb-4 text-text-primary font-light">
              {"\u00C0 propos"}
            </h3>
            <p className="text-text-secondary text-sm font-light leading-relaxed">
              {"Un blog d\u00E9di\u00E9 au cin\u00E9ma fantastique r\u00E9tro"}
            </p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider mb-4 text-text-primary font-light">
              Liens rapides
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-text-secondary hover:text-text-primary transition text-sm font-light">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-text-primary transition text-sm font-light">
                  {"\u00C0 propos"}
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-text-secondary hover:text-text-primary transition text-sm font-light">
                  Livres
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider mb-4 text-text-primary font-light">
              {"Mentions l\u00E9gales"}
            </h3>
            <p className="text-text-muted text-xs font-light">
              © {new Date().getFullYear()} {"Tous droits r\u00E9serv\u00E9s"}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-dark-border">
          <p className="text-center text-text-muted text-xs uppercase tracking-wider font-light">
            Movie Monsters
          </p>
        </div>
      </div>
    </footer>
  )
}
