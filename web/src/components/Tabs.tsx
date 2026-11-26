type Props = { items: string[]; value: string; onChange: (v: string) => void }
export default function Tabs({ items, value, onChange }: Props) {
  return (
    <div className="tabs">
      {items.map(i => (
        <button key={i} className={'tab' + (i === value ? ' on' : '')} onClick={() => onChange(i)}>{i}</button>
      ))}
    </div>
  )
}
