ace.define("ace/mode/elixir",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/elixir_highlight_rules","ace/mode/folding/cstyle"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./elixir_highlight_rules").ElixirHighlightRules,u=e("./folding/cstyle").FoldMode,a=function(){var e=new o;this.foldingRules=new u,this.$tokenizer=new s(e.getRules())};r.inherits(a,i),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"}}.call(a.prototype),t.Mode=a}),ace.define("ace/mode/elixir_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){this.$rules={start:[{todo:"fix grouping",token:["meta.module.elixir","keyword.control.module.elixir","entity.name.type.module.elixir"],regex:"^\\s*(defmodule)\\s+(([A-Z]\\w*\\s*(\\.)\\s*)*[A-Z]\\w*)"},{token:"comment.documentation.heredoc",regex:'@(module)?doc (%[a-z])?"""',push:[{include:"#interpolated_elixir"},{include:"#escaped_char"},{token:"comment.documentation.heredoc",regex:'\\s*"""$',next:"pop"},{defaultToken:"comment.documentation.heredoc"}]},{token:"comment.documentation.heredoc",regex:'@(module)?doc %[A-B]"""',push:[{token:"comment.documentation.heredoc",regex:'\\s*"""$',next:"pop"},{defaultToken:"comment.documentation.heredoc"}]},{token:"comment.documentation.false",regex:"@(module)?doc false"},{token:"comment.documentation.string",regex:'@(module)?doc "',push:[{include:"#interpolated_elixir"},{include:"#escaped_char"},{token:"comment.documentation.string",regex:'"',next:"pop"},{defaultToken:"comment.documentation.string"}]},{TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?<!\\.)\\b(do|end|case|bc|lc|if|cond|unless|try|receive|fn|defmodule|defp?|defprotocol|defimpl|defrecord|defmacrop?|defdelegate|defcallback|defexception|exit|after|rescue|catch|else|raise|throw)\\b(?![?!])",token:"keyword.control.elixir",regex:"(?<!\\.)\\b(do|end|case|bc|lc|if|cond|unless|try|receive|fn|defmodule|defp?|defprotocol|defimpl|defrecord|defmacrop?|defdelegate|defcallback|defexception|exit|after|rescue|catch|else|raise|throw)\\b(?![?!])"},{caseInsensitive:!0,TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?<!\\.)\\b(and|not|or|when|xor|in|inlist|inbits)\\b",token:"keyword.operator.logical.elixir",regex:"(?<!\\.)\\b(and|not|or|when|xor|in|inlist|inbits)\\b"},{token:"constant.language.elixir",regex:"\\b(nil|true|false)\\b(?![?!])"},{token:"variable.language.elixir",regex:"\\b(__(FILE|CALLER|ENV|MODULE|DIR)__)\\b(?![?!])"},{todo:"fix grouping",token:["variable.other.readwrite.module.elixir","punctuation.definition.variable.elixir"],regex:"(@)[a-zA-Z_]\\w*"},{todo:"fix grouping",token:["variable.other.anonymous.elixir","punctuation.definition.variable.elixir"],regex:"(&)\\d"},{token:"keyword.other.special.elixir",regex:"\\b(import|require|alias|use|quote|unquote|super)\\b(?![?!])"},{token:"variable.other.constant.elixir",regex:"\\b[A-Z]\\w*\\b"},{TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"\\b(0[xX]\\h(?>_?\\h)*|\\d(?>_?\\d)*(\\.(?![^[:space:][:digit:]])(?>_?\\d)*)?([eE][-+]?\\d(?>_?\\d)*)?|0[bB][01]+)\\b",token:"constant.numeric.elixir",regex:"\\b(0[xX]\\h(?>_?\\h)*|\\d(?>_?\\d)*(\\.(?![^[:space:][:digit:]])(?>_?\\d)*)?([eE][-+]?\\d(?>_?\\d)*)?|0[bB][01]+)\\b"},{token:"punctuation.definition.constant.elixir",regex:":'",push:[{include:"#interpolated_elixir"},{include:"#escaped_char"},{token:"punctuation.definition.constant.elixir",regex:"'",next:"pop"},{defaultToken:"constant.other.symbol.single-quoted.elixir"}]},{token:"punctuation.definition.constant.elixir",regex:':"',push:[{include:"#interpolated_elixir"},{include:"#escaped_char"},{token:"punctuation.definition.constant.elixir",regex:'"',next:"pop"},{defaultToken:"constant.other.symbol.double-quoted.elixir"}]},{TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?>''')",token:"punctuation.definition.string.begin.elixir",regex:"(?>''')",push:[{include:"#interpolated_elixir"},{include:"#escaped_char"},{token:"punctuation.definition.string.end.elixir",regex:"^\\s*'''$",next:"pop"},{defaultToken:"support.function.variable.quoted.single.heredoc.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:"'",push:[{include:"#interpolated_elixir"},{include:"#escaped_char"},{token:"punctuation.definition.string.end.elixir",regex:"'",next:"pop"},{defaultToken:"support.function.variable.quoted.single.elixir"}]},{TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:'(?>""")',token:"punctuation.definition.string.begin.elixir",regex:'(?>""")',push:[{include:"#interpolated_elixir"},{include:"#escaped_char"},{token:"punctuation.definition.string.end.elixir",regex:'^\\s*"""$',next:"pop"},{defaultToken:"string.quoted.double.heredoc.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:'"',push:[{include:"#interpolated_elixir"},{include:"#escaped_char"},{token:"punctuation.definition.string.end.elixir",regex:'"',next:"pop"},{defaultToken:"string.quoted.double.elixir"}]},{TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:'%[a-z](?>""")',token:"punctuation.definition.string.begin.elixir",regex:'%[a-z](?>""")',push:[{include:"#interpolated_elixir"},{token:"punctuation.definition.string.end.elixir",regex:'^\\s*"""$',next:"pop"},{defaultToken:"string.quoted.double.heredoc.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:"%[a-z]\\{",push:[{include:"#interpolated_elixir"},{include:"#nest_curly_i"},{token:"punctuation.definition.string.end.elixir",regex:"\\}[a-z]*",next:"pop"},{defaultToken:"string.interpolated.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:"%[a-z]\\[",push:[{include:"#interpolated_elixir"},{include:"#nest_brackets_i"},{token:"punctuation.definition.string.end.elixir",regex:"\\][a-z]*",next:"pop"},{defaultToken:"string.interpolated.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:"%[a-z]\\<",push:[{include:"#interpolated_elixir"},{include:"#nest_ltgt_i"},{token:"punctuation.definition.string.end.elixir",regex:"\\>[a-z]*",next:"pop"},{defaultToken:"string.interpolated.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:"%[a-z]\\(",push:[{include:"#interpolated_elixir"},{include:"#nest_parens_i"},{token:"punctuation.definition.string.end.elixir",regex:"\\)[a-z]*",next:"pop"},{defaultToken:"string.interpolated.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:"%[a-z]([^\\w])",push:[{include:"#interpolated_elixir"},{TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"\\1[a-z]*",token:"punctuation.definition.string.end.elixir",regex:"\\1[a-z]*",next:"pop"},{defaultToken:"string.interpolated.elixir"}]},{TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:'%[A-Z](?>""")',token:"punctuation.definition.string.begin.elixir",regex:'%[A-Z](?>""")',push:[{token:"punctuation.definition.string.end.elixir",regex:'^\\s*"""$',next:"pop"},{defaultToken:"string.quoted.other.literal.upper.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:"%[A-Z]\\{",push:[{include:"#nest_curly_i"},{token:"punctuation.definition.string.end.elixir",regex:"\\}[a-z]*",next:"pop"},{defaultToken:"string.quoted.other.literal.upper.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:"%[A-Z]\\[",push:[{include:"#nest_brackets_i"},{token:"punctuation.definition.string.end.elixir",regex:"\\][a-z]*",next:"pop"},{defaultToken:"string.quoted.other.literal.upper.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:"%[A-Z]\\<",push:[{include:"#nest_ltgt_i"},{token:"punctuation.definition.string.end.elixir",regex:"\\>[a-z]*",next:"pop"},{defaultToken:"string.quoted.other.literal.upper.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:"%[A-Z]\\(",push:[{include:"#nest_parens_i"},{token:"punctuation.definition.string.end.elixir",regex:"\\)[a-z]*",next:"pop"},{defaultToken:"string.quoted.other.literal.upper.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:"%[A-Z]([^\\w])",push:[{include:"#escaped_char"},{TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"\\1[a-z]*",token:"punctuation.definition.string.end.elixir",regex:"\\1[a-z]*",next:"pop"},{defaultToken:"string.quoted.other.literal.upper.elixir"}]},{todo:"fix grouping",TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?<!:)(:)(?>[a-zA-Z_][\\w@]*(?>[?!]|=(?![>=]))?|\\<\\>|===?|!==?|<<>>|<<<|>>>|~~~|::|<\\-|/>|=~?|//?|\\*\\*?|\\.\\.?|>=?|<=?|&&?&?|\\+\\+?|\\-\\-?|\\|\\|?\\|?|\\!|@|\\^(\\^\\^)?)",token:["constant.other.symbol.elixir","punctuation.definition.constant.elixir"],regex:"(?<!:)(:)(?>[a-zA-Z_][\\w@]*(?>[?!]|=(?![>=]))?|\\<\\>|===?|!==?|<<>>|<<<|>>>|~~~|::|<\\-|/>|=~?|//?|\\*\\*?|\\.\\.?|>=?|<=?|&&?&?|\\+\\+?|\\-\\-?|\\|\\|?\\|?|\\!|@|\\^(\\^\\^)?)"},{todo:"fix grouping",TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?>[a-zA-Z_][\\w@]*(?>[?!])?)(:)(?!:)",token:["constant.other.symbol.elixir.19syntax","punctuation.definition.constant.elixir"],regex:"(?>[a-zA-Z_][\\w@]*(?>[?!])?)(:)(?!:)"},{todo:"fix grouping",token:["comment.line.number-sign.elixir","punctuation.definition.comment.elixir"],regex:"(?:^[ \\t]+)?(#).*$\\n?"},{TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?<!\\w)\\?(\\\\(x\\h{1,2}(?!\\h)\\b|0[0-7]{0,2}(?![0-7])\\b|[^x0MC])|(\\\\[MC]-)+\\w|[^\\s\\\\])",token:"constant.numeric.elixir",regex:"(?<!\\w)\\?(\\\\(x\\h{1,2}(?!\\h)\\b|0[0-7]{0,2}(?![0-7])\\b|[^x0MC])|(\\\\[MC]-)+\\w|[^\\s\\\\])"},{token:"string.unquoted.program-block.elixir",regex:"^__END__$",push:[{caseInsensitive:!0,token:"text.html.embedded.elixir",regex:"(?=<?xml|<(?:html\\b)|!DOCTYPE (?:html\\b))",push:[{include:"text.html.basic"},{token:"text.html.embedded.elixir",regex:"(?=not)impossible",next:"pop"},{defaultToken:"text.html.embedded.elixir"}]},{token:"string.unquoted.program-block.elixir",regex:"(?=not)impossible",next:"pop"},{defaultToken:"text.plain"}]},{todo:"fix grouping",TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?<=\\{|do|\\{\\s|do\\s)(\\|)",token:["text","punctuation.separator.variable.elixir"],regex:"(?<=\\{|do|\\{\\s|do\\s)(\\|)",push:[{token:"variable.other.block.elixir",regex:"[_a-zA-Z][_a-zA-Z0-9]*"},{token:"punctuation.separator.variable.elixir",regex:","},{todo:"fix grouping",token:["text","punctuation.separator.variable.elixir"],regex:"(\\|)",next:"pop"}]},{token:"keyword.operator.assignment.augmented.elixir",regex:"\\+=|\\-=|\\|\\|="},{token:"keyword.operator.comparison.elixir",regex:"===?|!==?|<=?|>=?"},{token:"keyword.operator.bitwise.elixir",regex:"(\\|\\|\\||&&&|^^^|<<<|>>>|~~~)"},{TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?<=[ \\t])!+|\\bnot\\b|&&|\\band\\b|\\|\\||\\bor\\b|\\bxor\\b",token:"keyword.operator.logical.elixir",regex:"(?<=[ \\t])!+|\\bnot\\b|&&|\\band\\b|\\|\\||\\bor\\b|\\bxor\\b"},{token:"keyword.operator.arithmetic.elixir",regex:"(\\*|\\+|\\-|/)"},{token:"keyword.operator.other.elixir",regex:"\\||\\+\\+|\\-\\-|\\*\\*|\\/\\/|\\<\\-|\\<\\>|\\<\\<|\\>\\>|\\:\\:|\\.\\.|/>|=~"},{token:"keyword.operator.assignment.elixir",regex:"="},{token:"punctuation.separator.other.elixir",regex:":"},{token:"punctuation.separator.statement.elixir",regex:"\\;"},{token:"punctuation.separator.object.elixir",regex:","},{token:"punctuation.separator.method.elixir",regex:"\\."},{token:"punctuation.section.scope.elixir",regex:"\\{|\\}"},{token:"punctuation.section.array.elixir",regex:"\\[|\\]"},{token:"punctuation.section.function.elixir",regex:"\\(|\\)"}],"#escaped_char":[{token:"constant.character.escape.elixir",regex:"\\\\(?:[0-7]{1,3}|x[\\da-fA-F]{1,2}|.)"}],"#interpolated_elixir":[{todo:"fix grouping",token:["punctuation.section.embedded.elixir","source.elixir.embedded.source.empty"],regex:"#\\{(\\})"},{token:"punctuation.section.embedded.elixir",regex:"#\\{",push:[{include:"#nest_curly_and_self"},{include:"$self"},{token:"punctuation.section.embedded.elixir",regex:"\\}",next:"pop"},{defaultToken:"source.elixir.embedded.source"}]}],"#nest_brackets":[{token:"punctuation.section.scope.elixir",regex:"\\[",push:[{include:"#nest_brackets"},{token:"punctuation.section.scope.elixir",regex:"\\]",next:"pop"}]}],"#nest_brackets_i":[{token:"punctuation.section.scope.elixir",regex:"\\[",push:[{include:"#interpolated_elixir"},{include:"#escaped_char"},{include:"#nest_brackets_i"},{token:"punctuation.section.scope.elixir",regex:"\\]",next:"pop"}]}],"#nest_brackets_r":[{token:"punctuation.section.scope.elixir",regex:"\\[",push:[{include:"#regex_sub"},{include:"#nest_brackets_r"},{token:"punctuation.section.scope.elixir",regex:"\\]",next:"pop"}]}],"#nest_curly":[{token:"punctuation.section.scope.elixir",regex:"\\{",push:[{include:"#nest_curly"},{token:"punctuation.section.scope.elixir",regex:"\\}",next:"pop"}]}],"#nest_curly_and_self":[{token:"punctuation.section.scope.elixir",regex:"\\{",push:[{include:"#nest_curly_and_self"},{token:"punctuation.section.scope.elixir",regex:"\\}",next:"pop"}]},{include:"$self"}],"#nest_curly_i":[{token:"punctuation.section.scope.elixir",regex:"\\{",push:[{include:"#interpolated_elixir"},{include:"#escaped_char"},{include:"#nest_curly_i"},{token:"punctuation.section.scope.elixir",regex:"\\}",next:"pop"}]}],"#nest_curly_r":[{token:"punctuation.section.scope.elixir",regex:"\\{",push:[{include:"#regex_sub"},{include:"#nest_curly_r"},{token:"punctuation.section.scope.elixir",regex:"\\}",next:"pop"}]}],"#nest_ltgt":[{token:"punctuation.section.scope.elixir",regex:"\\<",push:[{include:"#nest_ltgt"},{token:"punctuation.section.scope.elixir",regex:"\\>",next:"pop"}]}],"#nest_ltgt_i":[{token:"punctuation.section.scope.elixir",regex:"\\<",push:[{include:"#interpolated_elixir"},{include:"#escaped_char"},{include:"#nest_ltgt_i"},{token:"punctuation.section.scope.elixir",regex:"\\>",next:"pop"}]}],"#nest_ltgt_r":[{token:"punctuation.section.scope.elixir",regex:"\\<",push:[{include:"#regex_sub"},{include:"#nest_ltgt_r"},{token:"punctuation.section.scope.elixir",regex:"\\>",next:"pop"}]}],"#nest_parens":[{token:"punctuation.section.scope.elixir",regex:"\\(",push:[{include:"#nest_parens"},{token:"punctuation.section.scope.elixir",regex:"\\)",next:"pop"}]}],"#nest_parens_i":[{token:"punctuation.section.scope.elixir",regex:"\\(",push:[{include:"#interpolated_elixir"},{include:"#escaped_char"},{include:"#nest_parens_i"},{token:"punctuation.section.scope.elixir",regex:"\\)",next:"pop"}]}],"#nest_parens_r":[{token:"punctuation.section.scope.elixir",regex:"\\(",push:[{include:"#regex_sub"},{include:"#nest_parens_r"},{token:"punctuation.section.scope.elixir",regex:"\\)",next:"pop"}]}],"#regex_sub":[{include:"#interpolated_elixir"},{include:"#escaped_char"},{todo:"fix grouping",token:["string.regexp.arbitrary-repitition.elixir","punctuation.definition.arbitrary-repitition.elixir","string.regexp.arbitrary-repitition.elixir","punctuation.definition.arbitrary-repitition.elixir"],regex:"(\\{)\\d+(,\\d+)?(\\})"},{token:"punctuation.definition.character-class.elixir",regex:"\\[(?:\\^?\\])?",push:[{include:"#escaped_char"},{token:"punctuation.definition.character-class.elixir",regex:"\\]",next:"pop"},{defaultToken:"string.regexp.character-class.elixir"}]},{token:"punctuation.definition.group.elixir",regex:"\\(",push:[{include:"#regex_sub"},{token:"punctuation.definition.group.elixir",regex:"\\)",next:"pop"},{defaultToken:"string.regexp.group.elixir"}]},{todo:"fix grouping",TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?<=^|\\s)(#)\\s[[a-zA-Z0-9,. \\t?!-][^\\x{00}-\\x{7F}]]*$",token:["comment.line.number-sign.elixir","punctuation.definition.comment.elixir"],regex:"(?<=^|\\s)(#)\\s[[a-zA-Z0-9,. \\t?!-][^\\x00-\\x7F]]*$"}]},this.normalizeRules()};r.inherits(s,i),t.ElixirHighlightRules=s}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){var r=e("../../lib/oop"),i=e("../../range").Range,s=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};r.inherits(o,s),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n){var r=e.getLine(n),i=r.match(this.foldingStartMarker);if(i){var s=i.index;return i[1]?this.openingBracketBlock(e,i[1],n,s):e.getCommentFoldRange(n,s+i[0].length,1)}if(t!=="markbeginend")return;var i=r.match(this.foldingStopMarker);if(i){var s=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,s):e.getCommentFoldRange(n,s,-1)}}}.call(o.prototype)})