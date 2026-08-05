import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'XFlix - Free Movies, TV Shows & Asian Dramas Discovery Platform';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0f0f23',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.35) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(79, 70, 229, 0.25) 0%, transparent 50%)',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
        }}
      >
        {/* Top Header / Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              boxShadow: '0 10px 25px rgba(124, 58, 237, 0.5)',
            }}
          >
            🎬
          </div>
          <span
            style={{
              fontSize: '40px',
              fontWeight: '900',
              letterSpacing: '-1px',
              color: '#ffffff',
            }}
          >
            XFlix
          </span>
          <span
            style={{
              backgroundColor: 'rgba(124, 58, 237, 0.25)',
              border: '1px solid rgba(167, 139, 250, 0.4)',
              color: '#c4b5fd',
              fontSize: '14px',
              fontWeight: '800',
              padding: '6px 16px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            xflix.ink
          </span>
        </div>

        {/* Hero Title & Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '30px', maxWidth: '960px' }}>
          <h1
            style={{
              fontSize: '54px',
              fontWeight: '900',
              lineHeight: 1.15,
              margin: 0,
              color: '#ffffff',
            }}
          >
            Watch Free Movies, TV Shows & Asian Dramas in HD
          </h1>
          <p
            style={{
              fontSize: '22px',
              color: '#d4d4d8',
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            Explore trending blockbusters, top-rated K-dramas, user reviews, plot summaries, trailer previews, and personal watchlist tracking.
          </p>
        </div>

        {/* Feature Badges Grid at Bottom */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '30px',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '14px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '17px',
              fontWeight: '800',
              color: '#fbbf24',
            }}
          >
            ⭐ Top 100 Rated Movies
          </div>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '14px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '17px',
              fontWeight: '800',
              color: '#34d399',
            }}
          >
            🔥 Trending & Airing Dramas
          </div>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '14px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '17px',
              fontWeight: '800',
              color: '#c4b5fd',
            }}
          >
            💬 Audience Reviews & Watchlist
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
