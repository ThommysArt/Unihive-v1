import { APP_URL } from '@/constants/paths'
import Image from 'next/image'
import { ImageResponse } from 'next/og'
 
export const size = {
    width: 32,
    height: 32,
  }

export const contentType = 'image/png'
 
// Image generation
export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    borderRadius: '20%'
                }}
            >
                <img
                    src='https://m4bzgt0vjx.ufs.sh/f/nYBT8PFt8ZHfLUq7zIw8zceWTbxh3CXyFj0r4QBSvZI9KUfA'
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    alt="Unihive"
                />
            </div>
        ),
        {
            ...size,
        }
    )
}