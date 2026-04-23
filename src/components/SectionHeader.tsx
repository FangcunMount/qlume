type SectionHeaderProps = {
  kicker: string
  title: string
  description: string
}

export function SectionHeader({ kicker, title, description }: SectionHeaderProps) {
  return (
    <div className="section-head reveal">
      <div className="section-kicker">{kicker}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
