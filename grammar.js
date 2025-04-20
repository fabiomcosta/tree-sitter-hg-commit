// Parses an hgcommit file that looks like this:
//
// {title}
//
// Summary:
//
// Test Plan:
//
// Reviewers:
//
// Subscribers:
//
// Tasks:
//
// Tags:
//
// HG: Comment

const SECTIONS = Object.entries({
  summary: {
    name: "Summary",
  },
  test_plan: {
    name: "Test Plan",
  },
  reviewers: {
    name: "Reviewers",
  },
  subscribers: {
    name: "Subscribers",
  },
  tasks: {
    name: "Tasks",
  },
  tags: {
    name: "Tags",
  },
  privacy_context_container: {
    name: "Privacy Context Container",
  },
  differential_revision: {
    name: " Differential Revision",
  },
  reviewed_by: {
    name: "Reviewed By",
  },
  dependencies: {
    name: "Dependencies",
  },
  gsd_projects: {
    name: "GSD Projects",
  },
});

// (
//   (section
//     key: (section_key) @section-key
//     value: (section_value) @section-value
//   )
//   (#eq? @section-key "Test Plan")
// )

module.exports = grammar({
  name: "hgcommit",
  rules: {
    source_file: ($) => seq($.title, repeat($.section)),

    comment: ($) => /HG: .*/,
    text: ($) => /[^\n]+/,

    section_key: ($) =>
      token(prec(1, choice(...SECTIONS.map(([_, { name }]) => name)))),
    section_value: ($) => repeat1(choice($.text, $.comment)),

    title: ($) => $.section_value,

    section: ($) =>
      seq(
        field("key", $.section_key),
        field("separator", ":"),
        field("value", optional($.section_value)),
      ),
  },
});
