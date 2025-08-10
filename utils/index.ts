export function createPageUrl(pageName: string) {
  const routes: Record<string, string> = {
    Home: "/",
    Player: "/player",
    Gallery: "/gallery",
  }
  return routes[pageName] || "/"
}
