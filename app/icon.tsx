import { NextRequest, NextResponse } from "next/server";
import { callApi } from "./apis";
import { getImageURL } from "./libs/function";

export const runtime = "edge";

export default async function Icon(req: NextRequest) {
  const dataLogo = await callApi("/api/logo?populate=*", "get");
  const imageUrl =
    getImageURL(
      dataLogo?.data?.data?.attributes?.Favicon?.data?.attributes?.url
    ) || "/favicon.png"; // Default to a PNG file

  // Determine the Content-Type based on the file extension
  let contentType: string;
  if (imageUrl.endsWith(".ico")) {
    contentType = "image/x-icon";
  } else if (imageUrl.endsWith(".png")) {
    contentType = "image/png";
  } else if (imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")) {
    contentType = "image/jpeg";
  } else {
    contentType = "application/octet-stream"; // Fallback type
  }

  if (imageUrl.startsWith("http")) {
    // If the image URL is remote, fetch it
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${imageUrl}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return new NextResponse(Buffer.from(arrayBuffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
      },
    });
  } else {
    // Serve static file directly from public directory
    return NextResponse.redirect(imageUrl, {
      headers: {
        "Content-Type": contentType,
      },
    });
  }
}
