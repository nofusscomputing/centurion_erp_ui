import { renderToStaticMarkup } from "react-dom/server";
import IconLoader from "../../components/IconLoader";


const UNESCAPE_RE = /(?<markdown>#(?<model_id>\d+))/g



function ticket_link (state, silent) {
  /**
   * Render ticket tag links
   * i.e. #<ticket_id>
   */

  const max = state.posMax
  let start = state.pos
  let end = state.pos

  let begining = state.pos

  const re = new RegExp(UNESCAPE_RE);

  const fields = [ ...String(state.src).matchAll(re) ]


  if( fields.length === 0 ) {

    return false

  }

  if( fields[0].index !== begining ) {

    return false

  }


  for( let item_link of fields) {

    start = item_link.index
    end = start + String(item_link.groups.markdown).length

    if ( start !== state.posMax ) {    // middle text

      const middle_text = state.push('text', '', 0)
      middle_text.content = state.src.slice(state.posMax, start)

    }

    state.pos = start
    state.posMax = end


    if(
      (! state.env.tickets ?? null)
      || (! state.env.tickets[item_link.groups.model_id] ?? null)
    ) {

      const failed_token = state.push('text', '', 0)
      failed_token.content = item_link.groups.markdown

      continue

    }


    const span_o = state.push('span_open', 'span', 1)
    span_o.attrPush(['class', 'text-inline'])

      const anchor_o = state.push('a_open', 'a', 1)
      anchor_o.attrPush(['href', state.env.tickets[item_link.groups.model_id].url])


        const icon_o = state.push('icon_open', 'span', 1)
        icon_o.attrPush([
          'class', 'badge-icon ticket-status-icon ticket-status-icon-' + String(state.env.tickets[item_link.groups.model_id].status).toLowerCase().replace(' ', '_').replace('(', '').replace(')', '')
        ])

          const icon_t = state.push('html_inline', '', 0)

          icon_t.content = renderToStaticMarkup(
            <IconLoader
              name={'ticket_status_new'}
            />
          )

        const icon_c = state.push('icon_close', 'span', -1)


        const ref_o = state.push('ref_open', 'span', 1)
          ref_o.attrPush(["class", "sub-script metadata"])

          const ref_t = state.push('text', '', 0)
          ref_t.content = ' #' + String( item_link.groups.model_id ) + ' '

        const ref_c = state.push('ref_close', 'span', -1)


        const anchor_t = state.push('text', '', 0)
        anchor_t.content = state.env.tickets[item_link.groups.model_id].title


        const item_o = state.push('item_open', 'span', 1)
          item_o.attrPush(["class", "sub-script metadata"])

          const item_t = state.push('text', '', 0)
          item_t.content = ', ' + String( state.env.tickets[item_link.groups.model_id].ticket_type ) + ' '

        const item_c = state.push('item_close', 'span', -1)


      const anchor_c = state.push('a_close', 'a', -1)

    
    const span_c = state.push('span_close', 'span', -1)


  }


  state.pos = end
  state.posMax = max


  return true

}

export default function ticket_link_plugin (md) {
  md.inline.ruler.push('ticket_link', ticket_link)
};
