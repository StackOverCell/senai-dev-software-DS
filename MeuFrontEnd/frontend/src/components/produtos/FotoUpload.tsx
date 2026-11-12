import { useState } from 'react'
import { produtoService } from '../../services/ProdutoService'
import { getFotoUrl } from '../../utils/Formatadores'

interface Props {
  produtoId: number
  fotoAtual?: string | null
  onAtualizar: (novaFoto: string | null) => void
}

function FotoUpload({ produtoId, fotoAtual, onAtualizar }: Props) {
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  function handleSelecionar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    
    setArquivo(file)
    setPreview(URL.createObjectURL(file))
    setErro(null)
  }

  async function handleSalvar() {
    if (!arquivo) return
    
    try {
      setCarregando(true)
      setErro(null)
      
      const nomeArquivo = await produtoService.uploadFoto(produtoId, arquivo)
      
      setArquivo(null)
      setPreview(null)
      
      onAtualizar(nomeArquivo)
      
    } catch (err) {
      setErro('Erro ao salvar a foto.')
    } finally {
      setCarregando(false)
    }
  }

  async function handleRemover() {
    if (!window.confirm('Deseja remover a foto do produto?')) return
    
    try {
      setCarregando(true)
      
      await produtoService.removerFoto(produtoId)
      
      onAtualizar(null)
      
    } catch (err) {
      setErro('Erro ao remover a foto.')
    } finally {
      setCarregando(false)
    }
  }

  const imgSrc = preview ?? (fotoAtual ? getFotoUrl(fotoAtual) : null)

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      padding: 16,
      marginTop: 16
    }}>
      <h4 style={{ margin: '0 0 12px', color: '#1a3d5c' }}>
         Foto do produto
      </h4>

      {imgSrc && (
        <img
          src={imgSrc}
          alt="Foto do produto"
          style={{
            width: 120,
            height: 120,
            objectFit: 'cover',
            borderRadius: 8,
            display: 'block',
            marginBottom: 12
          }}
        />
      )}

      {erro && (
        <p style={{ color: '#e53935', fontSize: 13, margin: '8px 0' }}>
          {erro}
        </p>
      )}

      <input
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleSelecionar}
        disabled={carregando}
        style={{ fontSize: 13 }}
      />

      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        {arquivo && (
          <button
            onClick={handleSalvar}
            disabled={carregando}
            style={{
              background: '#1a3d5c',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              cursor: carregando ? 'not-allowed' : 'pointer',
              opacity: carregando ? 0.6 : 1
            }}
          >
            {carregando ? 'Salvando...' : 'Salvar foto'}
          </button>
        )}

        {fotoAtual && !arquivo && (
          <button
            onClick={handleRemover}
            disabled={carregando}
            style={{
              background: '#fdeded',
              color: '#e53935',
              border: '1px solid #e53935',
              borderRadius: 6,
              padding: '8px 16px',
              cursor: carregando ? 'not-allowed' : 'pointer',
              opacity: carregando ? 0.6 : 1
            }}
          >
            Remover foto
          </button>
        )}
      </div>
    </div>
  )
}

export default FotoUpload