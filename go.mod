module github.com/agentregistry-dev/website

go 1.25.1

require github.com/solo-io/docs-theme-extras v0.1.13 // indirect

// Local dev: test unreleased docs-theme-extras changes. Remove (and bump the
// pin above) once the sidebar fallback fix is released.
replace github.com/solo-io/docs-theme-extras => /Users/kristinbrown/Documents/GitHub/docs-theme-extras
