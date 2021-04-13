import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async(): Promise<Connection> => {
  const isNodeEnvSet = process.env.NODE_ENV
  const defaultOptions = await getConnectionOptions()

  const type = isNodeEnvSet ? 'sqlite' : defaultOptions.type
  const database = isNodeEnvSet 
    ? './src/__tests__/db_test.sqlite'
    : defaultOptions.database

  return createConnection(
    Object.assign(defaultOptions, {
      type,
      database
    })
  )
}
