import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const base = 'https://astroword.in';
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

    ];
}
