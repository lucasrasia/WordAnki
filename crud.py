from models import Palavra, Status
from datetime import date, timedelta

def criar_palavra(session, nome, traducao, frase):
    palavra= Palavra(nome=nome, traducao=traducao, frase=frase)
    session.add(palavra)
    session.commit()
    return palavra

def criar_status(session, word_id):
    status=Status(word_id=word_id, due_date=date.today(), step=0)
    session.add(status)
    session.commit()
    return status

