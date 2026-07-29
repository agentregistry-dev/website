module github.com/agentregistry-dev/website

go 1.25.1

// docs-theme-extras declares the hextra import itself (pinned to v0.12.3), so
// hextra is a transitive dependency and is not listed here — matching
// agentgateway / kgateway / ambientmesh. Its checksums stay in go.sum.
require github.com/solo-io/docs-theme-extras v0.1.23 // indirect
