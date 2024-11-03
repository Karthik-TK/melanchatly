from fastapi import APIRouter
from langchain_chroma import Chroma
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

router = APIRouter()


# Load and split documents
def load_documents(url):
    loader = WebBaseLoader(url)
    data = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
    return text_splitter.split_documents(data)


# Initialize vector store
def create_vector_store(docs):
    local_embeddings = OllamaEmbeddings(model="nomic-embed-text")
    return Chroma.from_documents(documents=docs, embedding=local_embeddings)


# Function to format documents
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


# Define the FastAPI endpoint
@router.get("/v1/chat/query")
def query_approach_to_rag(question: str, url: str = ""):
    # Load documents (example URL; replace with your actual URL)
    docs = load_documents(
        url
        if url != "" or url is None
        else "https://lilianweng.github.io/posts/2023-06-23-agent/"
    )
    vectorstore = create_vector_store(docs)

    # Set up the RAG prompt
    RAG_TEMPLATE = """
    You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.
    
    <context>
    {context}
    </context>
    
    Answer the following question:
    
    {question}"""

    rag_prompt = ChatPromptTemplate.from_template(RAG_TEMPLATE)

    # Similarity search
    retriever = vectorstore.as_retriever()
    chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | rag_prompt
        | ChatOllama(model="llama3.1:8b")  # Use your model here
        | StrOutputParser()
    )

    # Run the chain
    answer = chain.invoke(question)
    return {"answer": answer}
