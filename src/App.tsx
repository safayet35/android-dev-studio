import { Component, useEffect, type ReactNode } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { SiteNav, SiteFooter } from "./components/SiteNav";
import { btnPrimary, btnSecondary } from "./components/Button";
import { BuyMeALaptop } from "./components/BuyMeALaptop";
import { reportLovableError } from "./lib/lovable-error-reporting";
import HomePage from "./pages/HomePage";
import SetupPage from "./pages/SetupPage";
import ToolsPage from "./pages/ToolsPage";
import TerminalPage from "./pages/TerminalPage";
import TroubleshootingPage from "./pages/TroubleshootingPage";
import GlossaryPage from "./pages/GlossaryPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-5xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className={btnPrimary}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

class RouteErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null; retryKey: number }
> {
  override state = { error: null as Error | null, retryKey: 0 };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  override componentDidCatch(error: Error) {
    console.error(error);
    reportLovableError(error, { boundary: "react_router_error_boundary" });
  }

  override render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="max-w-md text-center">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              This page didn&apos;t load
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong on our end. You can try refreshing or head back home.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => this.setState({ error: null, retryKey: this.state.retryKey + 1 })}
                className={btnPrimary}
              >
                Try again
              </button>
              <a href="/" className={btnSecondary}>
                Go home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return <div key={this.state.retryKey}>{this.props.children}</div>;
  }
}

export default function App() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="content" className="min-h-screen">
        <ScrollToTop />
        <RouteErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/terminal" element={<TerminalPage />} />
            <Route path="/troubleshooting" element={<TroubleshootingPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteErrorBoundary>
      </main>
      <SiteFooter />
      <BuyMeALaptop />
    </>
  );
}
