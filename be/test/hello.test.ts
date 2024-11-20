import supertest from "supertest"
import web from '../src/app/web'
import { logger } from '../src/app/logger'

describe('GET /', () => {
  it('should succeed', async () => {
    const response = await supertest(web)
      .get('/')

    logger.debug(response.body)
    expect(response.status).toBe(200)
  })
})