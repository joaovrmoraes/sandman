import type { DreamModel } from '../models/dream-model'

export interface EmailRepository {
  sendDreamResult(email: string, dreamResult: DreamModel): Promise<void>
}
