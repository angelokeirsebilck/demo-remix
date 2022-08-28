import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { defaultLang } from '../../config'

// note: to prevent errors [like this](https://discord.com/channels/770287896669978684/771068344320786452/921025522299981914)
export const action: ActionFunction = async () => {
    return redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 307)
}

export const loader: LoaderFunction = async () => {
    return redirect(`/${defaultLang}`)
}
