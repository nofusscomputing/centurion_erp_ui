/**
 * HTML tag White Listing
 * 
 * Allows adding HTML tags to an "allow" list for them to be renderable.
 * 
 * HTML comments are always enabled and by default so are `details` and `summary`
 * tags.
 * 
 * This plugin is modified from the `html_block` rule from markdown-it source code.
 * 
 * Original Source / Details: 
 *   URL:     https://github.com/markdown-it/markdown-it/blob/0fe7ccb4b7f30236fb05f623be6924961d296d3d/lib/rules_block/html_block.mjs
 *   Licence: MIT
 *   Fetced:  28 Jan 25
 */
let whitelisted_tags = []


function html_whitelist (state, startLine, endLine, silent) {

  let pos = state.bMarks[startLine] + state.tShift[startLine]
  let max = state.eMarks[startLine]

  const HTML_SEQUENCES = [
    [/^<!--/,        /-->/,   true],
    [new RegExp('^</?(' + whitelisted_tags.join('|') + ')>', 'i'), /^$/, true],
  ]



  // if it's indented more than 3 spaces, it should be a code block
  // if (state.sCount[startLine] - state.blkIndent >= 4) { return false }    // Allow rendeing under lists

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false }


  let lineText = String(state.src.slice(pos, max)).replace('><', '>\n<')

  let i = 0
  for (; i < (HTML_SEQUENCES.length - 0); i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) { break }
  }
  if (i === HTML_SEQUENCES.length) { return false }

  if (silent) {
    // true if this sequence can be a terminator, false otherwise
    return HTML_SEQUENCES[i][2]
  }

  let nextLine = startLine + 1

  // If we are here - we detected HTML block.
  // Let's roll down till block end.
  if (!HTML_SEQUENCES[i][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) { break }

      pos = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]
      lineText = state.src.slice(pos, max)

      if (HTML_SEQUENCES[i][1].test(lineText)) {
        if (lineText.length !== 0) { nextLine++ }
        break
      }
    }
  }

  state.line = nextLine

  const token   = state.push('html_block', '', 0)
  token.map     = [startLine, nextLine]

  /*

  Implementation has a potential security flaw. any html on the same line is rendered, even if it's not in list.

  token.content = state.getLines(startLine, nextLine, state.blkIndent, true).replace('<hr>','&lt;hr&gt;')

  */

  token.content = state.getLines(startLine, nextLine, state.blkIndent, true)

  return true
}


export default function html_whitelist_plugin (md, options = {tags: ["details", "summary"]}) {

  whitelisted_tags = options.tags

  md.block.ruler.before('paragraph', 'html_whitelist', html_whitelist)
  
};
  