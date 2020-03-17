/**
 * Copyright 2020 jhaemin
 *
 * Refresh One API Schemas & Functions
 *
 * This file is automatically generated
 * by the script "refresh".
 * Do not modify this file manually.
 * If there comes a situation where this file
 * should move to other place,
 * please update the source "dev/refresh.js".
 */

import { FetchPostsOfBoard } from './square/fetch-posts-of-board'
export { FetchPostsOfBoard } from './square/fetch-posts-of-board'
import { FetchRecentPostsOfBoard } from './square/fetch-recent-posts-of-board'
export { FetchRecentPostsOfBoard } from './square/fetch-recent-posts-of-board'
import { GetPostById } from './square/get-post-by-id'
export { GetPostById } from './square/get-post-by-id'
import { UploadPost } from './square/upload-post'
export { UploadPost } from './square/upload-post'
import { Interface as GetCommentsRaw } from './square/get-comments.action/interface'
export type GetComments = GetCommentsRaw & { action: 'getComments' }

export type APIScheme =
  | FetchPostsOfBoard
  | FetchRecentPostsOfBoard
  | GetPostById
  | UploadPost
  | GetComments
