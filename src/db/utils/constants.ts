/**
 * Copyright 2020 jhaemin
 *
 * Refresh DB
 *
 * This file is automatically generated
 * by the script "refresh-db".
 * Do not modify this file manually.
 * If there comes a situation where this file
 * should move to other place,
 * please update the source "src/dev/refresh-db.js".
 */

export type DbTableNames =
  | 'admin'
  | 'board'
  | 'cafeteria_menu'
  | 'change_password'
  | 'comment'
  | 'coverage_major'
  | 'coverage_major_lecture'
  | 'inquiry'
  | 'lecture'
  | 'pending_user'
  | 'period'
  | 'post'
  | 'refresh_token'
  | 'user'

export const DbTables: Record<DbTableNames, DbTableNames> = {
  admin: 'admin',
  board: 'board',
  cafeteria_menu: 'cafeteria_menu',
  change_password: 'change_password',
  comment: 'comment',
  coverage_major: 'coverage_major',
  coverage_major_lecture: 'coverage_major_lecture',
  inquiry: 'inquiry',
  lecture: 'lecture',
  pending_user: 'pending_user',
  period: 'period',
  post: 'post',
  refresh_token: 'refresh_token',
  user: 'user',
}
