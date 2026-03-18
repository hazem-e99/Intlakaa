import api from '@/lib/api';

export interface SocialLink {
    icon: string;
    url: string;
    label: string;
}

export interface ContactInfo {
    icon: string;
    label: string;
    text: string;
    href: string;
}

export interface SeoSettings {
    siteTitle: string;
    metaDescription: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    ogUrl: string;
    googleConsole: string;
    robotsTxt: string;
    sitemap: string;
    gtmId: string;
    gaId: string;
    fbPixel: string;
    tiktokPixel: string;
    socialLinks: SocialLink[];
    contactInfo: ContactInfo[];
}

/**
 * Fetch current SEO settings from the backend.
 */
export const fetchSeoSettings = async (): Promise<SeoSettings> => {
    console.log('[SEO] 🔄 Fetching SEO settings from backend...');
    const { data } = await api.get('/seo');
    console.log('[SEO] ✅ Fetched successfully:', data.data);
    return data.data as SeoSettings;
};

/**
 * Save SEO settings to the backend.
 * The backend will automatically update index.html as well.
 */
export const saveSeoSettings = async (
    settings: Partial<SeoSettings>
): Promise<SeoSettings> => {
    console.log('[SEO] 💾 Saving SEO settings to backend...', settings);
    const { data } = await api.put('/seo', settings);
    console.log('[SEO] ✅ Saved successfully:', data.data);
    return data.data as SeoSettings;
};

/**
 * Sync: re-read index.html on the server and overwrite the DB record.
 * Call this once to import any pre-existing pixel IDs from the HTML file.
 */
export const syncSeoFromHtml = async (): Promise<SeoSettings> => {
    console.log('[SEO] 🔁 Syncing SEO settings from index.html...');
    const { data } = await api.post('/seo/sync');
    console.log('[SEO] ✅ Sync successful:', data.data);
    return data.data as SeoSettings;
};
