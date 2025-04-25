from app import llm, generate

response = llm.invoke("What is the capital of France?")
assert "paris" in response.content.lower()



