function getRenderableImageUrl(imageUrl) {
  const driveFileMatch =
    /drive\.google\.com\/file\/d\/([^/]+)/.exec(imageUrl ?? "");

  if (!driveFileMatch) return imageUrl;

  return `https://drive.google.com/uc?export=view&id=${driveFileMatch[1]}`;
}

export default async function proxyImage(res, imageUrl) {
  const renderableUrl = getRenderableImageUrl(imageUrl);

  if (!renderableUrl) {
    return res.status(404).send("Image not found.");
  }

  const imageResponse = await fetch(renderableUrl);

  if (!imageResponse.ok) {
    return res.status(502).send("Unable to load the image.");
  }

  const contentType = imageResponse.headers.get("content-type") ?? "";

  if (!contentType.startsWith("image/")) {
    return res.status(502).send("The image source was invalid.");
  }

  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

  res.set({
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=86400",
  });
  return res.send(imageBuffer);
}
