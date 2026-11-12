import { useEffect } from 'react'
import { type Produto } from '../../types/Produto'
import { getFotoUrl, formatarMoeda } from '../../utils/Formatadores'

interface Props {
  produto: Produto
  onClose: () => void
}

function ModalFoto({ produto, onClose }: Props) {
  // Fechar com a tecla Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    // Overlay escuro — clica fora para fechar
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.72)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      {/* Caixa do modal — stopPropagation impede fechar ao clicar dentro */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: 14,
          padding: 24,
          maxWidth: 480,
          width: '90%',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
        }}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 14,
            background: 'none',
            border: 'none',
            fontSize: 22,
            cursor: 'pointer',
            color: '#555'
          }}
        >
          ✕
        </button>

        {/* Foto ampliada */}
        <img
          src={getFotoUrl(produto.Foto)}
          alt={produto.Nome}
          style={{
            width: '100%',
            maxHeight: 340,
            objectFit: 'contain',
            borderRadius: 8,
            display: 'block',
            marginBottom: 16
          }}
        />

        {/* Informações do produto */}
        <h3 style={{ margin: '0 0 4px', color: '#1a3d5c' }}>
          {produto.Nome}
        </h3>
        <p style={{ margin: 0, color: '#2e7d32', fontWeight: 700 }}>
          {formatarMoeda(produto.Preco)}
        </p>
      </div>
    </div>
  )
}

export default ModalFoto