import axios from 'axios';
import { SeoSettings } from '../services/seoService';

const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api\/?$/, '');

export async function initializeDynamicSEO() {
    try {
        const { data } = await axios.get(`${BACKEND_URL}/api/seo`);
        const settings: SeoSettings = data.data;

        if (!settings) return;

        // Update Page Title
        if (settings.siteTitle) {
            document.title = settings.siteTitle;
        }

        // Update Meta Tags
        updateMeta('name', 'description', settings.metaDescription);
        updateMeta('name', 'keywords', settings.keywords);

        if (settings.googleConsole) {
            updateMeta('name', 'google-site-verification', settings.googleConsole);
        }

        // Open Graph
        updateMeta('property', 'og:title', settings.ogTitle);
        updateMeta('property', 'og:description', settings.ogDescription);
        updateMeta('property', 'og:image', settings.ogImage);
        if (settings.ogUrl) updateMeta('property', 'og:url', settings.ogUrl);

        // Twitter
        updateMeta('name', 'twitter:title', settings.ogTitle);
        updateMeta('name', 'twitter:description', settings.ogDescription);

        // Inject Scripts
        if (settings.gtmId) injectGTM(settings.gtmId);
        if (settings.gaId) injectGA(settings.gaId);
        if (settings.fbPixel) injectFBPixel(settings.fbPixel);
        if (settings.tiktokPixel) injectTikTok(settings.tiktokPixel);

        // Note: robots.txt and sitemap.xml are physical paths and cannot be injected via JS tag.
        // The backend should serve them at /robots.txt and /sitemap.xml directly based on DB.

        console.log('[SEO] ✅ Dynamic SEO injected successfully (Title, Meta, Pixels).');
    } catch (err) {
        console.error('[SEO] ❌ Failed to load dynamic SEO settings:', err);
    }
}

function updateMeta(attrBase: 'name' | 'property', attrValue: string, content: string) {
    if (!content) return;
    let meta = document.querySelector(`meta[${attrBase}="${attrValue}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrBase, attrValue);
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
}

function injectGTM(gtmId: string) {
    if (document.getElementById('dynamic-gtm-script')) return;
    const script = document.createElement('script');
    script.id = 'dynamic-gtm-script';
    script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `;
    document.head.insertBefore(script, document.head.firstChild);

    if (!document.getElementById('dynamic-gtm-noscript')) {
        const noscript = document.createElement('noscript');
        noscript.id = 'dynamic-gtm-noscript';
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(noscript, document.body.firstChild);
    }
}

function injectGA(gaId: string) {
    if (document.getElementById('dynamic-ga-script')) return;
    const script1 = document.createElement('script');
    script1.id = 'dynamic-ga-script';
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}');
  `;
    document.head.appendChild(script2);
}

function injectFBPixel(fbId: string) {
    if (document.getElementById('dynamic-fb-script')) return;
    const script = document.createElement('script');
    script.id = 'dynamic-fb-script';
    script.innerHTML = `
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${fbId}');
    fbq('track', 'PageView');
  `;
    document.head.appendChild(script);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${fbId}&ev=PageView&noscript=1"/>`;
    document.head.appendChild(noscript);
}

function injectTikTok(tiktokId: string) {
    if (document.getElementById('dynamic-tiktok-script')) return;
    const script = document.createElement('script');
    script.id = 'dynamic-tiktok-script';
    script.innerHTML = `
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
      ttq.load('${tiktokId}');
      ttq.page();
    }(window, document, 'ttq');
  `;
    document.head.appendChild(script);
}
