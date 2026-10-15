import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MantineProvider } from '@mantine/core'
import App from '../src/App'
import { sortedProjects, validHttpUrl, validateContact } from '../src/utils'

const shared = vi.hoisted(() => ({ email: '', send: vi.fn() }))
vi.mock('../src/components/Scene', () => ({ default: () => <div data-testid="scene" /> }))
vi.mock('@emailjs/browser', () => ({ default: { send: shared.send } }))
vi.mock('../src/content', async (load) => {
  const actual = await load()
  return { ...actual, profile: { ...actual.profile, get email() { return shared.email } } }
})
beforeEach(() => { shared.email = ''; shared.send.mockReset(); window.location.hash = '#inicio' })
function mount(hash = '#inicio') { window.location.hash = hash; return render(<MantineProvider><App /></MantineProvider>) }

describe('Portfólio', () => {
  it('opens all five pages through URL hash navigation', async () => {
    mount()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Matheus')
    const titles = [['#sobre', 'Uma trajetória em evolução.'], ['#projetos', 'Ideias que viram código.'], ['#experiencias', 'Aprender fazendo. E vivendo.'], ['#contato', 'Vamos trocar uma ideia?']]
    for (const [hash, title] of titles) {
      window.location.hash = hash
      fireEvent(window, new HashChangeEvent('hashchange'))
      await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(title))
    }
  })
  it('switches the biography to English and updates the document language', async () => {
    mount('#sobre')
    await userEvent.click(screen.getByText('EN', { selector: 'span' }))
    expect(screen.getByText(/I am a Software Engineering student at PUC Minas/)).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
  })
  it('shows the real project and its technologies without inventing repositories', () => {
    mount('#projetos')
    expect(screen.getByRole('heading', { name: /Chatbot Inteligente/ })).toBeInTheDocument()
    expect(screen.getByText('Supabase')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Repositório/ })).not.toBeInTheDocument()
  })
  it('keeps email delivery disabled when configuration is missing', () => {
    mount('#contato')
    expect(screen.getByRole('button', { name: 'Envio indisponível' })).toBeDisabled()
    expect(shared.send).not.toHaveBeenCalled()
  })
  it('validates fields, reports delivery failure, and then confirms successful sending', async () => {
    shared.email = 'owner@example.com'
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'test_service')
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'test_template')
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_test_key')
    mount('#contato')
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))
    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument()
    expect(shared.send).not.toHaveBeenCalled()
    await user.type(screen.getByLabelText(/Seu nome/), 'Pessoa Teste')
    await user.type(screen.getByLabelText(/^E-mail/), 'visitor@example.com')
    await user.type(screen.getByLabelText(/Sua mensagem/), 'Quero conversar sobre um projeto real.')
    shared.send.mockRejectedValueOnce(new Error('Network failure'))
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível enviar'))
    shared.send.mockResolvedValueOnce({ status: 200 })
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Mensagem enviada'))
    expect(shared.send).toHaveBeenLastCalledWith('test_service', 'test_template', expect.objectContaining({ reply_to: 'visitor@example.com', to_email: 'owner@example.com' }), { publicKey: 'public_test_key' })
    expect(screen.getByLabelText(/Sua mensagem/)).toHaveValue('')
  })
})
describe('Data handling', () => {
  it('sorts ISO dates from earliest to latest without mutating content', () => {
    const data = [{ id: 'b', date: '2026-10-12' }, { id: 'a', date: '2025-02-01' }]
    expect(sortedProjects(data).map((item) => item.id)).toEqual(['a', 'b'])
    expect(data[0].id).toBe('b')
  })
  it('rejects script links and blank or invalid contact fields', () => {
    expect(validHttpUrl('javascript:alert(1)')).toBe(false)
    expect(validHttpUrl('https://github.com/example/project')).toBe(true)
    expect(Object.keys(validateContact({ name: ' ', email: 'invalid', message: 'short' }, 'pt'))).toHaveLength(3)
  })
})
