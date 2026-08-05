import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'XFlix Movies Review - Watch Free Movies, TV Shows & Asian Dramas in HD';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const spidermanBackdrop = 'https://image.tmdb.org/t/p/w1280/qeQJx07rK2xm8SD2sJxFKhE7gs0.jpg';
  const futuramaBackdrop = 'https://image.tmdb.org/t/p/w780/m9jZ7YhZ6l13aVlK1K8w2xY7Wk0.jpg';
  const odysseyBackdrop = 'https://image.tmdb.org/t/p/w780/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f0f23',
          padding: '32px 40px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: 'white',
          justifyContent: 'space-between',
        }}
      >
        {/* ── Top Header Quick Database Navigation Chips ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              fontSize: '13px',
              fontWeight: '800',
              padding: '8px 16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ✨ Explore Movie Database
          </div>
          <div
            style={{
              backgroundColor: '#14142f',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#fbbf24',
              fontSize: '13px',
              fontWeight: '800',
              padding: '8px 16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ⭐ Top 100 Rated
          </div>
          <div
            style={{
              backgroundColor: '#14142f',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#c4b5fd',
              fontSize: '13px',
              fontWeight: '800',
              padding: '8px 16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            🔥 Movies Review
          </div>
          <div
            style={{
              backgroundColor: '#14142f',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#d4d4d8',
              fontSize: '13px',
              fontWeight: '800',
              padding: '8px 16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            📺 My Watchlist Tracker
          </div>
        </div>

        {/* ── Main Hero Section Grid Layout (Matching Homepage Screenshot!) ── */}
        <div style={{ display: 'flex', gap: '20px', height: '410px', marginTop: '16px' }}>
          {/* Left Big Feature Banner (Spider-Man: Brand New Day) */}
          <div
            style={{
              flex: '1.6',
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '28px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backgroundColor: '#14142f',
            }}
          >
            {/* Background Image Overlay */}
            <img
              src={spidermanBackdrop}
              alt="Spider-Man"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.65,
              }}
            />
            {/* Dark Gradient Backdrop Mask */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, #0a0a18 0%, rgba(10,10,24,0.6) 50%, transparent 100%)',
              }}
            />

            {/* Floating Details */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    backgroundColor: 'rgba(124, 58, 237, 0.9)',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: '900',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    textTransform: 'uppercase',
                  }}
                >
                  ⚡ HOT RELEASE
                </span>
                <span
                  style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.25)',
                    border: '1px solid rgba(245, 158, 11, 0.5)',
                    color: '#fbbf24',
                    fontSize: '11px',
                    fontWeight: '900',
                    padding: '4px 10px',
                    borderRadius: '8px',
                  }}
                >
                  ⭐ 8.0 / 10
                </span>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#a1a1aa' }}>2026</span>
              </div>

              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: '900',
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: 1.25,
                }}
              >
                Official Review & Details: Spider-Man: Brand New Day
              </h2>

              <p
                style={{
                  fontSize: '13px',
                  color: '#d4d4d8',
                  margin: 0,
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                Fighting crime full-time as Spider-Man in a world that doesn&apos;t remember him—and the pressure of seeing his old friends move on without him...
              </p>

              <span style={{ fontSize: '11px', fontWeight: '800', color: '#c4b5fd', marginTop: '4px' }}>
                🎞️ Featured Movie Review • XFlix Database
              </span>
            </div>
          </div>

          {/* Right Side Column (Futurama & The Odyssey Cards) */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Top Right Card: Futurama */}
            <div
              style={{
                flex: 1,
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#14142f',
              }}
            >
              <img
                src={futuramaBackdrop}
                alt="Futurama"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to top, #0a0a18 10%, transparent 90%)',
                }}
              />
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(124, 58, 237, 0.9)',
                      color: 'white',
                      fontSize: '9px',
                      fontWeight: '900',
                      padding: '3px 8px',
                      borderRadius: '6px',
                    }}
                  >
                    TRENDING NEWS
                  </span>
                  <span style={{ color: '#fbbf24', fontSize: '10px', fontWeight: '900' }}>⭐ 8.4</span>
                </div>
                <span style={{ fontSize: '15px', fontWeight: '900', color: 'white' }}>
                  Futurama (1999) - Plot & Cast Overview
                </span>
              </div>
            </div>

            {/* Bottom Right Card: The Odyssey */}
            <div
              style={{
                flex: 1,
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#14142f',
              }}
            >
              <img
                src={odysseyBackdrop}
                alt="The Odyssey"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to top, #0a0a18 10%, transparent 90%)',
                }}
              />
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(79, 70, 229, 0.9)',
                      color: 'white',
                      fontSize: '9px',
                      fontWeight: '900',
                      padding: '3px 8px',
                      borderRadius: '6px',
                    }}
                  >
                    LATEST PREMIERE
                  </span>
                  <span style={{ color: '#fbbf24', fontSize: '10px', fontWeight: '900' }}>⭐ 8.0</span>
                </div>
                <span style={{ fontSize: '15px', fontWeight: '900', color: 'white' }}>
                  The Odyssey (2026) - Plot & Cast Overview
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Airing Leaderboard Bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#14142f',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '12px 24px',
            marginTop: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: '900', color: '#c4b5fd' }}>🏷️ TOP AIRING & RATED</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', fontWeight: '800' }}>
            <span style={{ color: '#fbbf24' }}>#1 Avatar Aang: The Last Airbender (9.3)</span>
            <span style={{ color: '#e4e4e7' }}>#2 Accidental Partners (8.9)</span>
            <span style={{ color: '#e4e4e7' }}>#3 Swapped (8.9)</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}


