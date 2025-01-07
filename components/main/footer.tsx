export function Footer() {
  return (
    <footer className="py-6 bg-slate-900 text-white text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Benyamin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}