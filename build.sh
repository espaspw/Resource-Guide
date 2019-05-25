#!/usr/bin/env sh

me="$(realpath "$0"; printf a)"; me="${me%??}"
name="$(basename "${me}"; printf a)"; name="${name%??}"
path="$(dirname "${me}"; printf a)"; path="${path%??}"


show_help() {
  <<EOF cat - >&2
SYNOPSIS
  ${name} OPTION

DESCRIPTION
  Basically a make script. Builds the file specified indirectly by OPTION
  from the links shown in "${links}"
  and from the template "${html_template}"

  Edit "${links}" to add links and then run this.

OPTIONS
  all
    Builds both
      '${html_target}'
    and
      '${md_target}'

  help, h, -h, --help
    Displays this help menu

  html
    Builds '${html_target}'

  md
    Builds '${md_target}'

EXAMPLES
  \`./${name} all\`
  \`./${name} html\`
  \`./${name} md\`
EOF
}



main() {
  # Dependencies
  require 'yq' || die 1 "FATAL: ${name} requires 'yq' installed" \
    "You can use \`python -m pip install --user yq\`" \
    "This is used for processing the link.yaml file"

  links="${path}/links.yaml"
  [ -r "${links}" ] || die 1 "FATAL: ${name} -- '${links}' file not found"
  html_template="${path}/template.html"
  [ -r "${html_template}" ] \
    || die 1 "FATAL: ${name} -- 'template.html' file not found"
  md_template="${path}/template.md"
  [ -r "${md_template}" ] \
    || die 1 "FATAL: ${name} -- 'template.md' file not found"

  [ -w "${path}" ] \
    || die 1 "FATAL: ${name} -- '${path}' directory not writeable"
  html_target="${path}/index.html"
  md_target="${path}/resources.md"

  # Check if arguments are valid or help is passed
  choice=""
  for arg in "$@"; do case "${arg}" in
    h|help|-h|--help)  show_help; exit 0 ;;
    all)   if [ -z "${choice}" ]; then choice="all"; else choice=""; fi ;;
    html)  if [ -z "${choice}" ]; then choice="html"; else choice=""; fi ;;
    md)    if [ -z "${choice}" ]; then choice="md"; else choice=""; fi ;;
    *)   choice="" ;;
  esac done
  [ -z "${choice}" ] && { show_help; exit 1; }

  # Now process
  case "${choice}" in
    all)   process_html; process_md ;;
    html)  process_html ;;
    md)    process_md ;;
    *)  die 1 "DEV: ${name} derped somewhere" ;;
  esac

}

process_html() {
  puterr "${name} -- Writing to '${html_target}'"
  key="<!-- build.sh replaces this -->"
  yq_tag_list_to_nav='
    | $tagList
    | map(select(. as $x | $excludeTheseTags | any(.[]; . == $x) | not))
    | map("<a href=\"#\(.)\">\(.)</a>")
  '

  <"${html_template}" cat - | {
    puts_until "${key}"

    # Navigation bar - wide screen
    <"${links}" yq --raw-output '
      '"${yq_set_variables}
      ${yq_tag_list_to_nav}
      "' | indent(8) | join("\n")
    '
    puts_until "${key}"

    # Navigation bar - narrow screen
    <"${links}" yq --raw-output '
      '"${yq_set_variables}
      ${yq_tag_list_to_nav}
      "' | indent(10) | join("\n")
    '
    puts_until "${key}"

    # The main body
    <"${links}" yq --raw-output '
      '"${yq_set_variables}"'
      # The formatting portion, does not matter what order these are in
      | ""
      + (["All"] + $tagList
        | map([
          "<section id=\"\(.)\">",

          # Do IME first
          ($linksByTagsThenSections[.][]
            | select(.header == "IME").entries
            | [
              "<article>",
              "  <h1>\($source.IME[0].title)</h1>",
              "  <table>",
              (map([
                "<tr>",
                map("  <td>\(.)</td>"),
                "</tr>"
              ]) | indent(4)),
              "  </table>",
              "</article>"
            ] | indent(2)
          ),
          "",

          # All the other links
          ($linksByTagsThenSections[.]
            | map(select(.header != "IME"))
            | map([
               "<article>",
               "  <h1>\(.header)</h1>",
               "  <ul>",
               (.entries | map("<li>" + . + "</li>") | indent(4)),
               "  </ul>",
               "</article>"
            ] | indent(2))
          ),
          "</section>",
          ""
        ])
        | flatten
        | indent(6)
        | join("\n")
      )
    ' | sed 's/^\s*$//'
    puts_until "${key}"

  } >"${html_target}"
}

process_md() {
  puterr "${name} -- Writing to '${md_target}'"
  {
    cat "${md_template}"

    # Github format for table of contents
    <"${links}" yq --raw-output ' 
      '"${yq_set_variables}"'
      | $linksByTagsThenSections.All
      | map(
        (if .header == "IME"
           then $source.IME[0].title
           else .header
        end) as $h
        | "- [\($h)](#\($h | gsub("[ /]"; "-")))")
      | join("\n")
    '
    puts  # Add a newline

    <"${links}" yq --raw-output '
      '"${yq_set_variables}"'
      | $linksByTagsThenSections.All[]
      | select(.header == "IME").entries
      | "# \($source.IME[0].title)\n" + (
        [
          .[0],
          (.[0] | map("---")),
          .[range(1; . | length)]
        ]
        | map("| " + join(" | ") + " |")
        | join("\n")
      )
    ' | format_to_md

    puts  # Add a newline

    # Dump all the sections and links from "All" tag
    <"${links}" yq --raw-output '
      '"${yq_set_variables}"'
      | $linksByTagsThenSections.All
      | map(select(.header != "IME"))
      | map([
        "# \(.header)",
        (.entries | map("- \(.)")),
        ""
      ])
      | flatten
      | join("\n")
    ' | format_to_md
  } >"${md_target}"
}

format_to_md() {
 <&0 sed '
   s/\[/\\[/g
   s/]/\\]/g

   # Reformat links
   s|<a href="\([^"]*\)">\([^<]*\)</a>|[\2](\1)|g
 '
}

puts_until() {
  while { IFS= <&0 read -r line; }; do
    [ "${line}" = "$1" ] && break
    puts "${line}"
  done
}

# Does not work cause sed eats the rest of the stream on non-file pipes
#insert_into_template() {
#  <&0 sed -n '/^'"$1"'$/Q;p'
#  puts "$2"
#  cat -
#}

yq_set_variables='
  def indent(f): flatten | map((" " * f) + .);
  def getEntriesByTag(f):
    to_entries
    | map({
      header: .key,
      entries: .value
        | map(select(f or any(.tags[]; . == "All")))
        | map(.body)
    })
    | map(select(.entries | length > 0));


  # Some random variable setting
  . as $source
  | { Classical: "Classical Chinese", Old: "Old Chinese" } as $tagnameToDisplay
  | ["All", "Cantonese", "Mandarin", "Classical", "Old"] as $excludeTheseTags

  | ($source
    | reduce .[] as $i ([]; . + ($i | map(.tags)))
    | flatten
    | unique
    #| exclude(. as $x | $putTheseTagsLast | any(.[]; . == $x))
  ) as $tagList


  # Switch the yaml from
  #   { sections: { tags[], links[] } }
  # to
  #   { tags: [ { section1, links[] }, { section2, links[] }, ...] }
  | ($tagList
    | reduce .[] as $tag ({};
      . + { ($tag): $source | getEntriesByTag(any(.tags[]; . == $tag)) }
    )
    + { All: $source | getEntriesByTag(1) }
  ) as $linksByTagsThenSections
'



# Helpers
puts() { printf %s\\n "$@"; }
puterr() { printf %s\\n "$@" >&2; }
die() { c="$1"; shift 1; for x in "$@"; do puts "$x" >&2; done; exit "$c"; }
require() { command -v "$1" >/dev/null 2>&1; }

main "$@"
