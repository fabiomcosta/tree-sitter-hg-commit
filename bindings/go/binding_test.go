package tree_sitter_hgcommit_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_hgcommit "github.com/tree-sitter/tree-sitter-hgcommit/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_hgcommit.Language())
	if language == nil {
		t.Errorf("Error loading hg-commit grammar")
	}
}
