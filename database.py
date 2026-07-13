from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base   #cria a sessão 

engine = create_engine("sqlite:///banco.db")    #cria o banco de dados
Session = sessionmaker(bind=engine) #objeto da sessão
session=Session()  #cria a sessão

Base=declarative_base()

def get_session():
    session = Session()
    try:
        yield session
    finally:
        session.close()