from models import Palavra, Status
from datetime import date, timedelta
from sqlalchemy import or_

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
    resultado = (session.query(Palavra, Status).join(Status).filter(or_(Status.due_date <= date.today(),Status.due_date == date.today() + timedelta(days=1))).all())
    return resultado

def avaliar(session, resposta, word_id):  #resposta = fácil/difícil/errei
    intervalo=[1, 2, 3, 5, 7, 10, 14, 20, 25, 30] # cada índice é um nível de conhecimento
    status_word=session.query(Status).filter(Status.word_id==word_id).first()
    if not status_word:
        raise ValueError("Status não encontrado")
    if resposta=="facil":
        if status_word.step < len(intervalo)-1:
            status_word.step += 1
    elif resposta=="dificil":
        if status_word.step>0: # não exceder limite
            status_word.step -= 1
    else:       #errei
        status_word.step=0  #aparecer na próxima sessão
    status_word.due_date = date.today() + timedelta(days=intervalo[status_word.step])
    session.commit()
    return status_word

def editar(session, id, nome=None, traducao=None, frase=None):
    palavra_edit=session.query(Palavra).filter(Palavra.id==id).first()
    if not palavra_edit:
        raise ValueError("Palavra não encontrada")
    if nome: 
        palavra_edit.nome=nome
    if traducao: 
        palavra_edit.traduacao=traducao 
    if frase:
        palavra_edit.frase=frase
    session.commit()
    return palavra_edit