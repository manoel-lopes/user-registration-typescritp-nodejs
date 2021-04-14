import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async(): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()
  const isNodeEnvSet = !process.env.NODE_ENV

  const database = isNodeEnvSet 
    ? process.env.TESTS_DB_NAME
    : defaultOptions.database

  return createConnection(
    Object.assign(defaultOptions, {
      database
    })
  )
}
