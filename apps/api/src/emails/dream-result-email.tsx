import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components'
import type { DreamModel } from '../models/dream-model'

interface DreamResultEmailProps {
  dreamResult: DreamModel
}

const mockDreamResult: DreamModel = {
  dreamAnalogy:
    'Sonhar com água cristalina simboliza clareza emocional e paz interior. É um sinal de que você está em harmonia consigo mesmo e com o mundo ao seu redor.',
  luckyNumbers: [
    { number: 7, description: 'Número da sorte universal' },
    { number: 14, description: 'Representa equilíbrio e harmonia' },
    { number: 23, description: 'Número associado à sorte e sucesso' },
    { number: 32, description: 'Símbolo de transformação e mudança' },
    { number: 45, description: 'Número que traz prosperidade' },
    { number: 56, description: 'Representa intuição e sabedoria' },
  ],
}

export default function DreamResultEmail({ dreamResult = mockDreamResult }: DreamResultEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>✨ Seus números da sorte dos sonhos chegaram!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header com gradiente */}
          <Section style={header}>
            <Heading style={h1}>✨ Seus Números da Sorte</Heading>
            <Text style={subtitle}>
              Transforme seus sonhos em números da sorte
            </Text>
          </Section>

          {/* Seção de interpretação */}
          <Section style={dreamSection}>
            <Heading style={h2}>🌙 Interpretação Mística</Heading>
            <Text style={dreamText}>{dreamResult.dreamAnalogy}</Text>
          </Section>

          {/* Números da sorte */}
          <Section style={numbersSection}>
            <Heading style={h2}>🎲 Seus números dos sonhos</Heading>
            
            {dreamResult.luckyNumbers.map((num, index) => (
              <Row key={index} style={numberRow}>
                <Column style={numberCircleColumn}>
                  <table cellPadding="0" cellSpacing="0" border={0}>
                    <tbody>
                      <tr>
                        <td style={numberCircle}>
                          <Text style={numberText}>{num.number}</Text>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Column>
                <Column style={numberLabelColumn}>
                  <Text style={numberLabel}>{num.description}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footer}>
              Boa sorte! 🍀
            </Text>
            <Text style={footerSmall}>
              Obrigado por usar o Numero dos Sonhos.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#0f0b1f',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '20px 0',
  margin: '0',
  width: '100%',
}

const container = {
  backgroundColor: '#1a1430',
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  width: '100%',
  borderRadius: '24px',
  overflow: 'hidden',
  border: '1px solid rgba(168, 145, 220, 0.2)',
}

const header = {
  background: 'linear-gradient(135deg, #2d1f4a 0%, #3d2f5a 50%, #4d2a5f 100%)',
  padding: '40px 40px 32px',
  textAlign: 'center' as const,
  width: '100%',
}

const h1 = {
  color: '#f3f0ff',
  fontSize: '36px',
  fontWeight: '700',
  margin: '0 0 8px',
  lineHeight: '1.2',
}

const subtitle = {
  color: '#c4b5fd',
  fontSize: '16px',
  margin: '0',
  lineHeight: '1.5',
}

const h2 = {
  color: '#f3f0ff',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 20px',
  lineHeight: '1.3',
}

const dreamSection = {
  backgroundColor: 'rgba(139, 92, 246, 0.1)',
  borderRadius: '16px',
  padding: '24px',
  margin: '24px',
  border: '1px solid rgba(168, 145, 220, 0.15)',
  width: 'calc(100% - 48px)',
}

const dreamText = {
  color: '#e9d5ff',
  fontSize: '16px',
  lineHeight: '1.6',
  fontStyle: 'italic' as const,
  margin: '0',
}

const numbersSection = {
  padding: '24px',
  width: '100%',
}

const numberRow = {
  marginBottom: '16px',
  width: '100%',
}

const numberCircleColumn = {
  width: '70px',
  verticalAlign: 'middle' as const,
  paddingRight: '16px',
}

const numberCircle = {
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(168, 145, 220, 0.25), rgba(219, 112, 193, 0.25))',
  border: '2px solid rgba(168, 145, 220, 0.4)',
  textAlign: 'center' as const,
  verticalAlign: 'middle' as const,
  padding: '0',
  display: 'inline-block',
}

const numberText = {
  color: '#f3f0ff',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0',
  lineHeight: '56px',
  display: 'block',
}

const numberLabelColumn = {
  verticalAlign: 'middle' as const,
  paddingLeft: '0',
}

const numberLabel = {
  color: '#f0abfc',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
  lineHeight: '1.4',
}

const footerSection = {
  textAlign: 'center' as const,
  padding: '32px 24px',
  borderTop: '1px solid rgba(168, 145, 220, 0.1)',
  width: '100%',
}

const footer = {
  color: '#c4b5fd',
  fontSize: '16px',
  margin: '0 0 8px',
  fontWeight: '500',
}

const footerSmall = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
}
