import { NextResponse } from 'next/server';
import { Mistral } from '@mistralai/mistralai';
import logger from '../../../utils/logger';

export async function POST(req: Request) {
  const body = await req.json();

  const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY! });

  try {
    const chatResponse = await mistral.chat.complete({
      model: 'mistral-large-latest',
      messages: body.messages,
    });

    if (!chatResponse.choices || chatResponse.choices.length === 0) {
      return NextResponse.json({ error: 'No response from Mistral' }, { status: 500 })
    }

    return NextResponse.json({
      response: chatResponse.choices[0].message.content,
    });
  } catch (error) {
    logger.error('Mistral API error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
};