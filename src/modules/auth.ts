import User from '@/db/user'
import crypto from 'crypto'
import EodiroMailer from '@/modules/eodiro-mailer'
import { SignUpTemplate } from '@/modules/eodiro-mailer/templates'

export interface SignInInfo {
  portalId: string
  password: string
}

export interface SignUpInfo {
  portalId: string
  password: string
  nickname: string
}

export default class Auth {
  static encryptPw(password: string): string {
    return crypto
      .createHash('sha256')
      .update(password)
      .digest('base64')
  }

  static generatePendingToken(): string {
    return crypto.randomBytes(20).toString('hex')
  }

  static async verifyPendingUser(token: string): Promise<boolean> {
    if (!token) {
      console.error('No token given')
      return false
    }

    const user = await User.findWithToken(token)

    if (!user) {
      return false
    }

    // Successfully verified
    const pendingUserId = user.id
    const transferResult = await User.transferPendingUser(pendingUserId)

    return transferResult
  }

  /**
   * Validate CAU portal email id
   */
  static isValidPortalIdFormat(portalId: string): boolean {
    const emailRegExp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    const portalIdRegExp = new RegExp(/@cau\.ac\.kr$/)
    if (!emailRegExp.exec(portalId) || !portalIdRegExp.exec(portalId)) {
      // Invalid
      return false
    } else {
      return true
    }
  }

  /**
   * Minimum password length is 12
   */
  static isValidPassword(password: string): boolean {
    return password.length >= 12
  }

  /**
   * Check duplication of portal id
   */
  static async isValidPortalId(portalId: string): Promise<boolean> {
    const user = await User.findWithAttrFromAll('portal_id', portalId)
    return user ? false : true
  }

  /**
   * Check duplication of nickname
   */
  static async isValidNickname(nickname: string): Promise<boolean> {
    const user = await User.findWithAttrFromAll('nickname', nickname)
    return user ? false : true
  }

  static async signIn(session, info: SignInInfo): Promise<boolean> {
    let { portalId, password } = info

    portalId = portalId.trim()
    password = password.trim()

    if (!portalId || !password) {
      return false
    }

    const user = await User.findWithPortalIdAndPw(portalId, password)

    return user ? true : false
  }

  static async signUp(info: SignUpInfo): Promise<boolean> {
    let { portalId, password, nickname } = info
    // Trim information
    portalId = portalId.trim()
    password = password.trim()
    nickname = nickname.trim()

    // Check the condition

    // Check the validity of portal email
    if (
      !this.isValidPortalIdFormat(portalId) ||
      !this.isValidPortalId(portalId) ||
      !this.isValidNickname(nickname) ||
      !this.isValidPassword(password)
    ) {
      return false
    }

    // Available
    // There's no user with this portal ID yet
    // Generate hash and send a verification email
    const verificationCode = await User.addPendingUser({
      portalId,
      password,
      nickname
    })

    if (verificationCode) {
      EodiroMailer.sendMail({
        to: portalId,
        subject: '어디로 인증 이메일입니다',
        html: SignUpTemplate(verificationCode)
      })
    }

    return true
  }

  static signOut(session: Express.Session): void {
    session.destroy(err => {
      console.error(err)
    })
  }
}
