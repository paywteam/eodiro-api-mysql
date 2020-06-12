import { DataTypes, Model } from 'sequelize'

import { PrimaryAIAttribute } from '../utils/model-attributes'
import { TipTopic } from '@prisma/client'
import { createInitModelFunction } from '../create-init-model'
import prisma from '@/modules/prisma'

export const topicDict: { [key: string]: string } = {
  'school': '학교생활',
  'interview': '면접',
  'etc': '기타',
}

export type TipResponse = {
  id: number
  topic: TipTopic
  userId: number
  title: string
  body: string
  randomNickname: string
  isArchived: boolean
  createdAt: Date
  editedAt: Date
  tipLikes: number
  tipBookmarks: number
}

export type TipListResponse = {
  id: number
  topic: TipTopic
  title: string
  randomNickname: string
  isArchived: boolean
  createdAt: Date
  editedAt: Date
  tipLikes: number
  tipBookmarks: number
}

export class Tip extends Model {
  static getTopicDisplay(key: string): string {
    return topicDict[key]
  }

  static async like(userId: number, tipId: number): Promise<boolean> {
    await prisma.tipLike.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        tip: {
          connect: {
            id: tipId,
          },
        },
      },
    })
    return true
  }

  static async unlike(userId: number, tipId: number): Promise<boolean> {
    await prisma.tipLike.delete({
      where: {
        userId: userId,
        tipId: tipId,
      },
    })
    return false
  }

  static async bookmark(userId: number, tipId: number): Promise<boolean> {
    await prisma.tipBookmark.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        tip: {
          connect: {
            id: tipId,
          },
        },
      },
    })
    return true
  }

  static async cancelBookmark(userId: number, tipId: number): Promise<boolean> {
    await prisma.tipBookmark.delete({
      where: {
        userId: userId,
        tipId: tipId,
      },
    })
    return false
  }
}

export const getTip = createInitModelFunction(Tip, 'tip', {
  id: PrimaryAIAttribute,
  topic: {
    type: DataTypes.ENUM,
    values: ['school', 'interview', 'etc'],
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  random_nickname: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  is_archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_removed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  edited_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
})