#!/usr/bin/env sh

me="$(realpath "$0"; printf a)"; me="${me%?a}"
name="$(basename "${me}"; printf a)"; name="${name%?a}"
path="$(dirname "${me}"; printf a)"; path="${path%?a}"


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

  -o, --stdout
    Instead of writing the to the files, it dumps it into stdout

EXAMPLES
  \`./${name} all\`
  \`./${name} html\`
  \`./${name} md\`
EOF
}



main() {
  # Dependencies
  require 'python -m yq' || die2 1 'FATAL' "requires 'yq' installed" \
    "You can use \`python -m pip install --user yq\`" \
    "This is used for processing the link.yaml file"

  links="${path}/links.yaml"
  html_template="${path}/src/html-template.html"
  html_entry_template="${path}/src/entry-template.html"
  md_template="${path}/src/md-template.md"
  check_path "${links}" "${html_template}" "${html_entry_template}" \
    "${md_template}"

  html_target="${path}/index.html"
  md_target="${path}/resources.md"

  # Process the options, exit if help is selected
  choice=""
  flag_output="false"
  for arg in "$@"; do case "${arg}" in
    h|help|-h|--help)  show_help; exit 0 ;;
    -o|--stdout)  flag_output="true" ;;
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
    *)  die2 1 'DEV' 'derped somewhere' ;;
  esac

}

check_path() {
  for arg in "$@"; do
    x="$(basename "${arg}"; printf a)"; x="${x%?a}"
    [ -r "${arg}" ] || die2 1 'FATAL' "'$x' file not found"
  done
}

print_or_write() {
  if "${flag_output}"
    then cat -
    else
      [ -w "${path}" ] || die2 1 'FATAL' "'${path}' directory not writeable"
      cat - >"$1"
  fi
}


process_html() {
  puterr "${name} -- Writing to '${html_target}'"
  key="<!-- build.sh replaces this -->"

  <"${html_template}" cat - | {
    puts_until "${key}"

    # Only one replacement for the ${html_template}
    { # Print a yaml array
      # First element
      printf %s '- '
      <"${links}" sed "s/^/  /"

      # Second element
      <"${html_entry_template}" awk -v FS="" -v RS="${key}" '
        BEGIN{ printf("- [\""); }
        (1){
          gsub(/\\/, "\\\\");
          gsub(/"/, "\\\"");
          gsub(/\n/, "\\n");
          printf("%s\",\"", $0);
        }
        END{ printf("\"]\n"); }
      '

    # Map over all headers creating an entry based on ${html_entry_template}
    } | yq --raw-output '
      # Zips two arrays together, then string joins them in that new order,
      # and then resplits it by newline
      def interweave(f; g): [f, g]
        | transpose | flatten | join("") | split("\n");

      .[0] as $source
      | .[1] as $template
      | '"${yq_set_variables}"'

      | $tagList
      | map(
        . as $tag

        # Special case for the selected tag, otherwise just a list of links
        | ($tagList | map(
          "<a href=\"#\(.)\"\(
            if . == $tag then " class=\"navbar__main-btn\"" else "" end
          )>\($tagnameToDisplay[.])</a>\n")
        ) as $navlinks

        # Add the ${html_entry_template}
        | interweave($template; [
          .,
          ($navlinks | indent(6)),
          ($navlinks | indent(8)),
          [
            # First manage the IME entry
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
                "</article>",
                ""
              ]
              | indent(4)
              | join("\n")
            ),

            # All the other links
            ($linksByTagsThenSections[.]
              | map(select(.header != "IME"))
              | map(
                [ "",
                  "<article>",
                  "  <h1>\(.header)</h1>",
                  "  <ul>",
                  (.entries | map("<li>" + . + "</li>") | indent(4)),
                  "  </ul>",
                  "</article>",
                ""]
                | indent(4)
                | join("\n")
              )
            ),
            ""
          ]
        ])
      )
      | indent(4)
      | join("\n")

    ' | sed 's/^\s*$//'  # Remove trailing spaces

    # The rest of the file
    puts_until "${key}"
  } | print_or_write "${html_target}"

}

process_md() {
  puterr "${name} -- Writing to '${md_target}'"
  {
    cat "${md_template}"

    # Github format for table of contents
    <"${links}" yq --raw-output '
      . as $source
      | '"${yq_set_variables}"'
      | $linksByTagsThenSections.All | map(
          (if .header == "IME"
             then $source.IME[0].title
             else .header
          end) as $h
          | "- [\($h)](#\($h | gsub("[ /]"; "-")))"
      )
      | join("\n")
    '

    <"${links}" yq --raw-output '
      . as $source
      | '"${yq_set_variables}"'
      | [
        "",
        "# \($source.IME[0].title)",
        ($linksByTagsThenSections.All[]
          # Not using "map(select())" since only want one entry
          | select(.header == "IME").entries
          | [
            .[0],
            (.[0] | map("---")),
            .[range(1; . | length)]
          ] | map("| " + join(" | ") + " |")),
        "",

        # The rest of the links
        ($linksByTagsThenSections.All
          | map(select(.header != "IME"))
          | map([
            "# \(.header)",
            (.entries | map("- \(.)")),
            ""
          ])),
        ""
      ]
      | flatten
      | join("\n")

    ' | format_to_md
  } | print_or_write "${md_target}"
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

# Need to define source before include
yq_set_variables='
  def exclude(f): map(select(. as $x | f | any(.[]; . == $x) | not));
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
  # These will be set by the individual use cases
  .  # Necessary dot (since piping to series of "def" needs a statement)
  | ["All", "Cantonese", "Mandarin"] as $sortFront
  | ["Browser", "Online", "Offline", "Classical", "Old"] as $sortBack

  | ($sortFront
    + ($source
      | reduce .[] as $i ([]; . + ($i | map(.tags)))
      | flatten
      | unique
      | exclude($sortFront + $sortBack)
    )
    + $sortBack
  ) as $tagList

  | (
    ($tagList | reduce .[] as $tag ({}; . + { ($tag): $tag }))
    + {
      Classical: "Classical Chinese",
      Old: "Old Chinese",
      Singlish: "Manglish/Singlish"
    }
  ) as $tagnameToDisplay

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
die2() { c="$1"; t="$2"; shift 2; puts "$t: '${name}'" "$@" >&2; exit "$c"; }
require() { command -v "$1" >/dev/null 2>&1; }

main "$@"
