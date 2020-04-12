import { OneApiError } from '@/api/one/scheme/types/utils'
import { PostAttrs } from '@/database/models/post'

export interface Action {
  data: {
    boardId: number
    lastPostId?: number
    amount?: number
    noBody?: boolean
    columns?: (keyof PostAttrs)[]
  }
  payload: {
    err: OneApiError
    data: (PostAttrs & { comment_count: number; likes: number })[]
  }
}
