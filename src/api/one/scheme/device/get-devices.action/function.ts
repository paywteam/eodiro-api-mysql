import { Action } from './interface'
import { OneApiFunction } from '@/api/one/scheme/types/utils'
import prisma from '@/modules/prisma'

const func: OneApiFunction<Action> = async ({ userId }) => {
  const devices = await prisma.device.findMany({
    where: {
      userId,
    },
  })

  return {
    err: null,
    data: devices,
  }
}

export default func