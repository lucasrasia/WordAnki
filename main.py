from sqlalchemy.orm import Session
from crud import criar_palavra, criar_status, deletar_palavra, avaliar, palavras_revisar, editar
from models import Palavra, Status
from database import session, get_session

from fastapi import FastAPI, Depends
from pydantic import BaseModel  #"Espero receber json"

app=FastAPI()
#  Schemas (forato que entra os dados)
class NovaPalavra(BaseModel):   #o React retorna em json: {"nome": "apple", "traducao": "maçã", "frase": "I eat an apple"}
    nome: str
    traducao: str
    frase: str

class PalavraDeletada(BaseModel):
    id: int

class Revisar(BaseModel):
    nota: str   # facil, dificil, errei

class Editar(BaseModel):
    nome: str | None=None
    traducao: str | None=None
    frase: str | None=None

# --Rotas--
# criar palavra 
@app.post('/palavras')
def create(dados: NovaPalavra, session: Session = Depends(get_session)):
    nova_palavra=criar_palavra(session, dados.nome, dados.traducao, dados.frase)
    criar_status(session, nova_palavra.id)
    return{'message':'palavra criada', 'id':nova_palavra.id, 'nome':nova_palavra.nome}

#deletar palavra
@app.delete('/palavras/{word_id}')
def delete(word_id: int, session: Session = Depends(get_session)):
    deletar_palavra(session, word_id)
    return{'message':'palavra deletada', 'id': word_id}

#palavras revisar
@app.get('/palavras/estudar')
def estudar(session: Session = Depends(get_session)):
    resultado=palavras_revisar(session) # lista
    return [
        {
            "id": palavra.id,
            "nome": palavra.nome,
            "traducao": palavra.traducao,
            "frase": palavra.frase,
        }
        for palavra, status in resultado
    ]

#alterar status
@app.post('/palavras/{word_id}/review')
def review(word_id: int, dados: Revisar, session: Session = Depends(get_session)):
    palavra_avaliada=avaliar(session, dados.nota, word_id)
    return {
    'ok': True,
    'nota': dados.nota,
    'palavra': {
        'id': palavra_avaliada.word_id,
        'step': palavra_avaliada.step,
        'due_date': palavra_avaliada.due_date.isoformat(),
    }
}

@app.get('/palavras/analise')
def analise(session: Session = Depends(get_session)):
    palavras=palavras_revisar(session)
    return[
        {
            'id':palavra.id,
            'nome': palavra.nome,
            'step': status.step,
            'due_date': status.due_date,
        }
        for palavra, status in palavras
    ]
    
@app.patch('/palavras/{word_id}')
def eidtar(word_id: int, dados: Editar,session: Session = Depends(get_session)):
    palavra=(session, word_id, dados.nome, dados.traducao, dados.frase)
    return{'id': palavra.id, 'nome': palavra.nome}
