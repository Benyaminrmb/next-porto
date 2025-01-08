export default function Footer() {
  return (
    <footer className="border-t">
      <div className="app-container p-4 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Benyamin Bolhassani. All rights reserved.
        </p>
      </div>
    </footer>
  );
}