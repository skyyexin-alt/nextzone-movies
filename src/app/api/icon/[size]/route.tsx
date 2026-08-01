import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ size: string }> }
) {
  const sizeParam = (await params).size;
  const size = parseInt(sizeParam) || 512;
  const fontSize = size * 0.44;
  const iconSize = size * 0.27;
  
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #8b5cf6, #4f46e5)',
          color: 'white',
          fontSize,
          fontWeight: 900,
          fontFamily: 'sans-serif',
          borderRadius: size * 0.22, // Nice rounded corners for Android/PWA
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: size * 0.04 }}
          >
            <path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/><path d="m16 12 5 3-5 3v-6Z"/>
          </svg>
          XF
        </div>
      </div>
    ),
    { width: size, height: size }
  );
}
