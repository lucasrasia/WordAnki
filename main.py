from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.orm import sessionmaker, declarative_base  #cria a sessão       cria as tabelas

#linhas padrão
engine=create_engine("sqlite:///banco.db")  #cria o banco de dados
Session=sessionmaker(bind=engine) #objeto da sessão
session=Session()  #cria a sessão

Base=declarative_base()
# As tabelas
class Palavra(Base): #nome no singular, na tabela fica "palavras" -> importante para usar ForeignKey                                              
    id= Column("id", Integer, primary_key=True, autoincrement=True) 
    nome= Column("nome", String)
    traducao= Column("tradução", String)
    frase= Column("frase", String) 

    def __init__( self, nome, traducao, frase):  #estrutura de classes
        self.nome=nome
        self.traducao=traducao
        self.frase=frase

Base.metadata.create_all(bind=engine) #cria as tabelas dentro do db

while True:
    print("Noden termimal")
    print("=====================")
    print("[1] Adicionar palavra")
    acao=input("O que fazer? ")

    if acao=="1":
        print("\nVamos adicionar uma palavras")
        Nome=input("Palavra: ")
        Traducao=input("Tradução: ")
        Frase=input("Frase de contexto: ")
        print()
        if len(Frase)==0:
            word= Palavra(nome=Nome, traducao=Traducao)
            session.add(word)
            session.commit()
            continue
        word= Palavra(nome=Nome, traducao=Traducao, frase=Frase)
        session.add(word)
        session.commit()
    
    lista=session.query(Palavra).all()
    for palavra in lista:
        print(palavra.nome, palavra.traducao)
