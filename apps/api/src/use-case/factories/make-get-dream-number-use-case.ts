import { GptProvider } from '../../repositories/provider/dreams-gpt'
import { GetDreamNumbers } from '../get-dream-numbers'

export function makeGetDreamNumberUseCase() {
  const gptProvider = new GptProvider()
  const useCase = new GetDreamNumbers(gptProvider)

  return useCase
}
