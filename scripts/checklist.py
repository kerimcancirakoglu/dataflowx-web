#!/usr/bin/env python3
"""
DataFlowX — Pre-Deploy Checklist
Kullanim: python scripts/checklist.py [--url https://dataflowx.com]
"""

import sys
import re
import urllib.request
import urllib.error
from pathlib import Path
from typing import Optional

# ANSI
GREEN  = "\033[92m"; RED    = "\033[91m"; YELLOW = "\033[93m"
CYAN   = "\033[96m"; BOLD   = "\033[1m";  RESET  = "\033[0m"

results: list[tuple[str, str, str]] = []


def check(category: str, name: str, passed: bool, warn_only=False, detail=""):
    status = "PASS" if passed else ("WARN" if warn_only else "FAIL")
    results.append((category, name, status))
    sym = "✅" if passed else ("⚠️ " if warn_only else "❌")
    d = f"  → {detail}" if detail else ""
    print(f"  {sym}  {name}{d}")


def skip(category: str, name: str, reason=""):
    results.append((category, name, "SKIP"))
    print(f"  ⏭️   {name}{f'  ({reason})' if reason else ''}")


def fetch(url: str, timeout=8) -> Optional[tuple[int, dict, str]]:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "DFX-Checklist/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, dict(r.headers), r.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), ""
    except Exception:
        return None


# ── 1. GÜVENLİK ───────────────────────────────────────────────────────────────
def security_checks(root: Path, base_url: Optional[str]):
    print(f"\n{BOLD}{CYAN}🔒 GÜVENLİK{RESET}")

    wrangler = root / "wrangler.toml"
    if wrangler.exists():
        content = wrangler.read_text()
        leaks = [v for v in re.findall(r'=\s*"([A-Za-z0-9_\-]{41,})"', content)]
        check("security", "wrangler.toml'da açık secret yok", len(leaks) == 0,
              detail=f"Şüpheli: {leaks[0][:12]}..." if leaks else "")
    else:
        skip("security", "wrangler.toml kontrolü", "dosya yok")

    gitignore = root / ".gitignore"
    if gitignore.exists():
        check("security", ".env.local .gitignore'da", ".env.local" in gitignore.read_text())
    else:
        skip("security", ".gitignore kontrolü", "dosya yok")

    env = root / ".env.local"
    if env.exists():
        c = env.read_text()
        check("security", "NEXT_PUBLIC_TURNSTILE_SITE_KEY tanımlı", "NEXT_PUBLIC_TURNSTILE_SITE_KEY" in c)
        check("security", "RESEND_API_KEY tanımlı", "RESEND_API_KEY" in c)
        check("security", "WP_LEAD_WEBHOOK tanımlı", "WP_LEAD_WEBHOOK" in c)
    else:
        skip("security", ".env.local değişken kontrolü", "dosya yok")

    lead = root / "src/app/api/lead/route.ts"
    if lead.exists():
        c = lead.read_text()
        check("security", "/api/lead honeypot koruması var", "HONEYPOT_FIELD" in c)
        check("security", "/api/lead Turnstile doğrulaması var", "turnstile" in c.lower())
        check("security", "/api/lead kurumsal email filtresi var", "freeEmailDomains" in c)
    else:
        skip("security", "Lead API güvenlik kontrolü", "route.ts bulunamadı")

    cfg = root / "next.config.ts"
    if not cfg.exists(): cfg = root / "next.config.js"
    if cfg.exists():
        c = cfg.read_text()
        check("security", "Content-Security-Policy header tanımlı", "Content-Security-Policy" in c)
        check("security", "HSTS header tanımlı", "Strict-Transport-Security" in c)
    else:
        skip("security", "next.config header kontrolü", "config bulunamadı")

    if base_url:
        r = fetch(base_url.replace("https://", "http://"), timeout=6)
        if r:
            status, headers, _ = r
            ok = status in (301, 302) and "https" in headers.get("Location", "")
            check("security", "HTTP→HTTPS yönlendirmesi", ok, warn_only=not ok)
        else:
            skip("security", "HTTP→HTTPS yönlendirme", "siteye ulaşılamadı")
    else:
        skip("security", "HTTP→HTTPS yönlendirme", "--url verilmedi")


# ── 2. SEO ────────────────────────────────────────────────────────────────────
def seo_checks(root: Path, base_url: Optional[str]):
    print(f"\n{BOLD}{CYAN}🔍 SEO{RESET}")

    robots = root / "src/app/robots.ts"
    if not robots.exists(): robots = root / "src/app/robots.txt"
    check("seo", "robots.ts/txt mevcut", robots.exists())

    sitemap = root / "src/app/sitemap.ts"
    if not sitemap.exists(): sitemap = root / "src/app/sitemap.xml"
    check("seo", "sitemap.ts/xml mevcut", sitemap.exists())

    home = root / "src/app/[locale]/page.tsx"
    if home.exists():
        c = home.read_text()
        check("seo", "Ana sayfa Open Graph var", "openGraph" in c or "og:" in c, warn_only=True)
    else:
        skip("seo", "Open Graph kontrolü", "ana sayfa bulunamadı")

    if base_url:
        for path, label in [("/robots.txt", "robots.txt"), ("/sitemap.xml", "sitemap.xml")]:
            r = fetch(f"{base_url}{path}")
            if r:
                status, _, body = r
                check("seo", f"Canlıda {label} erişilebilir", status == 200 and len(body) > 10)
            else:
                skip("seo", f"Canlıda {label}", "ulaşılamadı")

        r = fetch(f"{base_url}/en", timeout=10)
        if r:
            _, _, body = r
            check("seo", "Meta description var", 'meta name="description"' in body, warn_only=True)
        else:
            skip("seo", "Meta description kontrolü", "ulaşılamadı")
    else:
        skip("seo", "Canlı SEO kontrolleri", "--url verilmedi")


