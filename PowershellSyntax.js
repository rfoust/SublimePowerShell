{   "name": "Powershell v2",
    "scopeName": "source.powershell",
    "fileTypes": ["ps1", "psm1"],
    "foldingStartMarker": "\\{\\s*$",
    "foldingStopMarker": "^\\s*\\}",
    "patterns": [

       {  "begin": "<#",
          "beginCaptures": [
            { "0": { "name": "punctuation.start.definition.comment.block.powershell" } }
          ],
          "end": "#>",
          "endCaptures": [
            { "0": { "name": "punctuation.end.definition.comment.block.powershell" } }
          ],
          "patterns": [

            { "include": "#commentEmbeddedDocs" }

          ],
          "name": "comment.block.powershell"
       },

       {  "begin": "#",
          "end": "$",
          "patterns":[
            { "include": "#commentEmbeddedDocs" }
          ],
          "name": "comment.line.powershell"
       },

       {  "include": "#variable" },


       {  "begin": "(?<!\")\"" ,
          "end": "\"(?!\")",
          "patterns": [

            { "include": "#variable" },
            { "include": "#doubleQuotedStringEscapes" },
            { "include": "#interpolation" },
            { "include": "#invalidCharsInString" }

          ],
          "name": "string.quoted.double.powershell"
       },

       {  "begin": "(?<!')'" ,
          "end": "'(?!')",
          "patterns": [

            { "match": "''",
              "name": "constant.character.escape.powershell"
            },
            { "include": "#invalidCharsInString" }

          ],
          "name": "string.quoted.single.powershell"
       },

       {  "begin": "^@\"$",
          "end": "^\"@$",
          "patterns": [

            { "include": "#interpolation" }

          ],
          "name": "string.quoted.double.region.powershell"
       },

       {  "begin": "^@'$",
          "end": "^'@$",
          "name": "string.quoted.double.region.powershell"
       },

       {
          "match": "-([lg][te]|eq|ne)",
          "name": "keyword.operator.logical.powershell"
       },

       {  "match": "(?i:[a-z][a-z0-9]+-[a-z][a-z0-9]+)",
          "name": "support.function.powershell"
       },

       {  "match": "\\||`",
          "name": "keyword.other.powershell"
       },

       {  "match": "\\b(?i:if|else|elseif|switch|while|default|for|do|until|break|continue|foreach|return|filter|in|trap|throw|param|begin|process|end|function|global|local|private|script|contained)\\b",
          "name": "keyword.control.powershell"
       },

       {  "match": "-(?i:(?:[ic]?eq|ne|[gl][te]|(?:not)?(?:like|match|contains)|replace)|is(?:not)?|as|and|or|band|bor|not|f)\\b",
          "name": "keyword.operator.comparison.powershell"
       },

       {  "match": "-(?i:and|or|not|!)\\b",
          "name": "keyword.operator.logical.powershell"
       },

       {  "match": "-(?i:f|band|bor|-bnot)\\b",
          "name": "keyword.operator.bitwise.powershell"
       },

       {  "match": "-f\\b",
          "name": "keyword.operator.string-format.powershell"
       },

       {  "match": "[+%*/-]?=|[+/*%-]",
          "name": "keyword.operator.assignment.powershell"
       },

       {  "match": "2>&1|>>|>|<<|<|>|>\\||2>|2>>|1>>",
          "name": "keyword.operator.redirection.powershell"
       },

       {  "match": "\\|{2}|&{2}|;",
          "name": "keyword.other.statement-separator.powershell"
       }
    ],
    "repository": [

      { "commentEmbeddedDocs": {
            "patterns": [

              { "match": "(?i:\\s*(\\.)(SYNOPSIS|DESCRIPTION|EXAMPLE|INPUTS|OUTPUTS|NOTES|LINK|COMPONENT|FUNCTIONALITY))",
                "name": "comment.documentation.embedded.powershell",
                "captures": [
                  { "1": { "name": "constant.string.documentation.powershell" } },
                  { "2": { "name": "keyword.operator.documentation.powershell"} }
                ]
              },

              {
                "match": "(?i:\\s*(\\.)(PARAMETER|FORWARDHELPTARGETNAME|FORWARDHELPCATEGORY|REMOTEHELPRUNSPACE|EXTERNALHELP)\\s+([a-z0-9-_]+))",
                "name": "comment.documentation.embedded.powershell",
                "captures": [
                  { "1": { "name": "constant.string.documentation.powershell" } },
                  { "2": { "name": "keyword.operator.documentation.powershell"} },
                  { "3": { "name": "keyword.operator.documentation.powershell"} }
                ]
              }
            ]
        }
      },

      {
        "doubleQuotedStringEscapes": {
            "patterns": [

              { "match": "`[0abnfrvt\"'$]",
                "name": "constant.character.escape.powershell"
              },

              { "match": "\"\"",
                "name": "constant.character.escape.powershell"
              }
            ]
        }
      },

      {
        "interpolation": {
            "begin": "\\$\\(",
            "end": "\\)",
            "contentName": "source.powershell",
            "name": "source.interpolated.powershell",
            "patterns": [

              { "include": "#doubleQuotedStringEscapes" },
              { "include": "#interpolatedStringContent" },
              { "match": "\"",
                "name": "invalid.powershell"
              },
              { "include": "$self" }

            ]
        }
      },

      {
        "interpolatedStringContent": {
            "begin": "\\(",
            "end": "\\)",
            "patterns": [

              { "include": "#interpolatedStringContent" },
              { "include": "#doubleQuotedStringEscapes" },
              { "match": "\"",
                "name": "invalid.powershell"
              },
              { "include": "$self" }
            ]
        }
      },

      {
        "invalidCharsInString": {
            "patterns": [
              { "match": "(?<!`)\\n",
                "name": "invalid.powershell"
              }
            ]
        }
      },

      {
        "variable": {
            "patterns": [
              { "match": "(?i:(\\$)(?:(private|script|global):)?([a-z0-9_]+))",
                "captures": [
                  { "1": { "name": "punctuation.definition.variable.powershell" } },
                  { "2": { "name": "storage.modifier.scope.powershell" } },
                  { "3": { "name": "variable.other.readwrite.powershell" } }
                ]
              },
              { "match": "(?i:(\\$)(\\{(?:(private|script|global):)?.+\\}))",
                "captures": [
                  { "1": { "name": "punctuation.definition.variable.powershell" } },
                  { "2": { "name": "variable.other.readwrite.powershell" } },
                  { "3": { "name": "storage.modifier.scope.powershell" } }
                ]
              }

            ]
        }
      }

    ],
    "uuid": "f8f5ffb0-503e-11df-9879-0800200c9a66"
}
