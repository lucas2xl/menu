import { Icons } from "../icons";

export function Footer() {
  return (
    <footer className="mt-20">
      <div className="mt-10 py-8 border-t border-border items-center justify-between sm:flex">
        <p className="text-muted-foreground text-center">
          © {new Date().getFullYear()} 2X-L. Todos direitos reservados.
        </p>
        <div className="flex items-center justify-center gap-x-6 text-muted-foreground mt-6 sm:mt-0">
          <a href="/" target="_blank" aria-label="social media">
            <Icons.twitter className="w-6 h-6 fill-muted-foreground hover:fill-foreground duration-150" />
          </a>
          <a href="/" target="_blank" aria-label="social media">
            <Icons.gitHub className="w-6 h-6 fill-muted-foreground hover:fill-foreground duration-150" />
          </a>
        </div>
      </div>
    </footer>
  );
}
