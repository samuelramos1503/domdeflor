export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const response = await env.ASSETS.fetch(new URL('/index.html', request.url));
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      newHeaders.set('Pragma', 'no-cache');
      newHeaders.set('Expires', '0');
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers: newHeaders });
    }
    const assetResponse = await env.ASSETS.fetch(request);
    const assetHeaders = new Headers(assetResponse.headers);
    assetHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    return new Response(assetResponse.body, { status: assetResponse.status, statusText: assetResponse.statusText, headers: assetHeaders });
  }
};
