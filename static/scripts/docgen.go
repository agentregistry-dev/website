package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/agentregistry-dev/agentregistry" // Adjust this to point to your root cmd
	"github.com/spf13/cobra/doc"
)

func main() {
	outDir := "./docs/cli"
	if err := os.MkdirAll(outDir, 0755); err != nil {
		log.Fatal(err)
	}

	// Custom front-matter prepender
	filePrepender := func(filename string) string {
		name := filepath.Base(filename)
		base := strings.TrimSuffix(name, filepath.Ext(name))
		// Replaces underscores with spaces for the title
		title := strings.ReplaceAll(base, "_", " ")
		
		return fmt.Sprintf("---\ntitle: %s\nweight: 10\n---\n\n", title)
	}

	// Link handler to keep links clean in markdown
	linkHandler := func(name string) string {
		return name
	}

	root := cmd.Root() // Get your root command
	err := doc.GenMarkdownTreeCustom(root, outDir, filePrepender, linkHandler)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Docs generated in", outDir)
}