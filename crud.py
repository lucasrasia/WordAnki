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

def deletar_palavra(session, nome):
    palavara_del=session.query(Palavra).filter_by(nome=nome).first()
    session.delete(palavara_del)
    session.commit()
    return

def palavras_revisar(session):
    resultado=session.query(Palavra).join(Status).filter_by(Status.due_date<=date.today()).all()
    return resultado

def pos_estudo(session, resposta, word_id):  #resposta = fácil/difícil/errei
    intervalo=[1, 3, 7, 14, 30, 90] # cada índice é um nível de conhecimento
    status_word=session.query(Status).filter(Status.word_id==word_id).first()
    if not status_word:
        raise ValueError("Status não encontrado")
    if resposta=="fácil":
        status_word.step=0
    if resposta=="dificil":
        ...
    else:       #errei
        status_word.step=0  #aparecer na próxima sessão
    status_word.due_date=date.today()+status_word.step
    session.commit()
    return status_word