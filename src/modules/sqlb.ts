/**
 * SqlB - Simple query builder
 * Copyright 2020 jhaemin
 */

import { TableNames } from '@/database/table-names'
import mysql from 'mysql'
import sqlFormatter from 'sql-formatter'

type Order = 'ASC' | 'asc' | 'DESC' | 'desc'
type SqlBValue = number | string | undefined
type SqlBNullableValue = SqlBValue | null
type KeyValue<T> = {
  [K in keyof T]?: T[K]
}

export class SqlBInstance<T = any> {
  private q = ''

  /**
   * Add a space at the end
   */
  private space(): void {
    this.q = this.q ? this.q.concat(' ') : this.q
  }

  /**
   * Append query with a space before
   */
  private append(appendingQuery: string): void {
    this.space()
    this.concat(appendingQuery)
  }
  /**
   * Concatenate string without a space
   */
  private concat(str: string): void {
    this.q = this.q.concat(str)
  }

  private wrap(text: string, wrapper: 'singleQuote' | 'parentheses'): string {
    let left: string, right: string
    switch (wrapper) {
      case 'singleQuote':
        left = "'"
        right = "'"
        break
      case 'parentheses':
        left = '('
        right = ')'
        break
    }

    return left + text + right
  }

  private singleQuotify(text: string): string {
    return text.replace(/"/g, "'")
  }

  /**
   * Convert `undefined` to '?' and escape others
   */
  private convert(data: number | string | undefined): number | string {
    let convertedData: number | string
    const escaped = mysql.createConnection({}).escape(data)

    if (typeof data === 'undefined') {
      convertedData = '?'
    } else if (data === null) {
      convertedData = 'NULL'
    } else {
      convertedData = escaped
    }

    return convertedData
  }

  build(terminate = false): string {
    const built = terminate ? this.q.trim().concat(';') : this.q.trim()
    this.q = ''
    return built
  }

  /**
   * Format the output. Use this after `build()`.
   */
  format(): SqlBInstance<T> {
    this.q = sqlFormatter.format(this.q)

    return this
  }

  raw(str: string): SqlBInstance<T> {
    this.append(str)

    return this
  }

  bind(alias?: string): SqlBInstance<T> {
    this.q = `(${this.q})`

    if (alias) {
      this.append(alias)
    }

    return this
  }

  /**
   * Select columns from table. If you specify a generic schema type,
   * it only allows the keys of the given type.
   * Use
   * @param what Array of strings or SqlB instances. Empty will select all.
   */
  select(...what: Array<keyof T | '*' | SqlBInstance>): SqlBInstance<T> {
    if (what.length === 0) {
      what = ['*']
    }

    const attrs = what
      .map((col) => {
        if (col instanceof SqlBInstance) {
          return col.build()
        } else {
          return col
        }
      })
      .join(', ')

    this.append(`SELECT ${attrs}`)

    return this
  }
  /**
   * Don't use this method alone.
   * Run `select()` or `selectAny()` first.
   */
  alsoSelect(...what: Array<keyof T | '*' | SqlBInstance>): SqlBInstance<T> {
    this.concat(',')
    this.select(...what)
    return this
  }
  selectAny(...what: string[]): SqlBInstance<T> {
    this.append(`SELECT ${what.join(', ')}`)
    return this
  }
  /**
   * Don't use this method alone.
   * Run `select()` or `selectAny()` first.
   */
  alsoSelectAny(...what: string[]): SqlBInstance<T> {
    this.concat(',')
    this.selectAny(...what)
    return this
  }

  distinctSelect(
    ...what: (keyof T | '*' | SqlBInstance<T>)[]
  ): SqlBInstance<T> {
    if (what.length === 0) {
      what = ['*']
    }

    const attrs = what
      .map((w) => {
        if (w instanceof SqlBInstance) {
          return w.build()
        } else {
          return w
        }
      })
      .join(', ')

    this.append(`SELECT DISTINCT ${attrs}`)

    return this
  }

  as(alias: string): SqlBInstance<T> {
    this.q = this.wrap(this.q, 'parentheses')
    this.append(`AS ${alias}`)

    return this
  }

  from(): SqlBInstance<T>
  from(target: string): SqlBInstance<T>
  from(target: TableNames): SqlBInstance<T>
  from(target: SqlBInstance<T>): SqlBInstance<T>
  from(target?: SqlBInstance<T> | string | TableNames): SqlBInstance<T> {
    if (!target) {
      this.append(`FROM`)
    } else if (typeof target === 'string') {
      this.append(`FROM ${target}`)
    } else {
      this.append(`FROM ${target.build()}`)
    }

    return this
  }

  where(): SqlBInstance<T>
  where(conditions: string): SqlBInstance<T>
  where(conditions: SqlBInstance<T>): SqlBInstance<T>
  where(conditions?: SqlBInstance<T> | string): SqlBInstance<T> {
    if (!conditions) {
      this.append(`WHERE`)
    } else if (typeof conditions === 'string') {
      this.append(`WHERE ${this.singleQuotify(conditions)}`)
    } else {
      this.append(`WHERE ${this.singleQuotify(conditions.build())}`)
    }

    return this
  }

  join(
    schema1: TableNames | string,
    schema2: TableNames | string
  ): SqlBInstance<T> {
    this.append(`${schema1} JOIN ${schema2}`)

    return this
  }

  on(condition?: string): SqlBInstance<T> {
    if (condition) {
      this.append(`ON ${condition}`)
    } else {
      this.append(`ON`)
    }

    return this
  }

  in(attr: keyof T, values: SqlBValue[]): SqlBInstance<T> {
    this.append(`${attr} IN (${values.join(', ')})`)
    return this
  }

  equal(attr: keyof T, value: SqlBValue): SqlBInstance<T> {
    this.append(`${attr} = ${this.convert(value)}`)

    return this
  }

  andEqual(attr: keyof T, value: SqlBValue): SqlBInstance<T> {
    this.and()
    this.equal(attr, value)

    return this
  }

  notEqual(attr: keyof T, value: SqlBValue): SqlBInstance<T> {
    this.append(`${attr} != ${this.convert(value)}`)
    return this
  }

  andNotEqual(attr: keyof T, value: SqlBValue): SqlBInstance<T> {
    this.and()
    this.notEqual(attr, value)
    return this
  }

  /** attr >= value */
  equalOrMore(attr: keyof T, value: SqlBValue): SqlBInstance<T> {
    this.append(`${attr} >= ${this.convert(value)}`)
    return this
  }
  /** AND attr >= value */
  andEqualOrMore(attr: keyof T, value: SqlBValue): SqlBInstance<T> {
    this.and()
    this.equalOrMore(attr, value)
    return this
  }

  /** attr <= value */
  equalOrLess(attr: keyof T, value: SqlBValue): SqlBInstance<T> {
    this.append(`${attr} <= ${this.convert(value)}`)
    return this
  }
  /** AND attr <= value */
  andEqualOrLess(attr: keyof T, value: SqlBValue): SqlBInstance<T> {
    this.and()
    this.equalOrLess(attr, value)
    return this
  }

  /** attr > value */
  more(attr: keyof T, value: SqlBValue): SqlBInstance<T> {
    this.append(`${attr} > ${this.convert(value)}`)
    return this
  }
  /** AND attr > value */
  andMore(attr: keyof T, value: SqlBValue): SqlBInstance<T> {
    this.and()
    this.more(attr, value)
    return this
  }

  /** attr < value */
  less(attr: keyof T, value: SqlBValue): SqlBInstance<T> {
    this.append(`${attr} < ${this.convert(value)}`)
    return this
  }

  group(by: keyof T): SqlBInstance<T> {
    this.append(`GROUP BY ${by}`)
    return this
  }

  order(attr: keyof T, direction: Order = 'asc'): SqlBInstance<T> {
    this.append(`ORDER BY ${attr} ${direction.toUpperCase()}`)
    return this
  }

  multiOrder(options: [keyof T, Order][]): SqlBInstance<T> {
    this.append(`ORDER BY`)
    this.append(
      options
        .map((option) => {
          return `${option[0]} ${option[1].toUpperCase()}`
        })
        .join(', ')
    )

    return this
  }

  limit(amount: number, offset?: number): SqlBInstance<T> {
    if (!amount) return this
    this.append(`LIMIT ${this.convert(amount)}`)
    if (offset) this.append(`OFFSET ${this.convert(offset)}`)
    return this
  }

  like(column: keyof T, keyword: string): SqlBInstance<T> {
    this.append(`${column} LIKE ${this.convert(keyword)}`)
    return this
  }

  insert(
    schema: string,
    items: {
      [K in keyof T]?: string | number | null | undefined
    },
    ignore?: boolean
  ): SqlBInstance<T> {
    const targetsQuery = Object.keys(items).join(', ')
    const values = Object.values(items as Record<string, number | string>).map(
      (val) => {
        return this.convert(val)
      }
    )
    const valuesQuery = values.join(', ')

    this.append(
      `INSERT${ignore ? ' IGNORE' : ''} INTO ${schema} ${this.wrap(
        targetsQuery,
        'parentheses'
      )} VALUES${this.wrap(valuesQuery, 'parentheses')}`
    )

    return this
  }

  insertBulk(
    schema: string,
    items: {
      [K in keyof T]?: string | number | null | undefined
    }[],
    ignore?: boolean
  ): SqlBInstance<T> {
    // Analyze first element
    this.append(`INSERT${ignore ? ' IGNORE' : ''} INTO ${schema}`)

    const firstItem = items[0]
    const keys = Object.keys(firstItem)

    this.append(`(${keys.join(', ')}) VALUES`)

    this.append(
      items
        .map((item) => {
          return `(${keys
            .map((key) => {
              return this.convert(item[key])
            })
            .join(', ')})`
        })
        .join(', ')
    )

    return this
  }

  update(
    schema: string,
    items: {
      [K in keyof T]?: string | number | null | undefined
    }
  ): SqlBInstance<T> {
    const setQuery = Object.keys(items)
      .map((key) => {
        return `${key} = ${this.convert(items[key])}`
      })
      .join(', ')

    this.append(`UPDATE ${schema} SET ${setQuery}`)

    return this
  }

  delete(): SqlBInstance<T> {
    this.append('DELETE')
    return this
  }

  when(): SqlBInstance<T> {
    this.append('WHEN')
    return this
  }

  notExists(sqlB: SqlBInstance<T>): SqlBInstance<T> {
    this.append(`NOT EXISTS (${sqlB.build()})`)
    return this
  }

  and(sql?: string | SqlBInstance<T>): SqlBInstance<T> {
    this.append(`AND`)
    if (sql) {
      if (sql instanceof SqlBInstance) {
        sql = sql.build()
      }
      this.append(sql)
    }
    return this
  }

  or(sql?: string | SqlBInstance<T>): SqlBInstance<T> {
    this.append(`OR`)
    if (sql) {
      if (sql instanceof SqlBInstance) {
        sql = sql.build()
      }
      this.append(sql)
    }
    return this
  }
}

export default function SqlB<T = any>(): SqlBInstance<T> {
  return new SqlBInstance<T>()
}

// Utility function that escapes any value
// using node mysql's escape method
SqlB.escape = (value: any) => {
  return mysql.createConnection({}).escape(value)
}
