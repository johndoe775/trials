from app import llm, generate


topics_list = "trump tariffs"

response = generate(topics_list)
print(response)
