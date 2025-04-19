import XCTest
import SwiftTreeSitter
import TreeSitterHgcommit

final class TreeSitterHgcommitTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_hgcommit())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading hg-commit grammar")
    }
}
