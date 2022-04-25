export interface Widget {
  title: string
  type: string
}

export interface FormItem {
  id: string
  type: string
}

export interface DropResult {
  removedIndex: number | null
  addedIndex: number | null
  payload?: any
}

export interface SectionChildren {
  id: string
  children: SectionChildrenItem[]
}

export interface Section {
  id: string
  spacing: {}
  type: string
  columnActive: number
  children: SectionChildren[]
}

export interface SectionChildrenItem {
  content: string[]
  id: string
}

export type SectionData = Section[]

export interface Page {
  id: string
  _id: string
  path: string
  pageName: string
  status: boolean
  sections: Section[]
}

export type PageList = Page[]
