function getDepth(query) {
    let depth = 0;
    let maxDepth = 0;
    for (let i = 0; i < query.length; i++) {
        if (query[i] === '{') depth++;
        else if (query[i] === '}') depth--;
        if (depth > maxDepth) maxDepth = depth;
    }
    return maxDepth;
}

function graphqlDepthCheck(r) {
    try {
        let body = r.requestText;
        if (!body) { r.return(400, "Missing request body"); return; }

        let parsed;
        try {
            parsed = JSON.parse(body);
        } catch(e) {
            r.return(400, "Invalid JSON in request body"); return;
        }

        if (!parsed.query) { r.return(400, "Missing GraphQL query"); return; }

        let depth = getDepth(parsed.query);
        const MAX_DEPTH = 5;

        if (depth > MAX_DEPTH) {
            r.return(400, "GraphQL query too deep (depth=" + depth + ")");
            return;
        }

        r.internalRedirect("@backend");
    } catch(e) {
        r.return(400, "Error processing request: " + e.message);
    }
}

export default { graphqlDepthCheck };

