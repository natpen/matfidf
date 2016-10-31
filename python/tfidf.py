#!/usr/bin/env python

from math import log
from collections import defaultdict


class tfidf:
    def __init__(self):
        self.documents = {}
        self.tokens = defaultdict(lambda: defaultdict(int))

    def add_document(self, tokens):
        document_id = len(self.documents)
        self.documents[document_id] = tokens
        for token in tokens:
            self.tokens[token][document_id] += 1
        return document_id

    def search(self, token):
        results = [{
            'document_id': document_id
        } for document_id in self.tokens[token].keys()]

        for result in results:
            document_id = result['document_id']
            tf = float(self.tokens[token][document_id]) / len(self.documents[
                document_id])
            idf = log(float(len(self.documents)) / len(self.tokens[token]))
            result['score'] = tf * idf
            result['body'] = self.documents[document_id]

        results.sort(reverse=True, key=lambda result: result['score'])
        return results
