export interface Periodictask {
  label: string
  value: string
}

export type PeriodictaskList = Periodictask[]

export interface Interval {
  every: number
  period: string
}

export interface TaskInfo {
  id?: string
  update_name?: null | string
  crontab?: null | string
  crontab_id?: null | number
  interval?: Interval | null
  interval_id?: number | null
  type: number
  name: string
  task: string
  args: string
  kwargs: string
  queue?: null | string
  exchange?: null | string
  routing_key?: null | string
  headers?: string
  priority?: null | number
  expires?: null | string
  expire_seconds?: null | number
  one_off: boolean
  start_time?: null | string
  enabled: boolean
  last_run_at?: null | string
  total_run_count?: number
  date_changed?: string
  description: string
  solar?: null | string
  clocked?: null | string
}

export type TaskList = TaskInfo[]
