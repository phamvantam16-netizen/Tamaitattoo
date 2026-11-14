
export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    return Response.json(
      { error: "Chưa cấu hình OpenAI API Key trên Netlify." },
      { status: 503 }
    );
  }

  try {
    const {
      prompt,
      style = "Fine line",
      placement = "Cẳng tay",
      colors = "Đen và xám"
    } = await req.json();

    if (
      typeof prompt !== "string" ||
      !prompt.trim() ||
      prompt.length > 3000
    ) {
      return Response.json(
        { error: "Vui lòng nhập ý tưởng hình xăm hợp lệ." },
        { status: 400 }
      );
    }

    const fullPrompt = `
      Create a professional tattoo design.
      Subject: ${prompt.trim()}.
      Tattoo style: ${style}.
      Body placement: ${placement}.
      Color palette: ${colors}.
      Isolated tattoo artwork on a clean white background.
      Professional tattoo stencil quality.
      Crisp linework, balanced contrast,
      beautiful composition, no watermark.
    `;

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-image-2.5-flare",
          prompt: fullPrompt,
          size: "1024x1024",
          quality: "medium",
          output_format: "png",
          n: 1
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.error?.message || "Không tạo được hình xăm." },
        { status: response.status }
      );
    }

    const image = data.data?.[0]?.b64_json;

    if (!image) {
      return Response.json(
        { error: "AI không trả về hình ảnh." },
        { status: 502 }
      );
    }

    return Response.json({
      image: `data:image/png;base64,${image}`
    });

  } catch (error) {
    return Response.json(
      { error: "Có lỗi khi tạo hình xăm. Vui lòng thử lại." },
      { status: 500 }
    );
  }
};
