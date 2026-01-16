import { NextRequest, NextResponse } from 'next/server'

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const pathname = path.join('/')
  const search = request.nextUrl.search
  const url = `${POSTHOG_HOST}/${pathname}${search}`
  
  try {
    // Get raw body as ArrayBuffer to preserve any encoding
    const body = await request.arrayBuffer()
    
    // Forward relevant headers
    const headers: HeadersInit = {}
    const contentType = request.headers.get('Content-Type')
    if (contentType) {
      headers['Content-Type'] = contentType
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    })

    // Handle 204 No Content responses
    if (response.status === 204) {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    const data = await response.arrayBuffer()
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('PostHog proxy POST error:', error)
    return NextResponse.json(
      { error: 'Proxy error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const pathname = path.join('/')
  const search = request.nextUrl.search
  const url = `${POSTHOG_HOST}/${pathname}${search}`
  
  try {
    const response = await fetch(url, {
      method: 'GET',
    })

    // Handle 204 No Content responses
    if (response.status === 204) {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    const data = await response.arrayBuffer()
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('PostHog proxy GET error:', error)
    return NextResponse.json(
      { error: 'Proxy error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
