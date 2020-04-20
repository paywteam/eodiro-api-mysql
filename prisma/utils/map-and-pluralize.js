const fs = require('fs')
const pluralize = require('pluralize')
const { pascalCase, camelCase } = require('change-case')
const prismaSchema = require('./prisma-schema-path').file
const schemaPath = require('./prisma-schema-path').prismaSchemaPath
const blockRegExp = /^model [a-zA-Z_]*? {[\s\S]*?}/gm
const models = []

let model
while ((model = blockRegExp.exec(prismaSchema))) {
  models.push(model[0])
}

const processedSchema = prismaSchema.replace(blockRegExp, (model) => {
  const lines = model.split('\n')
  const firstLine = lines[0]
  const modelName = /^model ([a-zA-Z_]*?) {/g.exec(firstLine)[1]
  const pascalModelName = pascalCase(modelName)
  const modelMap = `@@map(name: "${modelName}")`

  // Not pascal-cased model
  if (modelName !== pascalModelName) {
    // Insert empty line after properties if needed
    if (!lines[lines.length - 2].trim().startsWith('@')) {
      lines.splice(lines.length - 1, 0, '')
    }

    // Change model name
    lines[0] = `model ${pascalModelName} {`
    // Insert model @@map
    lines.splice(lines.length - 1, 0, `  ${modelMap}`)
  }

  // Loop through properties
  let blockOptLineIndex
  for (let i = 1; i < lines.length; i += 1) {
    const l = lines[i].trim()

    // Ends of properties
    if (l.length === 0 || l.startsWith('@')) {
      if (l.length === 0) {
        blockOptLineIndex = i + 1
      } else if (l.startsWith('@')) {
        blockOptLineIndex = i
      }
      break
    }

    const relationRegExp = /^(\S*)( +)(\1)(\[\])?/g
    let newLine = l

    if (l.match(relationRegExp)) {
      // Relations

      newLine = l.replace(
        relationRegExp,
        (match, prop, spaces, relation, arrNotation) => {
          // p1 and p3 is the same
          const camel = camelCase(prop)
          const pascal = pascalCase(prop)

          return (
            (arrNotation ? pluralize(camel) : camel) +
            spaces +
            pascal +
            (arrNotation || '')
          )
        }
      )
    } else {
      // General model properties

      newLine = l.replace(/^(\S*)(.*)/g, (match, prop, rest) => {
        const camel = camelCase(prop)

        if (prop === camel) {
          return match
        } else {
          return camelCase(prop) + rest + ` @map(name: "${prop}")`
        }
      })
    }

    lines[i] = '  ' + newLine
  }

  // Turn to camelCase inside [...] (relations, ids, etc.)
  const newSchema = lines.join('\n').replace(/\[(.*?)\]/gi, (match, props) => {
    return (
      '[' +
      props
        .split(',')
        .map((prop) => camelCase(prop.trim()))
        .join(', ') +
      ']'
    )
  })

  return newSchema
})

fs.writeFileSync(schemaPath, processedSchema, {
  encoding: 'utf8',
})
