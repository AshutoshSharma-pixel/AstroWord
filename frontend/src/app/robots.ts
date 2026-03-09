import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/(auth)/', '/dashboard', '/blog'],
        },
        sitemap: 'https://astroword.in/sitemap.xml',
    };
}
