import haystack
from haystack.document_stores import OpenSearchDocumentStore
from haystack.nodes.retriever.multimodal import MultiModalRetriever
import os
from haystack import Document
from haystack import Pipeline
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

class MultimodalSearch:
    def __init__(self):
        self.document_store = OpenSearchDocumentStore(
            host="localhost",
            port=9200,
            username="admin",
            password="123_ZXCvbn123",
            embedding_dim=512,
            scheme="https",
        )

        self.doc_dir = "train"
        
        if (self.document_store.get_embedding_count() != len(os.listdir(f"./{self.doc_dir}"))):
            images = [
                Document(content=f"./{self.doc_dir}/{filename}", content_type="image")
                for filename in os.listdir(f"./{self.doc_dir}")
            ]

            self.document_store.write_documents(images)

            self.retriever_text_to_image = MultiModalRetriever(
                document_store=self.document_store,
                query_embedding_model="sentence-transformers/clip-ViT-B-32-multilingual-v1",
                query_type="text",
                document_embedding_models={"image": "sentence-transformers/clip-ViT-B-32"},
            )

            self.document_store.update_embeddings(retriever=self.retriever_text_to_image, update_existing_embeddings=False)
        else:
            self.retriever_text_to_image = MultiModalRetriever(
                document_store=self.document_store,
                query_embedding_model="sentence-transformers/clip-ViT-B-32-multilingual-v1",
                query_type="text",
                document_embedding_models={"image": "sentence-transformers/clip-ViT-B-32"},
            )

        self.pipeline = Pipeline()
        self.pipeline.add_node(component=self.retriever_text_to_image, name="retriever_text_to_image", inputs=["Query"])

    def get_total_results(self):
        search_result = self.document_store.get_document_count()
        return search_result

    def __getitem__(self, key):
        return self.__dict__[key]

    def clear_database(self):
        self.document_store.delete_documents("document")

    def search(self, query, top_k=10):
        results = self.pipeline.run(query=query, params={"retriever_text_to_image": {"top_k": top_k}})
        sorted_results = sorted(results["documents"], key=lambda d: d.score, reverse=True)
        total_results = self.get_total_results()
        return sorted_results, total_results

    def search_by_image(self, image_path, top_k=10):
        """Ищет похожие изображения, используя загруженное изображение."""
        results = self.pipeline.run(query={"query": image_path, "query_type": "image"}, params={"top_k": top_k})
        sorted_results = sorted(results["documents"], key=lambda d: d.score, reverse=True)
        total_results = self.get_total_results()
        return sorted_results, total_results

    def add_photo(self, photo_path):
        images = [
            Document(content=f"./train/{photo_path}", content_type="image")
        ]

        self.document_store.write_documents(images)
        
        self.retriever_text_to_image = MultiModalRetriever(
            document_store=self.document_store,
            query_embedding_model="sentence-transformers/clip-ViT-B-32-multilingual-v1",
            query_type="text",
            document_embedding_models={"image": "sentence-transformers/clip-ViT-B-32"},
        )

        self.document_store.update_embeddings(retriever=self.retriever_text_to_image, update_existing_embeddings=False)
