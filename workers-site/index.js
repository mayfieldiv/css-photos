import { getAssetFromKV, serveSinglePageApp } from "@cloudflare/kv-asset-handler"

addEventListener("fetch", (event) => {
  try {
    event.respondWith(getAssetFromKV(event, { mapRequestToAsset: serveSinglePageApp }))
  } catch (e) {
    event.respondWith(new Response(e.message || e.toString(), { status: 500 }))
  }
})
