import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'XFlix - Movies Review, Ratings, K-Dramas & Recommendations';
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
          backgroundColor: '#0b0b1a',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(124, 58, 237, 0.45) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(217, 70, 239, 0.35) 0%, transparent 55%)',
          padding: '56px 64px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: 'white',
        }}
      >
        {/* Top Header / Branding Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #7c3aed, #d946ef)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                boxShadow: '0 10px 30px rgba(124, 58, 237, 0.6)',
              }}
            >
              🍿
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '38px',
                  fontWeight: '900',
                  letterSpacing: '-1px',
                  color: '#ffffff',
                }}
              >
                XFlix <span style={{ color: '#c4b5fd', fontWeight: '800' }}>Movies Review</span>
              </span>
              <span style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: '700', letterSpacing: '0.5px' }}>
                XFLIX.INK • MOVIE RATINGS & REVIEWS DATABASE
              </span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#fbbf24',
              fontSize: '15px',
              fontWeight: '800',
              padding: '8px 20px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            ⭐ 8.9 / 10 Average Review Score
          </div>
        </div>

        {/* Hero Headline Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '980px', marginTop: '20px' }}>
          <h1
            style={{
              fontSize: '52px',
              fontWeight: '900',
              lineHeight: 1.15,
              margin: 0,
              color: '#ffffff',
            }}
          >
            Honest Movie Reviews, Film Ratings & K-Drama Database
          </h1>
          <p
            style={{
              fontSize: '22px',
              color: '#e4e4e7',
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            Explore top rated blockbusters, audience reviews, actor filmographies, plot summaries, trailers, and personal watchlist tracking on XFlix.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
            marginTop: '24px',
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '13px', color: '#fbbf24', fontWeight: '800', textTransform: 'uppercase' }}>
              ⭐ TOP RATED
            </span>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>
              Top 100 Movies Review
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '13px', color: '#34d399', fontWeight: '800', textTransform: 'uppercase' }}>
              🔥 TRENDING
            </span>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>
              Asian & K-Dramas Review
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '13px', color: '#c4b5fd', fontWeight: '800', textTransform: 'uppercase' }}>
              💬 COMMUNITY
            </span>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>
              Audience Reviews & Watchlist
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

