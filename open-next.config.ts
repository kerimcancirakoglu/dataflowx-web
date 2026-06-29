import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
// Sadece on-demand (Sanity webhook) revalidation kullanıyoruz → queue GEREKMEZ
// Eğer zaman-bazlı revalidate: N eklenirse şunu açın:
// import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
// defineCloudflareConfig({ incrementalCache: r2IncrementalCache, queue: doQueue })

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
