import { NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";
import logger from "../../../utils/logger";

type TypeMistralError = {
  statusCode?: number;
  message?: string;
};

export async function POST(req: Request) {
  const body = await req.json();

  const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY! });

  try {
    const chatResponse = await mistral.chat.complete({
      model: "mistral-large-latest",
      messages: body.messages,
    });

    if (!chatResponse.choices || chatResponse.choices.length === 0) {
      return NextResponse.json(
        { error: "No response from Mistral" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      response: chatResponse.choices[0].message.content,
    });
  } catch (error) {
    const e = error as TypeMistralError
    logger.error("Mistral API error:", e);

    if (e?.statusCode === 429) {
      return NextResponse.json(
        { e: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { e: "Something went wrong" },
      { status: 500 }
    );
  }
}
