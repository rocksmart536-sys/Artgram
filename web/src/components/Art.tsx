export const demoImage = (hue: number) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},80%,62%)"/><stop offset="1" stop-color="hsl(${(hue + 60) % 360},70%,22%)"/></linearGradient></defs><rect width="200" height="260" fill="url(#g)"/><circle cx="100" cy="105" r="42" fill="#fdf9f6" opacity=".85"/><path d="M30 260c10-70 50-90 70-90s60 20 70 90z" fill="#0b0a14" opacity=".55"/></svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

type Props = { src?: string; hue: number; ratio?: string; round?: number; className?: string }
export default function Art({ src, hue, ratio = '4/5', round = 16, className = '' }: Props) {
  return <img className={'art ' + className} src={src ?? demoImage(hue)} alt="" style={{ aspectRatio: ratio, borderRadius: round }} />
}

export function Avatar({ hue, src }: { hue: number; src?: string; size?: number }) {
  return <Art hue={hue} src={src} ratio="1" round={999} className="avatar" />
}
