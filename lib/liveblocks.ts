import { createClient, Client } from '@liveblocks/client'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var liveblocksclient: Client | undefined
}

if (!global.liveblocksclient) {
  const client = createClient({
    publicApiKey:
      'pk_dev_1opWzWgMGKHl6jA-EGmTbarw4Hvh6caCzKQZxWN4O49QX2dj8rzUWNuSokTG0gkc',
  })
  global.liveblocksclient = client
}

export const client = global.liveblocksclient
