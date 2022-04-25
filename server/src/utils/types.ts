export interface SectionChildItem {
  title: string
}

export interface SectionChildren {
  children: SectionChildItem[]
}

export interface SectionType {
  columnActive: number
  children: [
    {
      children: SectionChildItem[]
    }
  ]
}
