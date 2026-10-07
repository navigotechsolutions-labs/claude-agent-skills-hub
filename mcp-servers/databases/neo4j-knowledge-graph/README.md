# Neo4j Knowledge Graph MCP for Claude Code

Connect Claude Code to a [Neo4j](https://neo4j.com) graph database using the
[`mcp-neo4j-cypher`](https://github.com/neo4j-contrib/mcp-neo4j) MCP server.
Once connected, Claude can inspect your graph schema, write Cypher queries from
plain-English questions, and read or write graph data.

## Prerequisites

- **Neo4j 5.x** — local Docker, [Neo4j Desktop](https://neo4j.com/download/), or [Neo4j Aura](https://neo4j.com/cloud/aura/) (free tier works)
- **APOC plugin** enabled (required for schema introspection)
- **[uv](https://docs.astral.sh/uv/)** installed (provides `uvx`)
- **Claude Code** installed

Quick local Neo4j with APOC:

```bash
docker run -d --name neo4j \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/your-password \
  -e NEO4J_PLUGINS='["apoc"]' \
  neo4j:5
```

Browse to http://localhost:7474 to confirm it is running.

## Setup

### Option A — Project config file (`.mcp.json`)

Create `.mcp.json` at your project root (or copy `.mcp.json.example` from this folder):

```json
{
  "mcpServers": {
    "neo4j-cypher": {
      "command": "uvx",
      "args": ["mcp-neo4j-cypher"],
      "env": {
        "NEO4J_URI": "${NEO4J_URI:-bolt://localhost:7687}",
        "NEO4J_USERNAME": "${NEO4J_USERNAME:-neo4j}",
        "NEO4J_PASSWORD": "${NEO4J_PASSWORD}",
        "NEO4J_DATABASE": "${NEO4J_DATABASE:-neo4j}"
      }
    }
  }
}
```

Then export your credentials in the shell you launch Claude Code from:

```bash
export NEO4J_PASSWORD="your-password"
# Aura example:
# export NEO4J_URI="neo4j+s://<your-instance>.databases.neo4j.io"
```

> Never commit real passwords. The `${VAR}` placeholders are expanded by Claude Code at startup.

### Option B — CLI

```bash
claude mcp add neo4j-cypher --scope project \
  -e NEO4J_URI=bolt://localhost:7687 \
  -e NEO4J_USERNAME=neo4j \
  -e NEO4J_PASSWORD=your-password \
  -e NEO4J_DATABASE=neo4j \
  -- uvx mcp-neo4j-cypher
```

Use `--scope user` instead to make the server available in all your projects.

## Cypher Query Tools

The server exposes three tools to Claude:

| Tool | Purpose | Example use |
|------|---------|-------------|
| `get_neo4j_schema` | Lists node labels, relationship types, and properties | "What does my graph look like?" |
| `read_neo4j_cypher` | Runs read-only Cypher (`MATCH … RETURN`) | "Who are Alice's 2nd-degree connections?" |
| `write_neo4j_cypher` | Runs write Cypher (`CREATE`, `MERGE`, `SET`, `DELETE`) | "Add a WORKS_AT relationship from Bob to Acme" |

### Recommended permissions

Auto-approve read tools and keep writes behind a confirmation prompt by adding this
to `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "mcp__neo4j-cypher__get_neo4j_schema",
      "mcp__neo4j-cypher__read_neo4j_cypher"
    ]
  }
}
```

For extra safety, connect with a Neo4j user that has read-only privileges.

## Verify the Connection

1. Start Claude Code in your project: `claude`
2. Run `/mcp` — `neo4j-cypher` should show as **connected**.
3. Ask: `Show me the schema of my Neo4j database.`

## Sample Prompts

Copy these into Claude Code once `neo4j-cypher` shows as connected in `/mcp`.
Replace the text in `<angle brackets>` with your own content.

### Entity Extraction

Claude reads unstructured text, identifies entities and relationships, and writes
them to Neo4j with `write_neo4j_cypher`.

**1. Extract entities from text**

```text
Extract all people, organizations, and locations from the text below.
Show me the entities and relationships you found as a table first, then
after I confirm, write them to Neo4j using MERGE so nothing is duplicated.
Use labels :Person, :Organization, :Location and relationship types like
WORKS_AT, FOUNDED, LOCATED_IN.

<paste text here>
```

Example input:

> Ada Lovelace worked with Charles Babbage in London on the Analytical Engine.
> Babbage later founded the Analytical Society.

Example Cypher Claude will generate:

```cypher
MERGE (ada:Person {name: "Ada Lovelace"})
MERGE (babbage:Person {name: "Charles Babbage"})
MERGE (london:Location {name: "London"})
MERGE (engine:Project {name: "Analytical Engine"})
MERGE (society:Organization {name: "Analytical Society"})
MERGE (ada)-[:COLLABORATED_WITH]->(babbage)
MERGE (ada)-[:WORKED_ON]->(engine)
MERGE (babbage)-[:WORKED_ON]->(engine)
MERGE (babbage)-[:FOUNDED]->(society)
MERGE (engine)-[:DEVELOPED_IN]->(london)
```

**2. Extract from files in your project**

```text
Read every markdown file in ./docs and build a knowledge graph of the
components, services, and teams they mention. Link services with
DEPENDS_ON, teams with OWNS. Check the existing schema first and reuse
any labels that already exist.
```

**3. Map a codebase**

```text
Scan ./src and create a graph of modules and their imports:
(:Module {path})-[:IMPORTS]->(:Module). Then tell me which modules
have the most incoming imports.
```

**4. Enrich existing nodes**

```text
For every :Person node that has no `role` property, look through
<file or text> and add their role if it is mentioned. List what you
changed.
```

**5. Clean up duplicates**

```text
Find nodes that are probably the same entity (e.g. "IBM" and
"International Business Machines"). Show me the candidates and
merge them only after I approve, keeping all relationships.
```

> **Tip:** Always ask Claude to *show the extracted entities before writing*.
> This keeps `write_neo4j_cypher` behind a review step and avoids polluting the graph.

### Knowledge Graph Querying

Claude inspects the schema with `get_neo4j_schema`, writes Cypher, and runs it
with `read_neo4j_cypher`.

**Explore the graph**

```text
Describe my Neo4j database: what node labels and relationship types exist,
how many of each, and what properties they have.
```

**Direct lookups**

```text
Which people work at <Organization>? Show their roles.
```

**Multi-hop relationships**

```text
Who is connected to <Person> within 2 hops, and how?
Show the path for each result.
```

```cypher
MATCH path = (p:Person {name: "<Person>"})-[*1..2]-(other)
RETURN other.name, [r IN relationships(path) | type(r)] AS via
LIMIT 25
```

**Shortest path**

```text
What is the shortest connection between <Person A> and <Person B>?
```

**Aggregation and ranking**

```text
Which 10 organizations have the most employees in the graph?
Which person has the most connections?
```

**Pattern discovery**

```text
Find people who worked on the same project but are not directly
connected to each other — suggest introductions.
```

**Explain the query**

```text
Answer this question using the graph, and show the Cypher you ran and
explain it line by line: <your question>
```

**Data quality checks**

```text
Find orphan nodes with no relationships, and nodes missing a `name`
property. Don't change anything — just report them.
```

### Prompting Tips

- **Start with the schema.** "Check the schema first" helps Claude reuse existing labels instead of inventing new ones.
- **Ask for `MERGE`, not `CREATE`**, when writing, so re-running a prompt doesn't create duplicates.
- **Add `LIMIT`** to exploratory queries on large graphs.
- **Say "read-only"** when you only want answers. Claude will stick to `read_neo4j_cypher`.
- **Use a consistent naming convention**: `:PascalCase` labels and `UPPER_SNAKE_CASE` relationships.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Unable to connect` / `ServiceUnavailable` | Check Neo4j is running and the URI scheme: `bolt://` for local, `neo4j+s://` for Aura |
| `AuthenticationError` | Verify `NEO4J_USERNAME` / `NEO4J_PASSWORD` are exported in the shell that launched Claude Code |
| `get_neo4j_schema` fails | APOC is not installed — add `NEO4J_PLUGINS='["apoc"]'` (Docker) or enable it in Desktop |
| Server not listed in `/mcp` | Ensure `.mcp.json` is at the project root and approve the project server when prompted |

## Resources

- [neo4j-contrib/mcp-neo4j](https://github.com/neo4j-contrib/mcp-neo4j)
- [Cypher manual](https://neo4j.com/docs/cypher-manual/current/)
- [Claude Code MCP docs](https://docs.claude.com/en/docs/claude-code/mcp)
