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

export type RefreshToken = {
  user_id: number
  token: string
  manually_changed_at: number
}

export const refreshTokenFields = ['user_id', 'token', 'manually_changed_at']
