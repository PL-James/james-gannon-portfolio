interface Env {
  RESEND_API_KEY: string
}

interface ContactBody {
  name: string
  email: string
  message: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  try {
    const body = (await context.request.json()) as ContactBody

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers,
      })
    }

    if (!isValidEmail(body.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers,
      })
    }

    if (body.message.length > 5000) {
      return new Response(JSON.stringify({ error: 'Message too long' }), {
        status: 400,
        headers,
      })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <no-reply@policywonk.xyz>',
        to: 'james@policywonk.xyz',
        subject: `Portfolio Contact: ${body.name}`,
        text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
        reply_to: body.email,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers,
      })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers })
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers,
    })
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
