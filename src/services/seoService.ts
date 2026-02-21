import api from '@/lib/api';

export interface SeoSettings {
    siteTitle: string;
    metaDescription: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    googleConsole: string;
    robotsTxt: string;
    sitemap: string;
    gtmId: string;
    gaId: string;
    fbPixel: string;
    tiktokPixel: string;
}

/**
 * Fetch current SEO settings from the backend.
 */
export const fetchSeoSettings = async (): Promise<SeoSettings> => {
    const { data } = await api.get('/seo');
    return data.data as SeoSettings;
};

/**
 * Save SEO settings to the backend.
 * The backend will automatically update index.html as well.
 */
export const saveSeoSettings = async (
    settings: Partial<SeoSettings>
): Promise<SeoSettings> => {
    const { data } = await api.put('/seo', settings);
    return data.data as SeoSettings;
};
