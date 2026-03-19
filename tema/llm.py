from openai import OpenAI
from config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)


def chama_llm(prompt):
#Aqui é enviada a pergunta para o Chatgpt alem de descrever coisas como o modelo utilizado. Retorna a resposta dada pelo chatgpt
    respota = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )
    return respota.choices[0].message.content