
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
    const { message, history = [] } = await req.json();

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 5000
    ) {
      return Response.json(
        { error: "Vui lòng nhập nội dung hợp lệ." },
        { status: 400 }
      );
    }

    const input = [
      {
        role: "system",
        content:
          "Bạn là TAMAI AI, chuyên gia thiết kế hình xăm. Luôn trả lời bằng tiếng Việt. Hỗ trợ khách hàng phát triển ý tưởng, chọn phong cách, bố cục, vị trí xăm, màu sắc và viết prompt chuyên nghiệp. Hãy thân thiện, sáng tạo và hỏi lại nếu thiếu thông tin."
      },
      ...history
        .slice(-8)
        .filter(x => ["user", "assistant"].includes(x.role))
        .map(x => ({
          role: x.role,
          content: String(x.content).slice(0, 3000)
        })),
      {
        role: "user",
        content: message.trim()
      }
    ];

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-6-luna",
          input,
          max_output_tokens: 700
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.error?.message || "Lỗi kết nối OpenAI." },
        { status: response.status }
      );
    }

    return Response.json({
      answer: data.output_text || "TAMAI AI chưa có phản hồi."
    });

  } catch (error) {
    return Response.json(
      { error: "Có lỗi xử lý. Vui lòng thử lại." },
      { status: 500 }
    );
  }
};
