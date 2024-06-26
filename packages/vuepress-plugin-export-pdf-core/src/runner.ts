import process from 'node:process'
import type { CAC } from 'cac'
import cac from 'cac'

import pkg from '../package.json'

export type { CAC } from 'cac'

export function beforeParse(cliInstance: CAC) {
  // display cli version, display help message
  cliInstance.version(pkg.version).help()
}

export function afterParse(cliInstance: CAC) {
  if (!process.argv.slice(2).filter(Boolean).length)
    cliInstance.outputHelp()
}

/**
 * Parse CLI.
 * @param programName - Name of program
 */
export function runCli(programName: string) {
  try {
    // create cac instance
    const program = cac(programName)
    return (registerCommands: typeof beforeParse) => {
      registerCommands(program)

      beforeParse(program)
      program.parse(process.argv)
      afterParse(program)
    }
  }
  catch (error) {
    process.exit(1)
  }
}