# ── 3. HIZ ────────────────────────────────────────────────────────────────────
def performance_checks(root: Path, base_url: Optional[str]):
    print(f"\n{BOLD}{CYAN}⚡ HIZ{RESET}")

    cfg = root / "next.config.ts"
    if not cfg.exists(): cfg = root / "next.config.js"
    if cfg.exists():
        c = cfg.read_text()
        check("perf", "Image loader yapılandırılmış", "loader" in c)
        check("perf", "poweredByHeader kapalı", "poweredByHeader: false" in c)

    check("perf", ".open-next build çıktısı mevcut", (root / ".open-next").exists(),
          warn_only=True, detail="deploy:cf önce build yapar" if not (root / ".open-next").exists() else "")
    check("perf", "node_modules kurulu", (root / "node_modules").exists())

    if base_url:
        r = fetch(f"{base_url}/en")
        if r:
            _, headers, _ = r
            cache = headers.get("Cache-Control", headers.get("cache-control", ""))
            check("perf", "Cache-Control header var", bool(cache), warn_only=True,
                  detail=cache[:50] if cache else "header yok")
        else:
            skip("perf", "Cache-Control kontrolü", "ulaşılamadı")
    else:
        skip("perf", "Cache-Control kontrolü", "--url verilmedi")


# ── 4. UX ─────────────────────────────────────────────────────────────────────
def ux_checks(root: Path, base_url: Optional[str]):
    print(f"\n{BOLD}{CYAN}🎨 UX{RESET}")

    nf = root / "src/app/not-found.tsx"
    if not nf.exists(): nf = root / "src/app/[locale]/not-found.tsx"
    check("ux", "404 sayfası mevcut", nf.exists(), warn_only=True)

    for path, label in [
        ("src/components/PdfLeadModal/PdfLeadModal.tsx", "PdfLeadModal bileşeni"),
        ("src/components/Contact/ContactClient.tsx",     "Contact formu"),
        ("src/components/PartnerForm/PartnerForm.tsx",   "PartnerForm"),
    ]:
        check("ux", f"{label} mevcut", (root / path).exists())

    msgs = root / "messages"
    if msgs.exists():
        langs = [f.stem for f in msgs.glob("*.json")]
        check("ux", f"i18n dosyaları ({', '.join(langs)})", len(langs) >= 2)
    else:
        skip("ux", "i18n mesaj dosyaları", "messages/ yok")

    if base_url:
        r = fetch(f"{base_url}/api/lead", timeout=10)
        if r:
            status, _, _ = r
            check("ux", "/api/lead endpoint erişilebilir",
                  status in (400, 403, 405), detail=f"HTTP {status}")
        else:
            skip("ux", "/api/lead endpoint", "ulaşılamadı")

        for path, label in [("/en", "EN ana sayfa"), ("/tr", "TR ana sayfa"),
                             ("/en/contact", "Contact"), ("/en/resources", "Resources")]:
            r = fetch(f"{base_url}{path}", timeout=10)
            if r:
                status, _, _ = r
                check("ux", f"{label} yükleniyor", status == 200, detail=f"HTTP {status}")
            else:
                skip("ux", label, "ulaşılamadı")
    else:
        skip("ux", "Canlı sayfa kontrolleri", "--url verilmedi")


# ── ÖZET ──────────────────────────────────────────────────────────────────────
def summary() -> int:
    total   = len(results)
    passed  = sum(1 for *_, s in results if s == "PASS")
    failed  = sum(1 for *_, s in results if s == "FAIL")
    warned  = sum(1 for *_, s in results if s == "WARN")
    skipped = sum(1 for *_, s in results if s == "SKIP")

    print(f"\n{'═'*52}")
    print(f"{BOLD}📊 ÖZET{RESET}")
    print(f"{'═'*52}")
    print(f"  {GREEN}PASS   {RESET}: {passed}   {YELLOW}WARN   {RESET}: {warned}")
    print(f"  {RED}FAIL   {RESET}: {failed}   {CYAN}SKIP   {RESET}: {skipped}")
    print(f"  Toplam : {total}")
    print(f"{'═'*52}")

    if failed:
        print(f"\n{RED}{BOLD}❌ BAŞARISIZLAR:{RESET}")
        for cat, name, s in results:
            if s == "FAIL":
                print(f"  [{cat.upper()}] {name}")

    msg = f"{GREEN}{BOLD}🎉 HAZIR!{RESET}" if not failed \
          else f"{RED}{BOLD}⛔ {failed} KONTROL BAŞARISIZ{RESET}"
    print(f"\n  {msg}\n")
    return failed


# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    args = sys.argv[1:]
    base_url = None
    if "--url" in args:
        i = args.index("--url")
        if i + 1 < len(args):
            base_url = args[i + 1].rstrip("/")

    root = Path(__file__).resolve().parent.parent

    print(f"\n{BOLD}{'═'*52}")
    print(f"  DataFlowX — Pre-Deploy Checklist")
    print(f"  Proje : {root.name}")
    if base_url: print(f"  URL   : {base_url}")
    print(f"{'═'*52}{RESET}")

    security_checks(root, base_url)
    seo_checks(root, base_url)
    performance_checks(root, base_url)
    ux_checks(root, base_url)

    sys.exit(1 if summary() else 0)


if __name__ == "__main__":
    main()
