// app/api/image/[fileId]/route.ts
import { Readable } from "stream"; // Node.js stream
import { drive } from "@/libs/googleapis";

export async function GET(
  _: unknown,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;

    // 1️⃣ 取得 Node.js 串流
    const resp = await drive.files.get(
      { fileId: fileId, alt: "media" },
      { responseType: "stream" }
    );
    const nodeStream = resp.data as Readable;

    // 2️⃣ 轉為 DOM Web ReadableStream<Uint8Array>
    const webStream = new ReadableStream({
      start(controller) {
        nodeStream.on("data", (chunk) => controller.enqueue(chunk));
        nodeStream.on("end", () => controller.close());
        nodeStream.on("error", (err) => controller.error(err));
      },
    });

    // 3️⃣ 取得 MIME type
    const meta = await drive.files.get({
      fileId: fileId,
      fields: "mimeType",
    });
    const contentType = meta.data.mimeType ?? "application/octet-stream";

    // 4️⃣ 回傳原生 Response（accept DOM ReadableStream）
    return new Response(webStream, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("🚨 Proxy image error", err);
    return new Response("Cannot fetch image", { status: 500 });
  }
}
