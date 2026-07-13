from sqlalchemy import create_engine, Column, String, Integer,  Date, ForeignKey
from datetime import date, timedelta

from database import Base, engine
# As tabelas
class Palavra(Base): #nome no singular, na tabela fica "palavras" -> importante para usar ForeignKey 
    __tablename__ = "palavras"                                             
    id= Column("id", Integer, primary_key=True, autoincrement=True) 
    nome= Column("nome", String)
    traducao= Column("tradução", String)
    frase= Column("frase", String) 

class Status(Base):
    __tablename__ = "status"
    id=Column("id", Integer, primary_key=True, autoincrement=True)
    word_id=Column(Integer, ForeignKey("palavras.id"), unique=True)
    due_date=Column(Date, default=date.today) #data que a palavra deve aparecer
    step=Column(Integer, default=0) #intervalo

Base.metadata.create_all(bind=engine) #cria as tabelas dentro do db

