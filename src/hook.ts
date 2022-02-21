import type { Handle } from "@sveltejs/kit";

export const handle = async ({ request, resolve }) => {
  if (request.query.has("method")) {
    request.method = request.query.get("method").toUpperCase();
  }

  const response = await resolve(request);
  return response;
};