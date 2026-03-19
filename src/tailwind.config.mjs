/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.025em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.025em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.6', letterSpacing: '0.03em', fontWeight: '600' }],
                '2xl': ['1.5rem', { lineHeight: '1.6', letterSpacing: '0.03em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '0.04em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '800' }],
                '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.05em', fontWeight: '800' }],
                '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '0.06em', fontWeight: '900' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '0.06em', fontWeight: '900' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.07em', fontWeight: '900' }],
            },
            fontFamily: {
                heading: "marcellus",
                paragraph: "open sans"
            },
            colors: {
                buttonbackground: '#D4AF9F',
                buttonforeground: '#FFFFFF',
                textlight: '#E8DFD5',
                textbody: '#F5F3F0',
                bordersubtle: '#E0D5CC',
                foreground: '#F5F3F0',
                destructive: '#E8796B',
                destructiveforeground: '#FFFFFF',
                background: '#FAF8F5',
                secondary: '#C9A88B',
                'secondary-foreground': '#FFFFFF',
                'primary-foreground': '#3D3D3D',
                primary: '#FFFBF7',
                // Angelic & spiritual accent colors - light, warm, ethereal
                'angel-gold': '#E8C9A0',       // Soft gold - divine light
                'angel-cream': '#F5EFE7',      // Warm cream - purity
                'angel-blush': '#E8D5CC',      // Soft blush - warmth
                'angel-sage': '#D4C9B8',       // Gentle sage - peace
                'angel-ivory': '#FFFBF7',      // Ivory white - holiness
                'angel-rose': '#E8C9C0',       // Soft rose - compassion
                'angel-pearl': '#F0E8E0',      // Pearl - grace
                'angel-dove': '#E0D5CC',       // Dove gray - serenity
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
