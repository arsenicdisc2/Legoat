if (navigator.userAgent.includes("Firefox")) {
  Object.defineProperty(globalThis, "crossOriginIsolated", {
    value: true,
    writable: false
  });
}
function skipProxy(url) {
  try {
    const host = new URL(url).hostname;
    return host === "cdn.jsdelivr.net" || host.endsWith(".jsdelivr.net") || host === "luminsdk.com" || host.endsWith(".luminsdk.com") || host === "cdnjs.cloudflare.com" || host.endsWith(".cdnjs.cloudflare.com") || host === "fonts.googleapis.com" || host === "fonts.gstatic.com" || host === "www.googletagmanager.com";
  } catch {
    return false;
  }
}
importScripts("qkpfm4.js");
importScripts("woqfx/aqxzvy.js");
addEventListener("install", () => self.skipWaiting());
addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
addEventListener("fetch", (e) => {
  if (_1f6zr2k.shouldRoute(e)) {
    e.respondWith(_1f6zr2k.route(e));
    return;
  }
  if (_5ds99mk.shouldRoute(e)) {
    e.respondWith(_5ds99mk.route(e));
    return;
  }
  if (skipProxy(e.request.url)) return;
});
addEventListener("push", (e) => {
  let data = {};
  try {
    data = e.data ? e.data.json() : {};
  } catch {
    data = { title: "Cherri", body: e.data ? e.data.text() : "" };
  }
  const url = typeof data.url === "string" ? data.url : "/chat";
  e.waitUntil(
    self.registration.showNotification(data.title || "Cherri", {
      body: data.body || "",
      tag: data.tag || void 0,
      data: { url }
    })
  );
});
addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = new URL(e.notification.data && e.notification.data.url || "/chat", self.location.origin).href;
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (new URL(client.url).origin === self.location.origin && "focus" in client) {
          client.navigate(url).catch(() => {
          });
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
