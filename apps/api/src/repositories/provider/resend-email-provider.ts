import { Resend } from 'resend'
import type { EmailRepository } from '../email-repository'
import type { DreamModel } from '../../models/dream-model'
import DreamResultEmail from '../../emails/dream-result-email'
import { render } from '@react-email/render'

export class ResendEmailProvider implements EmailRepository {
  private resend: Resend

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY)
  }

  async sendDreamResult(email: string, dreamResult: DreamModel): Promise<void> {
    try {
      const emailHtml = await render(DreamResultEmail({ dreamResult }))

      await this.resend.emails.send({
        from: 'Oráculo <oraculo@numerodossonhos.com.br>',
        to: email,
        subject: '✨ Seus Números da Sorte dos Sonhos',
        html: emailHtml,
      })

      console.log('[Email] Dream result sent to:', email)
    } catch (error) {
      console.error('[Email] Error sending dream result:', error)
      throw error
    }
  }
}
