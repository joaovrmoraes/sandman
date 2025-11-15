import type { DreamModel } from '../models/dream-model'
import type { MessageModel } from '../models/message-model'
export interface DreamRepository {
  getDreamNumber: (message: MessageModel[]) => Promise<DreamModel>
}
