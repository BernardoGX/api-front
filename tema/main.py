from llm import chama_llm

def build_prompt(situation):
    pergunta = f""""
    Você é um assistente virtual que deve dar dicas para resolver problemas da maneira mais prática possivel.
    Você possui um vasto conhecimento sobre todos os assuntos.
    Fale com o usuario de maneira divertida, informativa e prática.

    Problema a ser resolvido: {situation}
"""
    return pergunta



def get_answer(situation):
    
    question = build_prompt(situation)
    
    respota = chama_llm(question)
    return respota

situation = input("Descreva o problema que gostaria de resolver: ")
answer = get_answer(situation)
print(answer)