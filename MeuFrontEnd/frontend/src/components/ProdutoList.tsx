import { useState } from 'react'
import { type Produto } from '../types/Produto'
import { getFotoUrl } from '../utils/Formatadores'
import ModalFoto from './produtos/ModalFoto'

interface Props {
  produtos: Produto[]
  loading: boolean
  onExcluir: (id: number) => void
  onEditar: (produto: Produto) => void
}

function ProdutoList({ produtos, loading, onExcluir, onEditar }: Props) {
  const [produtoModal, setProdutoModal] = useState<Produto | null>(null)

  if (loading) {
    return <p className="carregando">Carregando...</p>
  }

  if (!Array.isArray(produtos) || produtos.length === 0) {
    return <p className="sem-produtos">Nenhum produto cadastrado ainda.</p>
  }

  return (
    <>
      <div className="tabela-produtos">
        <div className="tabela-cabecalho">
          <span>Nome</span>
          <span>Estoque</span>
          <span>Preço</span>
          <span>Ações</span>
        </div>

        <ul className="lista-produtos">
          {produtos.map(p => (
            <li key={p.Id} className="item-produto">
              {/* ✅ NOVO: Thumbnail da foto */}
              <div
                className="thumbnail-container"
                onClick={() => p.Foto && setProdutoModal(p)}
                style={{
                  cursor: p.Foto ? 'pointer' : 'default',
                  marginRight: 12,
                  flexShrink: 0
                }}
              >
                {p.Foto ? (
                  <>
                    <img
                      src={getFotoUrl(p.Foto)}
                      alt={p.Nome}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 8,
                        border: '1px solid #ddd'
                      }}
                    />
                    {/* Ícone de lupa sobre a foto */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        background: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10
                      }}
                    >
                      🔍
                    </div>
                  </>
                ) : (
                  /* Placeholder para produto sem foto */
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      background: '#f0f0f0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#bbb',
                      borderRadius: 8,
                      border: '1px solid #ddd'
                    }}
                  >
                    <span style={{ fontSize: 20 }}>📷</span>
                    <span style={{ fontSize: 9 }}>sem foto</span>
                  </div>
                )}
              </div>

              {/* ✅ NOMES COM MAIÚSCULA AQUI */}
              <span className="nome-produto">{p.Nome}</span>
              <span className={`estoque-produto ${p.Estoque === 0 ? 'estoque-zero' : ''}`}>
                {p.Estoque}
              </span>
              <span className="preco-produto">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(p.Preco)}
              </span>
              <div className="acoes-produto">
                <button className="btn-editar" onClick={() => onEditar(p)}>
                  ✏️ Editar
                </button>
                <button className="btn-excluir" onClick={() => onExcluir(p.Id)}>
                  🗑️ Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ NOVO: Modal de foto ampliada */}
      {produtoModal && (
        <ModalFoto
          produto={produtoModal}
          onClose={() => setProdutoModal(null)}
        />
      )}
    </>
  )
}

export default ProdutoList