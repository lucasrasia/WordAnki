from sqlalchemy.orm import Session
from crud import criar_palavra, criar_status, deletar_palavra, avaliar, palavras_revisar
from models import Palavra, Status
from database import session

from fastapi import FastAPI, HTTPException, status, Path
from typing import Optional
from pydantic import BaseModel  #"Espero receber json"

app=FastAPI()

#criar palavra
class NovaPalavra(BaseModel):   #o React retorna em json: {"nome": "apple", "traducao": "maçã", "frase": "I eat an apple"}
    nome: str
    traducao: str
    frase: str

@app.post('Palavras')
def criar(dados: NovaPalavra):
    print(dados.nome)
    print(dados.traducao)
    return{'ok': True}