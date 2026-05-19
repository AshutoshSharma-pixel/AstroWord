import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const base = 'https://www.astroword.in';
    const now = new Date();

    return [
        {
            url: base,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
        },

        {
            url: `${base}/darakaraka`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${base}/atmakaraka`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${base}/amatyakaraka`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${base}/gana`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${base}/manglik`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${base}/dasha-calculator`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${base}/birth-tithi-calculator`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${base}/marriage-type`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${base}/marriage-year`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${base}/spouse-initial`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${base}/marriage-report`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.95,
        },
        {
            url: `${base}/blog`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${base}/blog/what-is-darakaraka`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/blog/atmakaraka-meaning`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/blog/when-will-i-get-married-astrology`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/blog/love-or-arranged-marriage-astrology`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/blog/gana-matching-vedic-astrology`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/blog/d9-navamsa-chart-explained`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/blog/what-is-amatyakaraka`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/blog/gana-matching-marriage`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/blog/spouse-name-initial-nakshatra`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/blog/what-is-jaimini-astrology`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/blog/mars-7th-house-marriage`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/blog/venus-in-vedic-astrology`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/blog/rahu-in-7th-house`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/daily-horoscope`,
            lastModified: now,
            changeFrequency: 'always',
            priority: 0.95,
        },
    ];
}
