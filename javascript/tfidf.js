var documentIndex = {};
var tokenIndex = {};

function addDocument(tokens) {
  var documentId = Object.keys(documentIndex).length;
  documentIndex[documentId] = tokens;
  tokens.forEach(function(token) {
    if (token in tokenIndex) {
      if (documentId in tokenIndex[token]) {
        tokenIndex[token][documentId] += 1;
      } else {
        tokenIndex[token][documentId] = 1;
      }
    } else {
      tokenIndex[token] = {};
      tokenIndex[token][documentId] = 1;
    }
  });
  return documentId;
}

function search(token) {
  var results = Object.keys(tokenIndex[token]).map(function(documentId) {
    return { 'documentId': documentId };
  });
  results.forEach(function(result) {
    tf = tokenIndex[token][result.documentId] / documentIndex[result.documentId].length;
    idf = Math.log(Object.keys(documentIndex).length / Object.keys(tokenIndex[token]).length);
    result['score'] = tf * idf;
    result['body'] = documentIndex[result.documentId];
  });

  results.sort(function(a, b) {
    return b.score - a.score;
  });
  return results;
}
