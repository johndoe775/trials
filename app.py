import os
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from langchain.agents import initialize_agent, Tool
from langchain_community.utilities import GoogleSerperAPIWrapper
from langchain.agents import AgentType

load_dotenv()
groq = os.environ.get("groq")
serper_api_key = os.environ.get("serper")
llm = ChatGroq(temperature=0, api_key=groq, model_name="meta-llama/llama-4-maverick-17b-128e-instruct")

search = GoogleSerperAPIWrapper(serper_api_key=serper_api_key)
tools = [
    Tool(
        name="Intermediate Answer",
        func=search.run,
        description="Use this tool to search for information on the web.",
    )
]


def generate(topics_list):
    # Ensure topics_list is a string or join list items if it's a list
    if isinstance(topics_list, list):
        topics_list = ', '.join(topics_list)

    prompt = f"""
    Collect the latest news articles from the web about the following topics:
    {topics_list}
    and summarize them in a single paragraph.

    ## inputs
    {topics_list} 
    """
    
    prompt_template = PromptTemplate(
        input_variables=["topics_list"],
        template=prompt,
    )
    
    chain = prompt_template|llm  # Directly use llm as the chain
    agent = initialize_agent(
        tools, chain, agent=AgentType.SELF_ASK_WITH_SEARCH, verbose=True
    )  # Ensure tools and AgentType are defined
    
    response = agent.run()
    return response
