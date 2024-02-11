import { Icons } from "../icons";

export function Footer() {
  return (
    <footer className="mt-20">
      <div className="mt-10 py-8 border-t border-gray-800 items-center justify-between sm:flex">
        <p className="text-gray-400 text-center">
          © {new Date().getFullYear()} 2-XL. Todos direitos reservados.
        </p>
        <div className="flex items-center justify-center gap-x-6 text-gray-500 mt-6 sm:mt-0">
          <a href="/" target="_blank" aria-label="social media">
            <Icons.twitter className="w-6 h-6 fill-muted-foreground hover:fill-muted duration-150" />
          </a>
          <a href="/" target="_blank" aria-label="social media">
            <Icons.gitHub className="w-6 h-6 fill-muted-foreground hover:fill-muted duration-150" />
          </a>
        </div>
      </div>
    </footer>
  );
}
