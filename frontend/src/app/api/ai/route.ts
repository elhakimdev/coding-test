import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const fastApiRes = await fetch('http://localhost:8000/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!fastApiRes.ok) {
      return new Response(JSON.stringify({ error: 'Failed to get response from FastAPI' }), {
        status: fastApiRes.status,
      });
    }

    const reader = fastApiRes.body?.getReader();
    const stream = new ReadableStream({
      start(controller) {
        function push() {
          reader?.read().then(({ done, value }) => {
            if (done) {
              controller.close();
            } else {
              controller.enqueue(value);
              push();
            }
          }).catch((err) => {
            console.error(err);
            controller.error(err);
          });
        }
        push();
      },
    });

    return new Response(stream, { headers: { 'Content-Type': 'text/plain' } });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error connecting to FastAPI' }), { status: 500 });
  }
}
