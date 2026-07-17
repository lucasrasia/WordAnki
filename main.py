from sqlalchemy.orm import Session
from crud import criar_palavra, criar_status, deletar_palavra, avaliar, palavras_revisar
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

class Revisar(BaseModel):
    nota: str   # facil, dificil, errei

# Rotas 

@app.post('/palavras')
def criar(dados: NovaPalavra, session: Session = Depends(get_session)):
    nova_palavra=criar_palavra(session, dados.nome, dados.traducao, dados.frase)
    criar_status(session, nova_palavra.id)
    return{'message':'palavra criada', 'id':nova_palavra.id, 'nome':nova_palavra.nome}
